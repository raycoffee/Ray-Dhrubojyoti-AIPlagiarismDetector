import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPopup.css";

const UploadPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file && (file.type === "application/pdf" || file.type === "application/msword" ||
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setSelectedFile(file);
        } else {
            alert("Please upload a PDF or Word document");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "application/pdf" || file.type === "application/msword" ||
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setSelectedFile(file);
        } else {
            alert("Please upload a PDF or Word document");
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {

            try {
                const formData = new FormData()
                formData.append('document', selectedFile)

                onClose()
                navigate('/user-document', {
                    state: {
                        file: selectedFile
                    }
                })

            } catch (err) {
                console.error("Error uploading this file", err)
                alert("There was an error uploading your file. Please try again.");
            }

        }
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <h2>Upload Document</h2>
                <p className="upload-description">Upload your PDF or Word document for plagiarism analysis</p>

                <div
                    className={`drop-zone ${dragActive ? 'active' : ''} ${selectedFile ? 'has-file' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                    />

                    {selectedFile ? (
                        <div className="file-info">
                            <span className="file-name">{selectedFile.name}</span>
                            <span className="file-size">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                        </div>
                    ) : (
                        <>
                            <div className="upload-icon">📄</div>
                            <p>Drag and drop your file here or click to browse</p>
                            <span className="file-types">Supports: PDF, DOC, DOCX</span>
                        </>
                    )}
                </div>

                <button
                    className={`upload-btn ${selectedFile ? 'active' : ''}`}
                    onClick={handleSubmit}
                    disabled={!selectedFile}
                >
                    {selectedFile ? 'Analyze Document' : 'Select a Document'}
                </button>
            </div>
        </div>
    );
};

export default UploadPopup;