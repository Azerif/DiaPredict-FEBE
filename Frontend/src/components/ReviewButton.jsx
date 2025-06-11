import React, { useState, useEffect } from 'react';
import { getAllPredictions } from '../api/prediction';
import { getUserTestimonials, createTestimonial } from '../api/testimonial';
import { useUser } from '../contexts/UserContext';
import { alertSuccess, alertError } from '../lib/alerts';

export default function ReviewButton() {
  const { user } = useUser();
  const [hasPrediction, setHasPrediction] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkConditions();
  }, []);

  useEffect(() => {
    setIsFormValid(title.trim() !== '' && deskripsi.trim() !== '');
  }, [title, deskripsi]);

  const checkConditions = async () => {
    try {
      // Check if user has made at least 1 prediction
      const predictionsResponse = await getAllPredictions();
      const predictions = predictionsResponse.data || [];
      
      if (predictions.length > 0) {
        setHasPrediction(true);
        
        // Check if user has already given a review using getUserTestimonials
        try {
          const userTestimonialsResponse = await getUserTestimonials();
          const userTestimonials = userTestimonialsResponse.data || [];
          setHasReview(userTestimonials.length > 0);
        } catch (error) {
          console.error('Error checking user testimonials:', error);
          setHasReview(false);
        }
      }
    } catch (error) {
      console.error('Error checking conditions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !deskripsi.trim()) {
      alertError('Mohon lengkapi judul dan komentar');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const testimonialData = {
        title: title.trim(),
        comment: deskripsi.trim(),
        profile_picture: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      };

      await createTestimonial(testimonialData);
      
      // Reset form
      setTitle('');
      setDeskripsi('');
      
      // Close modal first
      document.getElementById('review_modal').close();
      
      // Set hasReview to true to hide button
      setHasReview(true);
      
      // Show success alert after modal is closed
      setTimeout(() => {
        alertSuccess('Testimoni berhasil dikirim! Terima kasih atas ulasan Anda.');
      }, 300);
      
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      
      // Close modal first
      document.getElementById('review_modal').close();
      
      // Show error alert after modal is closed
      setTimeout(() => {
        if (error.message?.includes('only create one testimonial')) {
          alertError('Anda sudah memiliki testimoni.');
          setHasReview(true); // Hide button if user already has review
        } else if (error.message?.includes('Unauthorized')) {
          alertError('Anda harus login terlebih dahulu untuk memberikan testimoni.');
        } else {
          alertError(error.message || 'Gagal mengirim testimoni. Silakan coba lagi.');
        }
      }, 300);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't show button if loading, no predictions, or already has review
  if (loading || !hasPrediction || hasReview) {
    return null;
  }

  return (
    <>
      {/* Review Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          onClick={() => document.getElementById('review_modal').showModal()}
          title="Berikan ulasan tentang pengalaman Anda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="hidden sm:inline">Beri Ulasan</span>
        </button>
      </div>

      {/* Review Modal */}
      <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg mb-4">
            Bagikan Pengalaman Anda Bersama <span className="text-[#00B7E0]">DiaPredict</span>
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="font-medium text-gray-700 mb-1">
                Judul Testimoni <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                placeholder="Contoh: Sangat Membantu untuk Kesehatan Saya"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent"
                disabled={isSubmitting}
                maxLength={100}
              />
              <span className="text-xs text-gray-500 mt-1">
                Maksimal 100 karakter ({title.length}/100)
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="deskripsi" className="font-medium text-gray-700 mb-1">
                Ulasan Anda <span className="text-red-500">*</span>
              </label>
              <textarea
                id="deskripsi"
                placeholder="Ceritakan pengalaman Anda menggunakan DiaPredict..."
                required
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 mt-1 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent"
                disabled={isSubmitting}
                maxLength={500}
              />
              <span className="text-xs text-gray-500 mt-1">
                Maksimal 500 karakter ({deskripsi.length}/500)
              </span>
            </div>

            {/* Tombol aksi */}
            <div className="modal-action flex justify-end gap-3 pt-4">
              <button 
                type="button"
                onClick={() => document.getElementById('review_modal').close()}
                className="btn btn-ghost border border-gray-300 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn bg-[#00B7E0] hover:bg-[#0092b3] border-none text-white px-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Kirim Testimoni
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}