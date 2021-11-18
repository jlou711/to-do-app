export const MyNote = ({
  unique_key,
  color,
  note_id,
  body,
  created,
  deadline,
  category,
  daysDue,
  toDelete,
  showModal,
  updateBody,
  updateDeadline,
  updateId,
  updateIndex,
  updateCategory,
}) => {
  return (
    <div id={unique_key} className="container mx-auto">
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
        <div className={"px-6 py-4 " + color + " relative"}>
          <button
            className="absolute top-2 right-8"
            onClick={() => {
              updateId(note_id);
              updateBody(body);
              updateDeadline(deadline);
              updateIndex(unique_key);
              updateCategory(category);
              showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button className="absolute top-2 right-2" onClick={toDelete}>
            <svg
              className="h-5 w-5 text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <div className="font-bold text-xl mb-2"></div>
          <p className="text-grey-darker text-base">{body}</p>
        </div>
        <div className="px-3 py-4 bg-gray-100">
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
            Date created: {new Date(created).toLocaleDateString()}
          </span>
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
            Date due: {new Date(deadline).toLocaleDateString()}
          </span>
          <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
            Days until due: {daysDue}
          </span>
        </div>
      </div>
    </div>
  );
};
