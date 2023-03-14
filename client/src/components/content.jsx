import React, { useState, useEffect } from "react";
import axios from "axios";
import { gsap } from 'gsap';

import { MdEdit } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Content({ location }) {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editJournalId, setEditJournalId] = useState();

  const fetchJournals = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/journals");
      setJournals(response.data.journals);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchJournals();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newJournal = {
      title: title,
      content: content,
      location: location,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/journals",
        newJournal
      );
      // setJournals([...journals, response.data.journals]);
      fetchJournals();
      setShowForm(false);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    console.log(setEditJournalId);
    const updatedJournal = {
      title: editTitle,
      content: editContent,
    };
    try {
      const response = await axios.put(
        `http://localhost:8000/api/journals/${editJournalId}`,
        updatedJournal
      );
      fetchJournals();
      setShowEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (journal) => {
    setShowEditForm(true);
    setEditTitle(journal.title);
    setEditContent(journal.content);
    setEditJournalId(journal._id);
  };

  const handleDeleteClick = async (journal) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/journals/${journal._id}`
      );
      fetchJournals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="border-b-2 border-slate-900">
        <button
          className="add_button flex justify-center items-center"
          onClick={() => {
            if(!showForm){
              setShowForm(true)
              setLoading(true);
              
            }else{
              setShowForm(false);
            }
          }}
        >
          <MdAddBox size={40} />
          ADD
        </button>
      </div>
      {showForm && (
        <div className={`form-container w-full m-3 mb-0 p-2  ${loading ? "loading" : ""}`}>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-start justify-around"
          >
            <div className="form-input lg:w-1/2 sm:w-full border-2 flex justify-center p-3 border-slate-900">
              <label className="text-3xl lg:text-4xl mr-2 ">Title-</label>
              <input
                className="w-full h-12 border-b-2 border-slate-500 text-3xl lg:text-4xl p-2 sm:p-0 "
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-input w-full border-2 flex justify-start p-3 border-slate-900 items-center mt-6">
              <label className="text-2xl lg:text-3xl mr-2 ">Content:</label>
              <textarea
                className="w-full h-24 border-b-2 border-slate-500 p-2 text-2xl sm:text-lg"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="btn">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      {showEditForm && (
        <div className="form-container w-full m-3 mb-0 p-2">
          <form
            onSubmit={handleEditFormSubmit}
            className="lex flex-col items-start justify-around"
          >
            <div className="form-input w-1/2 border-2 flex justify-center p-3 border-slate-900">
              <label className="text-3xl lg:text-4xl mr-2">Title</label>
              <input
                className="w-full h-12 border-b-2 border-slate-500 text-3xl lg:text-4xl p-2"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="form-input w-full border-2 flex justify-start p-3 border-slate-900 items-center mt-6">
              <label className="text-2xl lg:text-3xl mr-2 ">Content</label>
              <textarea
                className="w-full h-24 border-b-2 border-slate-500 p-2 text-2xl sm:text-lg"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              ></textarea>
            </div>
            <div className="btn">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {journals.map((journal, index) => (
        <div className="flex w-full flex-col sm:flex-row " key={journal._id}>
          <div className="w-48 p-4 flex items-center sm:justify-start border-slate-900 border-solid border-r-2 hover:border-r-4   sm:w-28 border-b-2">
            <p className="text-xl lg:text-8xl number ">{index + 1}</p>
          </div>
          <div className="p-4 pt-0 content bg-white border-b-2 sm:border-t-2  border-slate-900 w-full break-normal  ">
            <div className="w-full">
              <h2 className="text-3xl lg:text-6xl number p-2 border-b-2 border-slate-900 wrap">
                {journal.title}
              </h2>
            </div>
            <p className="wrap text-xl lg:text-2xl pt-4 w-full p-4">
              {journal.content}
            </p>
            <div className="flex justify-between p-4">
              <div className="extra text-base">
                <p>{new Date(journal.createdAt).toLocaleDateString()}</p>
                <p>{journal.location}</p>
              </div>
              <div className="flex items-center">
                <MdEdit
                  className="edit_btn "
                  size={28}
                  onClick={() => handleEditClick(journal)}
                />
                <MdDelete
                  className="edit_btn "
                  size={28}
                  onClick={() => handleDeleteClick(journal)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Content;
