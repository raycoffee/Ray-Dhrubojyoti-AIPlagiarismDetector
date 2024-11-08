import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultDisplay from "../../components/ResultDisplay/ResultDisplay";
import UploadPopup from "../../components/UploadPopup/UploadPopup";
import mammoth from "mammoth";
import { pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';

import "./UserDocument.css";

const API_URL = process.env.REACT_APP_API_URL;

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const UserDocument = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [processStage, setProcessStage] = useState('');
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showUploadPopup, setShowUploadPopup] = useState(false)

    useEffect(() => {
        if (!location.state?.file) {
            navigate('/');
            return;
        }
        setFile(location.state.file);
        setFileName(location.state.file.name);
        processFile(location.state.file);
        setResult(null)
    }, [location.state, navigate]);

    const parsePDF = async (file) => {
        try {
            setProcessStage('Reading PDF...');
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            const numPages = pdf.numPages;

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + ' ';
                setProgress((i / numPages) * 100);
            }

            return fullText.trim();
        } catch (error) {
            throw new Error('Failed to parse PDF: ' + error.message);
        }
    };

    const parseDocx = async (file) => {
        try {
            setProcessStage('Reading DOCX...');
            setProgress(10); // Started processing

            const arrayBuffer = await file.arrayBuffer();
            setProgress(40); // Got array buffer

            const result = await mammoth.extractRawText({ arrayBuffer });
            setProgress(90); // Extracted text

            const text = result.value;
            setProgress(100); // Completed

            return text;
        } catch (error) {
            throw new Error('Failed to parse DOCX: ' + error.message);
        }
    };

    const parseTxt = async (file) => {
        try {
            setProcessStage('Reading TXT...');
            setProgress(20); // Started processing

            // If we have access to file size, we can make the progress more meaningful
            const fileSize = file.size;
            if (fileSize > 1024 * 1024) { // If file is larger than 1MB
                setProcessStage('Reading large TXT file...');
            }

            setProgress(50); // About to read text

            const text = await file.text();
            setProgress(100); // Completed

            return text;
        } catch (error) {
            throw new Error('Failed to parse TXT: ' + error.message);
        }
    };

    const readFileContent = async (file) => {
        if (!file) return;

        try {
            let text;

            switch (file.type) {
                case 'application/pdf':
                    text = await parsePDF(file);
                    break;

                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    text = await parseDocx(file);
                    break;

                case 'application/msword':
                    throw new Error('Legacy DOC files are not supported. Please convert to DOCX.');

                case 'text/plain':
                    text = await parseTxt(file);
                    break;

                default:
                    throw new Error('Unsupported file type');
            }

            if (!text || text.trim().length === 0) {
                throw new Error('No text content found in the document');
            }

            return text;
        } catch (error) {
            throw new Error(`File processing failed: ${error.message}`);
        }
    };

    const processFile = async (fileToProcess) => {
        if (!fileToProcess) return;

        setIsLoading(true);
        setError(null);
        setProgress(0);

        try {
            setProcessStage('Processing document...');
            const text = await readFileContent(fileToProcess);

            setProcessStage('Checking for plagiarism...');
            const response = await fetch(`${API_URL}/api/v1/plagiarism/check-plagiarism`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            setProcessStage('');
        }
    };

    const handleNewCheck = () => {
        setShowUploadPopup(true)
    };

    if (!file) return null;

    return (
        <>
            {showUploadPopup && <UploadPopup isOpen={showUploadPopup} onClose={() => setShowUploadPopup(false)} />}
            <div className="user-doc-container">
                <div className="user-doc-header">
                    <h1>Document Analysis</h1>
                    <div className="user-doc-file-info">
                        <p>Analyzing: {fileName}</p>
                        {processStage === '' && (
                            <>
                                <button
                                    className="user-doc-new-check-button"
                                    onClick={handleNewCheck}
                                >
                                    Check Another Document
                                </button>
                                {error && (
                                    <div className="user-doc-error-container">
                                        <h3>Error Processing Document</h3>
                                        <p>{error}</p>
                                        <button
                                            className="user-doc-retry-button"
                                            onClick={handleNewCheck}
                                        >
                                            Upload Another Document
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                </div>

                <div className="user-doc-content">
                    {isLoading && (
                        <div className="user-doc-loading-container">
                            <div className="user-doc-progress-bar">
                                <div
                                    className="user-doc-progress"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="user-doc-spinner"></div>
                            <p>{processStage}</p>
                        </div>
                    )}

                    {result && (
                        <div className="user-doc-result-container">
                            <ResultDisplay result={result} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserDocument;