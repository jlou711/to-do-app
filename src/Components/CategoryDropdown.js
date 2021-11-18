import { useState } from "react";

export const CategoryDropdown = ({ title, list, onSelect }) => {
  const [isListOpen, setDropdownOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(title);
  const dropdown = (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setDropdownOpen(!isListOpen)}
        >
          {selectedTitle}

          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            style={{
              transform: isListOpen ? "rotate(180deg)" : "none",
            }}
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isListOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            maxHeight: "200px",
          }}
        >
          <div className="py-1" role="none">
            {list.map((item) => (
              <a
                href="/#"
                className="dd-list-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => {
                  setSelectedTitle(item.category);
                  onSelect(item);
                  setDropdownOpen(false);
                }}
              >
                {item.category}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  return dropdown;
};
