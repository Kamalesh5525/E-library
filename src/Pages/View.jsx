


import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import './view.css';

const View = () => {
    const [record, setRecord] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [returnButtonState, setReturnButtonState] = useState({}); // Track state for each return button
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('course')) || [];
        setRecord(data);
    }, []);

    const filteredRecords = record
        .filter(val => 
            Object.values(val).some(field => 
                String(field).toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .sort((a, b) => {
            const comparison = sortOrder === 'asc' 
                ? a[sortField].localeCompare(b[sortField])
                : b[sortField].localeCompare(a[sortField]);
            return comparison;
        });

    const handleEdit = (val) => {
        navigate(`/edit/${val.id}`);
    };

    const deleteCourse = (id) => {
        const updatedRecords = record.filter(val => val.id !== id);
        setRecord(updatedRecords);
        localStorage.setItem('course', JSON.stringify(updatedRecords));
        toast.success("Record deleted successfully!");
    };

    const borrower = (id) => {
        toast.success("Books successfully borrowed!");
        setTimeout(() => {
            navigate('/'); // Navigate to the add page after 2 seconds
        }, 2000);
    };

    const returnbooks = (id) => {
        toast.success("Books returned successfully!");
        setReturnButtonState(prevState => ({ ...prevState, [id]: true })); // Set the button state to true for the specific ID
        setTimeout(() => {
            navigate('/'); // Navigate to the add page after 2 seconds
        }, 2000);
    };

    const allDelete = () => {
        const updatedRecords = record.filter(val => !selectedIds.has(val.id));
        setRecord(updatedRecords);
        localStorage.setItem('course', JSON.stringify(updatedRecords));
        setSelectedIds(new Set());
        toast.success("Selected records deleted successfully!");
    };

    const handleCheckboxChange = (id) => {
        const updatedSelection = new Set(selectedIds);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedIds(updatedSelection);
    };

    return (
        <div className='mx-auto container-fluid'>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-lg-8 mx-auto ">
                        <h3><Link to="/" style={{ textAlign: "center", color: 'black', fontWeight: "600" }}>Click Add New Books</Link></h3>
                        <h2 style={{ fontWeight: "bold", color: "black", marginBottom: "30px", textDecoration: "underline" }}>VIEW</h2>
                        
                        <div className="mb-3">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="form-control" 
                            />
                        </div>
                        
                        
                        <div className="row my-4    ">
                            {filteredRecords.map(val => (
                                <div key={val.id} className="col-md-4 ">
                                    <div className="card" style={{ background: "#C1D8C3", border: "5px solid #180A0A", borderRadius: "20px", color: "black", fontWeight: "700", fontSize: "20px" }}>
                                        <div className="card-body text-center ">
                                            {val.image && (
                                                <img
                                                    src={val.image}
                                                    alt="Uploaded"
                                                    style={{ width: "100%", height: "200px", border: "2px solid black", borderRadius: "10px", marginBottom: "10px" }}
                                                />
                                            )}
                                            <h5 className="card-title font-bold" style={{ color: "Blue" }}>Title: {val.title}</h5>
                                            <p className="card-text">Genre: {val.dep}</p>
                                            <p className="card-text">Date: {val.int}</p>
                                            <p className="card-text">Option: {val.cuisine}</p>
                                            <p className="card-text">Author: {val.cooking}</p>
                                              
                                            <button className='btn' onClick={() => handleEdit(val)} style={{ fontSize: "30px", color: "black" }}>
                                                <FaEdit />
                                            </button>
                                            <button className='btn' onClick={() => deleteCourse(val.id)} style={{ fontSize: "30px", color: "red" }}>
                                                <MdDelete />
                                            </button>
                                            <div className="form-check mt-2">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    checked={selectedIds.has(val.id)} 
                                                    onChange={() => handleCheckboxChange(val.id)} 
                                                />
                                            </div>
                                            <div>
                                                 <button className='btn btn-primary' onClick={() => borrower(val.id)}>Borrow</button>
                                                <button 
                                                    className={`btn btn-primary mx-2 ${returnButtonState[val.id] ? 'btn-danger' : ''}`} 
                                                    onClick={() => returnbooks(val.id)}
                                                >
                                                    Return
                                                </button>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='btn btn-danger' onClick={allDelete}>Delete Selected</button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default View;
