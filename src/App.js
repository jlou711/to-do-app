import "./App.css";
import { MyNote } from "./Components/MyNote";
import { NewNote } from "./Components/NewNote";
import { UpdateModal } from "./Components/UpdateModal";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { useStore } from "./State Management/NoteStore";

function GetNotes({
  showModal,
  updateBody,
  updateDeadline,
  updateId,
  updateIndex,
  updateCategory,
}) {
  const notes = useStore((state) => state.notes);
  const deleteNote = useStore((state) => state.deleteNote);
  const oneDay = 24 * 60 * 60 * 1000;
  const categoryColors = {
    1: "bg-blue-300",
    2: "bg-red-300",
    3: "bg-green-300",
  };

  return (
    <>
      {notes.map((value, index) => (
        <MyNote
          unique_key={index}
          color={categoryColors[value.category]}
          note_id={value.id}
          body={value.notes}
          created={value.created}
          deadline={value.deadline}
          category={value.category}
          daysDue={Math.round(
            (Date.parse(value.deadline) - Date.now()) / oneDay
          )}
          toDelete={() => deleteNote(index)}
          showModal={showModal}
          updateBody={updateBody}
          updateDeadline={updateDeadline}
          updateId={updateId}
          updateIndex={updateIndex}
          updateCategory={updateCategory}
        />
      ))}
    </>
  );
}

// Create a client
const queryClient = new QueryClient();
export const Home = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newNotes] = useState([]);
  const [modalBody, setModalBody] = useState("");
  const [modalDeadline, setModalDeadline] = useState("");
  const [modalId, setModalId] = useState("");
  const [modalIndex, setModalIndex] = useState("");
  const [modalCategory, setModalCategory] = useState(0);
  const [editExisting, setEditExisting] = useState(false);
  const { data: categoryList, error } = useQuery("category", () =>
    fetch("http://127.0.0.1:8000/category/").then((result) => result.json())
  );
  const setNotes = useStore((state) => state.setNotes);
  const { isLoading: isLoadNotes, isError: isErrorNotes } = useQuery(
    "notes",
    () =>
      fetch("http://127.0.0.1:8000/notes/")
        .then((result) => result.json())
        .then((response) => setNotes(response))
  );
  if (isLoadNotes) {
    return <span>Loading...</span>;
  }

  if (isErrorNotes) {
    return <span>Error: {error.message}</span>;
  }

  return (
    // Provide the client to your App
    <>
      <GetNotes
        newNotes={newNotes}
        updateBody={(body) => setModalBody(body)}
        updateDeadline={(deadline) => setModalDeadline(deadline)}
        updateId={(id) => setModalId(id)}
        updateIndex={(index) => setModalIndex(index)}
        updateCategory={(category) => setModalCategory(category)}
        showModal={() => {
          setEditExisting(true);
          setShowEditModal(true);
        }}
      />
      <UpdateModal
        modalBody={modalBody}
        modalDeadline={modalDeadline}
        modalId={modalId}
        modalIndex={modalIndex}
        modalCategory={modalCategory}
        showResults={showEditModal}
        closeModal={() => setShowEditModal(false)}
        categoriesList={categoryList}
        editExisting={editExisting}
      />
      <NewNote
        showModal={() => {
          setModalCategory(0);
          setModalBody("");
          setModalDeadline(new Date().toISOString().substring(0, 10));
          setEditExisting(false);
          setShowEditModal(true);
        }}
      />
    </>
  );
};

export const App = () => {
  return (
    // Provide the client to your App
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </>
  );
};
