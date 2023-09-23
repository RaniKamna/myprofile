import React, { useState } from "react";
import { MdEdit, MdKeyboardArrowLeft, MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const Mybioeditscreen = () => {
    const [formData, setFormData] = useState({
        aboutme: "",
        bloodgroup: "",
        resume: null,
    });

    const navigate = useNavigate();
    const maxCharacters = 500;

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (value.length <= maxCharacters) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileUpload = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, resume: { file, url: URL.createObjectURL(file) } });
    };

    const handleDeleteFile = () => {
        setFormData({ ...formData, resume: null });
    };

    const isFormEmpty = () => {
        return Object.values(formData).some((value) => {
            return value === '' || value === null;
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormEmpty()) {
            console.log(formData);
            localStorage.setItem('formData',JSON.stringify(formData) )
            navigate('/');
        } else {
            alert('Please fill out the form before submitting.');
        }
    };

    return (
        <form className="editbioscreencontainer" onSubmit={handleSubmit}>
            <div className="container">
                <h4>
                    {" "}
                    <Link to='/'>
                        <MdKeyboardArrowLeft style={{ fontSize: "40px" }} />{" "}
                    </Link>
                    <span>My Bio</span>
                </h4>
                <div className="aboutmecontainer">
                    <div className="d-flex justify-content-between">
                        <h5>About me</h5>
                        <MdEdit />
                    </div>
                    <textarea
                        name="aboutme"
                        id=""
                        cols="40"
                        rows="10"
                        placeholder="Write something here..."
                        value={formData.aboutme}
                        onChange={handleInputChange}
                        className="aboutmetextarea"
                    ></textarea>
                    <p>
                        {maxCharacters - formData.aboutme.length}/{maxCharacters}
                    </p>
                </div>
                <hr />
                <div className="bloodgroupcontainer">
                    <h5>Blood group</h5>
                    <select
                        className="form-select"
                        id="inputbloodgroup"
                        value={formData.bloodgroup}
                        name="bloodgroup"
                        onChange={handleInputChange}
                    >
                        <option value="0" defaultValue="selected">
                            Select Option
                        </option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB-">AB-</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
                <div>

                    {formData.resume === null ? <div>
                        <div className="upload-container" onClick={handleFileUpload}>
                            <div className="icon">
                                <img src="upload-icon.png" alt="Upload Icon" />
                            </div>
                            <div className="text">Upload Resume</div>
                        </div>
                        <input
                            type="file"
                            id="fileInput"
                            accept=".pdf"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                        :
                        <div className="pdf-preview">
                            <div className="pdf-preview-header">
                                <h3>{formData.resume.file.name}</h3>
                                <button onClick={handleDeleteFile}> <MdDelete /> </button>
                            </div>
                            <Document file={formData.resume.url}>
                                <div className="pdf-page-container">
                                    <Page
                                        pageNumber={1}
                                        width={365}
                                        height={100}
                                    />
                                </div>
                            </Document>
                        </div>
                    }

                    {error && <p className="error">{error}</p>}
                </div>

                <button type="submit" className="btn" disabled={isFormEmpty()}> Save</button>
            </div>
        </form>
    );
};
