

interface ChildProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal:React.FC<ChildProps>=({ isOpen, onClose, children })=> {
  const modalClasses = isOpen ? "block" : "hidden";

  return (
    <div className={`fixed -inset-14 sm:inset-36 ${modalClasses} z-50`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {children}
          <div className="mt-5 sm:mt-6 px-11 mb-5 flex justify-center">
            <button
              onClick={onClose}
              type="button"
              className=" w-20 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
