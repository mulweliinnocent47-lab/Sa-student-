
"use client"
import "./Loading.css"
import {useState,useEffect} from "react"

export default function Loading(){
  const [dots, setDots] = useState(0) 
  const [showFlame, setShowFlame] = useState(true)
  useEffect(() =>
  {const render = setInterval(() => {
    setDots(prev => (prev + 1) % 4)
  }, 1000) 
  return () => clearInterval(render)}
  ,[])
  function Show(){
    setShowFlame(!showFlame)
  }
  return(
    <div className="wrap">
      <div className="main">
    <h1 className="h1"id="h1">loading{".".repeat(dots)}</h1>
    <div id="scene"className="scene"> 
       <div className="glow">
    </div> 
      <div id="flame" 
      onClick={Show}
      className="flame"
      style={{display: showFlame ? "block" : "none"}}>
    </div> 
     <div className="wick"onClick={Show}>
    </div> 
      <div className="candle" onClick={Show}>
    </div> 
     <div className="reflection">
     </div> 
     </div>
   </div>
    </div>
    )
}