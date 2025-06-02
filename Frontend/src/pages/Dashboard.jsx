import { useState, useEffect } from "react";
import { alertSuccess, alertError } from "../lib/alerts";
import Footer from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";
import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  updatePassword,
} from "../api/user";
import { useUser } from '../contexts/UserContext';

export default function Dashboard() {
  const { user, updateUser } = useUser();
  const [previewImage, setPreviewImage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  useEffect(() => {
    // Populate form dengan data user dari context
    if (user.name || user.email) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
      
      if (user.image && !previewImage) {
        setPreviewImage(user.image);
      }
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (!allowedFormats.includes(fileExtension)) {
        alertError(`Format file tidak didukung. Harap gunakan format: ${allowedFormats.join(', ').toUpperCase()}`);
        e.target.value = ''; 
        return;
      }
      
      setForm((prev) => ({ ...prev, [name]: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      alertError("Password tidak cocok");
      return;
    }

    try {
      await updateProfile({
        name: form.name,
      });

      let newImageUrl = previewImage;

      // Upload profile picture kalau ada file baru
      if (form.image) {
        const uploadResponse = await uploadProfilePicture(form.image);
        newImageUrl = uploadResponse.data.profile_picture || previewImage;
      }

      // Update password jika diisi
      if (form.password) {
        if (!form.currentPassword) {
          alertError("Masukkan password saat ini untuk mengganti password baru");
          return;
        }
        await updatePassword({
          currentPassword: form.currentPassword,
          newPassword: form.password,
        });
      }

      // Update context dengan data baru
      updateUser({
        name: form.name,
        image: newImageUrl
      });

      alertSuccess("Profil berhasil diperbarui");
      
      // Reset password fields dan form image setelah update sukses
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        password: "",
        confirmPassword: "",
        image: null,
      }));
      
      // Reset password visibility
      setShowCurrentPassword(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      alertError(error.message || "Gagal memperbarui profil");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <NavbarAfter />
      <main className="py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-[#CCF1F9] rounded-full">
              <svg className="w-6 h-6 text-[#00B7E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Edit <span className="text-[#00B7E0]">Profil</span>
            </h1>
          </div>
          <p className="text-gray-600">Kelola informasi profil dan keamanan akun Anda</p>
        </div>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-8 p-8"
            >          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative group">
              <img
                src={
                  previewImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile Preview"
                className="w-48 h-48 rounded-full object-cover border-4 border-[#CCF1F9] shadow-lg"
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                }}
              />
            </div>
            
            {/* Upload Button */}
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Profil
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
                  onChange={handleChange}
                  className="hidden"
                  id="profile-image-input"
                />
                <label 
                  htmlFor="profile-image-input" 
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-[#CCF1F9] rounded-lg bg-[#CCF1F9]/20 hover:bg-[#CCF1F9]/40 transition-colors duration-200 cursor-pointer group"
                >
                  <div className="text-center">
                    <svg className="mx-auto h-6 w-6 text-[#00B7E0] group-hover:text-[#0092b3] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-xs text-gray-600 group-hover:text-gray-800">
                      {form.image ? form.image.name : "Pilih gambar"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 block">
      JPG, JPEG, PNG, GIF (Max 5MB)
    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ganti Password (Opsional)</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Saat Ini
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent transition-all"
                    placeholder="Masukkan password saat ini"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00B7E0] transition-colors"
                  >
                    {showCurrentPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.973 9.973 0 011.875-5.825M21.125 5.175A9.973 9.973 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent transition-all"
                    placeholder="Masukkan password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00B7E0] transition-colors"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.973 9.973 0 011.875-5.825M21.125 5.175A9.973 9.973 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B7E0] focus:border-transparent transition-all"
                    placeholder="Konfirmasi password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00B7E0] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.973 9.973 0 011.875-5.825M21.125 5.175A9.973 9.973 0 0122 9c0 5.523-4.477 10-10 10a10.05 10.05 0 01-1.875-.175M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-[#00B7E0] hover:bg-[#0092b3] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Simpan Perubahan
              </button>
            </div>
          </div>            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}