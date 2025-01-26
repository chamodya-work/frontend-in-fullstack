import React, { useEffect, useState } from "react";
import "./doc.css"
import Navbar from "../../Components/Navbar/Navbar";
import docImages from "../../assets/documentry/docImages";
import { useNavigate } from "react-router-dom";

const Docs = () => {
    const navigate = useNavigate();
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const result = await fetch('http://localhost:8081/getAllDocs');
                setDocs(await result.json());
                console.log(docs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return(
        <div className="wrapper__doc">
            <Navbar />
            <div className="doc-heading">
                <h1>Documentaries</h1>
            </div>
            <div className="doc_scroll-wrapper">
                
                <div className="scroll-content">
                {docs.map(doc => (
                        <img src={docImages[doc.poster_path]} alt={docImages[doc.name]} onClick={() => {navigate(`/docTrailer/${doc.doc_id}`)}}/>
                    ))}
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Docs;