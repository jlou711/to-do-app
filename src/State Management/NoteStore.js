import create from "zustand";

export const useStore = create((set) => ({
  notes: [],
  id: 0,
  setNotes: (notes) => {
    set((state) => {
      state.notes = notes;
      return state;
    });
  },
  updateNote: (note, id, index) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    };
    fetch(
      "http://127.0.0.1:8000/notes/" + id,
      requestOptions
    ).then((response) => response.json());
    set((state) => {
      if (note.notes) {
        state.notes[index].notes = note.notes;
      }
      if (note.deadline) {
        state.notes[index].deadline = note.deadline;
      }
      if (note.category) {
        state.notes[index].category = note.category;
      }
      return state;
    });
  },
  deleteNote: (index) => {
    set((state) => {
      const note_id = state.notes.filter((_, i) => index === i)[0].id;
      state.notes = state.notes.filter((_, i) => index !== i);

      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: note_id,
        }),
      };
      if (index > -1) {
        const answer = window.confirm(
          "Are you sure you want to delete this note?"
        );
        if (answer) {
          fetch(
            "http://127.0.0.1:8000/notes/" + note_id,
            requestOptions
          ).then((response) => response.json());
        }
        return state;
      }
    });
  },
  addNote: (note, deadline, category) => {
    if (category === 0) {
      category = 1;
    }
    const noteData = {
      notes: note,
      category: category,
      created: new Date(),
      deadline: deadline,
      id: 0, //Doesn't get used in API
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    };
    fetch("http://127.0.0.1:8000/notes/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        noteData.id = data.id;
        set((state) => ({
          notes: [...state.notes, noteData],
        }));
      });
  },
}));
