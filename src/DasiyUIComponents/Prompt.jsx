/** @format */

export function closeModal(modalID) {
  document.getElementById(modalID).close();
}
export function openModal(modalID) {
  document.getElementById(modalID).showModal();
}

// GIVE IT A UNIQUE MODAL ID AND A BUTTON TEXT AND IT WILL OPEN THE MODAL WHEN CLICKED

const Prompt = ({ children, btnText, modalID, btnClasses, isDisabled }) => {
  return (
    <div>
      <button
        className={btnClasses}
        type={"button"}
        disabled={isDisabled || false}
        onClick={() => document.getElementById(modalID).showModal()}
      >
        {btnText}
      </button>
      <dialog id={modalID} className="modal">
        <div className="modal-box md:w-fit md:min-w-[50vw] w-[90%] p-[35px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </button>
            {children}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Prompt;
