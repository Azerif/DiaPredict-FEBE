import React, { useState, useEffect } from 'react';
import { createTestimonial } from '../api/testimonial';
import { useUser } from '../contexts/UserContext';
import { alertSuccess, alertError } from '../lib/alerts';

const FormTestimoni = () => {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsFormValid(title.trim() !== '' && deskripsi.trim() !== '');
  }, [title, deskripsi]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const testimonialData = {
        title: title.trim(),
        comment: deskripsi.trim(),
        profile_picture: user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      };

      await createTestimonial(testimonialData);
      
      // Close modal first before showing success message
      document.getElementById('my_modal_4').close();
      
      // Show success alert after modal is closed
      setTimeout(() => {
        alertSuccess('Testimoni berhasil dikirim! Terima kasih atas ulasan Anda.');
      }, 300);
      
      // Reset form
      setTitle('');
      setDeskripsi('');
      
      // Optional: Refresh halaman untuk menampilkan testimoni baru
      setTimeout(() => {
        window.location.reload();
      }, 1800);
      
    } catch (error) {
      console.error('Error creating testimonial:', error);
      
      // Close modal first before showing error message
      document.getElementById('my_modal_4').close();
      
      // Show error alert after modal is closed
      setTimeout(() => {
        if (error.message?.includes('only create one testimonial')) {
          alertError('Anda sudah memiliki testimoni.');
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

  return (
    <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
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
              onClick={() => document.getElementById('my_modal_4').close()}
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
  );
};

export default FormTestimoni;
