export const NewNote = ({ showModal }) => {
  return (
    <div className="container mx-auto">
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
        <div className="px-6 py-4 bg-yellow-300 relative">
          <div className="flex flex-col items-center p-12">
            <button className="mx-auto" onClick={showModal}>
              <svg
                className="h-16 w-16 text-gray-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>
            <span className="font-bold text-xl mt-2">New Note?</span>
          </div>
        </div>
      </div>
    </div>
  );
};
