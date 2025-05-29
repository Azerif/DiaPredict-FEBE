import Swal from "sweetalert2";

export const confirmForm = async () => {
  return Swal.fire({
    icon: "question",
    title: "Konfirmasi",
    text: "Apakah anda yakin data yang di isi Sudah Benar?",
    showDenyButton: true,
    confirmButtonText: "Ya",
    denyButtonText: `Belum`,
  });
};

export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Gagal",
    text: message,
  });
};
