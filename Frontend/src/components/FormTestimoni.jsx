import React, { useState, useEffect } from 'react';

const FormTestimoni = () => {
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(title.trim() !== '' && deskripsi.trim() !== '');
  }, [title, deskripsi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log('Data terkirim:', { title, deskripsi });

    setTitle('');
    setDeskripsi('');
    document.getElementById('my_modal_4').close();
  };

  return (
    <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          Bagikan Pengalaman Anda Bersama <span className="text-[#00B7E0]">Predict</span>.
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-medium">Title :</label>
            <input
              type="text"
              id="title"
              placeholder="Example: Mudah Digunakan dimana saja"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-2 mt-1 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="deskripsi" className="font-medium">Deskripsi :</label>
            <textarea
              id="deskripsi"
              placeholder="Berikan Ulasan Anda"
              required
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="border rounded-lg p-2 mt-1 w-full"
            />
          </div>

          {/* Tombol sejajar di bawah input */}
          <div className="modal-action flex justify-end gap-2">
            <button type="submit" className="btn bg-blueFigma border-none text-white rounded" disabled={!isFormValid}>
              Kirim
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default FormTestimoni;
