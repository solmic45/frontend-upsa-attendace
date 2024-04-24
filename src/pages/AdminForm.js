import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { axiosHandler, errorHandler } from "../utils/Helper";
import { GET_FORMS_URL, ACCESS_TOKEN_COOKIE } from "../utils/Constants";
import { toast } from "react-toastify";
import { loadTokenFromLocalStorage } from '../utils/LocalStorage';
import '../styles/AdminForm.css'; // Import the CSS file
import Header from '../components/Header';
import Footer from "../components/Footer";

const AdminForm = () => {
  const [forms, setForms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedForm, setSelectedForm] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axiosHandler({
          method: "GET",
          url: `${GET_FORMS_URL}?page=${page}&limit=10`,
          token: loadTokenFromLocalStorage(ACCESS_TOKEN_COOKIE),
        }).catch((e) => {
          const err = errorHandler(e, true);
          console.log("msg", err)
          toast.error(err.message);
        });
        console.log("response::", response)
        setForms(response.data.forms);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [page]);
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Convert to human-readable format
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleListItemClick = (form) => {
    setSelectedForm(form);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedForm(null);
    setModalOpen(false);
  };

  return (
    <> <Header />
    <div className="admin-form-container">
      <h3>ATTENDANCE RECORDS</h3>
      <ul className="form-list">
        {forms.map((form) => (
          <li key={form._id} className="form-item" onClick={() => handleListItemClick(form)}>
            <p className="form-detail">Index Number: {form.indexNumber}</p>
            <p className="form-detail">Name: {form.name}</p>
            <p className="form-detail">Submitted At: {formatCreatedAt(form.createdAt)}</p> {/* Format createdAt */}

          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
        <p className="modal-detail">Index Number: {selectedForm?.indexNumber}</p>
    <p className="modal-detail">Name: {selectedForm?.name}</p>
    <p className="modal-detail">Email: {selectedForm?.email}</p>
    <p className="modal-detail">Gender: {selectedForm?.gender}</p>
    <p className="modal-detail">Current Level: {selectedForm?.currentLevel}</p>
    <p className="modal-detail">Phone Number: {selectedForm?.phoneNumber}</p>
    <p className="modal-detail">Groupings: {selectedForm?.groupings}</p>
    <p className="modal-detail">Lecturer Name: {selectedForm?.lecturerName}</p>
    <p className="modal-detail">Instructor Seen: {selectedForm?.instructorSeen ? "Yes" : "No"}</p>
    <p className="modal-detail">Course Level: {selectedForm?.courseLevel}</p>
    <p className="modal-detail">Level 400 Course: {selectedForm?.level400Course}</p>
    <p className="modal-detail">Submitted At: {formatCreatedAt(selectedForm?.createdAt)}</p> 

    <button className="close-button" onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
       {/* Pagination controls */}
       <div className="pagination">
         <button className="pagination-button" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
           Previous
         </button>
         <span className="pagination-text">Page {page} of {totalPages}</span>
         <button className="pagination-button" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
           Next
         </button>
       </div>
    </div>
    <Footer />
    </>
  );
};

export default AdminForm;
