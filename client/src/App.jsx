import { useState } from 'react'
import './App.css'
import MergePdf from './components/tools/MergePdf.jsx'
import SplitPdf from './components/tools/SplitPdf.jsx'
import CompressPdf from './components/tools/CompressPdf.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MergePdf/>
      <SplitPdf/>
      <CompressPdf/>
    </>
  )
}

export default App
