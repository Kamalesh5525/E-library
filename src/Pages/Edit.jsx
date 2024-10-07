


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', dep: '', int: '', cuisine: '', cooking: '' });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('course')) || [];
        const currentCourse = data.find(val => val.id === parseInt(id));
        if (currentCourse) {
            setCourse(currentCourse);
        }
    }, [id]);

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('course')) || [];
        const updatedData = data.map(val => (val.id === parseInt(id) ? course : val));
        localStorage.setItem('course', JSON.stringify(updatedData));
        toast.success("Record updated successfully!");
        navigate('/view'); // Redirect to view page
    };

    return (
        <div className="container">
            <h1>Edit Course</h1>
        <button style={{ width: "120px", display: "flex", textAlign: "center", padding: "5px", margin: "20px 40%", color: "black" }}>
                <Link to="/view" style={{ textAlign: "center", margin: "0 auto", textDecoration: "none", color: 'black', fontWeight: "800" }}>view page</Link>
            </button>

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={course.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="dep" value={course.dep} onChange={handleChange} placeholder="Genre" required />
                <input type="date" name="int" value={course.int} onChange={handleChange} placeholder="Interaction" required />
                
                <select style={{padding:"1px",marginBottom:"10px"}}
                                   type="text" name="cuisine" value={course.cuisine} onChange={handleChange} placeholder="Location" required
                                >
                                    <option value="">Select option</option>
                                    <option value="Borrow">borrow</option>
                                    <option value="Return">return</option>
                                    
                                    
                                         
                                </select>
                <input type="text" name="cooking" value={course.cooking} onChange={handleChange} placeholder="Author" required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Edit;
