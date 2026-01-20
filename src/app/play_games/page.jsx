"use client"
import {useState,useEffect,useRef} from "react"
import "./page.css"

export default function Play_Games(){
    return(
        <>
          <div className="container" style={{marginTop:"100vh"}}>
            <div style={{position:"relative",top:"-93vh"}}>
                <div className="Logo" style={{marginLeft:"40px",marginTop:"60px",display:"flex",cursor:"pointer",width:"200px"}} onClick={()=>{window.location.href = "/"}}>
                    <img src="bot_icon.png" style={{width:"65px",height:"65px",zIndex:"200",borderRadius:"40px"}}></img>
                    <div style={{position:"relative",top:"19px",left:"7px"}}>Bot</div>
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <div onClick={()=>{window.open("/tic_tac_toe","_blank")}} style={{cursor:"pointer"}}>
                            <img src="tic_tac_toe.png" style={{width:"300px",height:"300px"}}></img>
                            <div style={{position:"relative",left:"30px"}}>Play Tic Tac Toe with Bot</div>
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",marginTop:"75px"}}>
                        <div onClick={()=>{window.open("/gun_war","_blank")}} style={{cursor:"pointer"}}>
                            <img src="gun_war.png" style={{width:"300px",height:"300px",marginLeft:"0px"}}></img>
                            <div style={{position:"relative",left:"30px"}}>Play Gun War with Bot</div>
                        </div>
                    </div>
                </div>
                <div style={{width:"1px",height:"45vh",boxShadow:"0px 0px 6px 2px rgba(7, 54, 117, 1)",backgroundColor:"rgba(17, 68, 187, 1)",position:"relative",left:"10vw",top:"-300px",border:"none",animation:"line1_animation 4s ease-in-out 0s infinite alternate forwards"}} className="line1"></div>
                <div style={{width:"1px",height:"45vh",boxShadow:"0px 0px 6px 2px rgba(7, 54, 117, 1)",backgroundColor:"rgba(17, 68, 187, 1)",position:"relative",left:"90vw",top:"-1100px",border:"none",animation:"line2_animation 4s ease-in-out 0s infinite alternate forwards"}} className="line2"></div>
            </div>
          </div>
        </>
    )
}