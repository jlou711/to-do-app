import { useEffect, useState } from "react";
import { CategoryDropdown } from "./CategoryDropdown";
import { useStore } from "../State Management/NoteStore";

export const UpdateModal = ({
  editExisting,
  showResults,
  closeModal,
  modalBody,
  modalDeadline,
  modalId,
  modalIndex,
  modalCategory,
  categoriesList,
}) => {
  const updateNote = useStore((state) => state.updateNote);
  const createNote = useStore((state) => state.addNote);
  const [note, setNote] = useState("");
  const [deadline, setDeadline] = useState(modalDeadline);
  const [category, setCategory] = useState(modalCategory);
  const [id, setId] = useState(modalId);
  const [index, setIndex] = useState(modalIndex);
  let title = "New Note";
  if (editExisting) {
    title = "Update Note";
  }
  let categoryTitle = "Category";
  if (modalCategory !== 0) {
    categoryTitle = categoriesList[modalCategory - 1].category;
  }

  useEffect(() => {
    setNote(modalBody);
  }, [setNote, modalBody]);
  useEffect(() => {
    setDeadline(modalDeadline);
  }, [setDeadline, modalDeadline]);
  useEffect(() => {
    setId(modalId);
  }, [setId, modalId]);
  useEffect(() => {
    setIndex(modalIndex);
  }, [setIndex, modalIndex]);
  useEffect(() => {
    setCategory(modalCategory);
  }, [setCategory, modalCategory]);

  const Results = (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <form id="noteform">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <textarea
                      form="noteform"
                      cols="50"
                      rows="5"
                      value={note}
                      onInput={(e) => {
                        setNote(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="mt-2 col-span-2">
                      <label>Deadline: </label>
                      <input
                        type="date"
                        id="myDate"
                        value={deadline}
                        onInput={(e) => {
                          setDeadline(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="mt-2">
                      <CategoryDropdown
                        title={categoryTitle}
                        list={categoriesList}
                        onSelect={(category) => {
                          setCategory(category.id);
                        }}
                      ></CategoryDropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  if (editExisting) {
                    updateNote({ notes: note, deadline, category }, id, index);
                    setNote(note);
                  } else {
                    createNote(note, deadline, category);
                    setNote("");
                  }
                  closeModal();
                }}
              >
                Confirm
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  closeModal();
                  editExisting ? setNote(modalBody) : setNote("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
  return <div>{showResults ? Results : null}</div>;
};
