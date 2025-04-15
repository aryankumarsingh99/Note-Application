import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import NoteModal from "../component/NoteModal";
import NoteCard from "../component/NoteCard";
import { toast } from "react-toastify";
import Login from "./Login";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(false);
 

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
    )
    );
  }, [query, notes]);


  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/get-note",{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };


  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/get-note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("note deleted")
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };



  const editNote = async (id, title, description) => {
    try {
      console.log(IDBRequest);
      
      const response = await axios.put(
        `http://localhost:5000/api/get-note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div className="bg-gray-400 min-h-screen"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1576506542790-51244b486a6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5vdGVzfGVufDB8fDB8fHww')",
    }}
    >
      <Navbar setQuery={setQuery}  />

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-5 gap-6">
        { filteredNotes.length > 0 ? filteredNotes.map((note) => (
          <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote} />
        )) : <p>No notes found</p>}
      </div>
      
      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 text-2xl bottom-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        +
      </button>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
