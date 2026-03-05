import { useState } from "react";
import  {splitPDF} from "../services/pdfService";

function Split(){
      const[loading,setLoading]=useState(false);
      const[message,setMessage]=useState("")
      const[error,setError]=useState("")

     const handleSplit=async()=>{
      setLoading(true);
      setMessage("");
      setError("");

      try {
            const response=await splitPDF();
            setMessage(response)
      }catch(err){
            setError(err);
      }finally{
            setLoading(false)
      }
     };
      return(
<div>
      <h2>Split PDF Tools</h2>
      <button onClick={handleSplit} disabled={loading}>Split PDF</button>
      {loading && <p>processing</p>}
      {message && <p style={{color:"green"}}>{message}</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
</div>
      )
     };

export default Split;