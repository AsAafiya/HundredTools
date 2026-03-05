import { useState } from "react";

import {compressPDF} from "../services/pdfService";

function Compress(){
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")

    const handleCompress= async()=>{
      setLoading(true);
      setMessage("");
      setError("");

     try{
        const response=await compressPDF()
        setMessage(response)
     }catch(err){
        setError(err)
     }finally{
        setLoading(false)
     }
    };
    return(
    <div>
        <h2>Compressed PDF Tools</h2>
        <button onClick={handleCompress} disabled={loading}>Compress PDF</button>
        {loading && <p>processing</p>}
        {message && <p style={{color:"green"}}>{message}</p>}
        {error && <p style={{color:"red"}}>{error}</p>}
    </div>
    )
};


export default Compress;