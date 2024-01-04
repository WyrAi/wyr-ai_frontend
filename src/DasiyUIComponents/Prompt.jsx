/** @format */

export function closeModal(modalID) {
  document.getElementById(modalID).close();
}
export function openModal(modalID) {
  document.getElementById(modalID).showModal();
}

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
        <div className="modal-box md:min-w-[60vw] p-[35px]">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => closeModal(modalID)}
            >
              X
            </button>
            {children}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Prompt;
