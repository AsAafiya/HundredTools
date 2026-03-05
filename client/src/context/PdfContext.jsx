import { useState } from "react";
import {fakeMargePDF} from "../services/pdfService";

function Merge(){
    const[loading,setLoading]=useState(false);
    const [message,setMessage]=useState("");
    const[error,setError]= useState("");

    const handleMerge=async()=>{
        setLoading(true);
        setMessage("");
        setError("");

      try{
        const response=await fakeMargePDF()
         setMessage(response)
      }catch(err){
       setError(err);
      }finally{
        setLoading(false)
      }
    };

    return(
        <div>
            <h2>Merge Pdf Tools</h2>

            <button onClick={handleMerge} disabled={loading}>Merge PDF</button>

            {loading && <p>Proccesing</p>}

        {message && <p style={{color:"green"}}>{message}</p>}

        {error && <p style={{color:"red"}}>{error}</p>}
        </div>
    );
};

export default Merge;
