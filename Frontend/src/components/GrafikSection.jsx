import React from 'react'

const GrafikSection = () => {
  return (
    <div>
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white">
                <h3 className="text-lg">
                Grafik Risiko Per Bulan
                </h3>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn bg-blueFigma border-none text-white rounded">
                    Close
                    </button>
                </form>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default GrafikSection