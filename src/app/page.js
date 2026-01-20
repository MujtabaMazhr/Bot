"use client"
import {useState,useEffect,useRef} from "react"
import "./page.css";
import ModelViewer from "./components/ModelViewer";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function App(){
  let [animation1,setAnimation1] = useState("animation1 800ms ease-out 0s 1 alternate forwards"),[container_position,setContainerPosition] = useState(["relative","-100vh"]),[show_effect1,setShowEffect1] = useState(null);
  let [show_effect2,setShowEffect2] = useState(false),[rotation,setRotation] = useState(0);
  let show_text1 = useRef(false),text1_ref = useRef(null),circle_ref = useRef(null),text2_ref = useRef(null),show_text2 = useRef(false),[profile_name,setProfileName] = useState("");
  //vanish_text1==true?"animation2 800ms ease-out 2s 1 alternate forwards":"animation1 800ms ease-out 0s 1 alternate forwards"
  if (typeof window!="undefined"){
    window.addEventListener("scroll",()=>{
      if (window.scrollY>=400){setAnimation1("animation2 800ms ease-out 0s 1 alternate forwards");}
      else{setAnimation1("animation1 800ms ease-out 2s 1 alternate forwards");}
      //console.log((window.scrollY/window.innerHeight)*100);
      //if (window.scrollY>=1270){show_text1.current = true;}
    });
  }
  useEffect(()=>{
    if (typeof window!="undefined"){
      if (localStorage.getItem("username")!=null){setProfileName(localStorage.getItem("username"));}
    }
  })
  return(
    <>
      <div style={{marginTop:"100vh"}}>
        <div style={{position:`${container_position[0]}`,top:`${container_position[1]}`}} className="container">
          <div className="logo" style={{display:"flex",cursor:"pointer",width:"200px",fontFamily:`"Michroma",sans-serif`,position:"relative",top:"60px",left:"50px",zIndex:"200"}}>
            <img src="./bot_icon.png" style={{width:"65px",height:"65px",zIndex:"200",borderRadius:"40px"}}></img>
            <div style={{position:"relative",top:"19px",left:"7px",filter:"drop-shadow(5px 5px 10px #000000ff)"}}>Bot</div>
          </div>
          <img src="./robot_bg_pic.webp" style={{objectFit:"cover",position:"relative",left:"0px",top:"-65px",zIndex:"-1",width:"100vw",height:"100vh"}}></img>
          <div className="content" style={{position:"relative",top:"-90vh"}}>{/*"animation2 800ms ease-out 2s 1 alternate forwards" */}
            <div style={{position:"relative",top:"420px",left:"-12px",fontSize:"larger",width:"300px",animation:`${animation1}`,opacity:"0"}}>Bot - Your AI Friend for Your Daily Routine</div>
            <div style={{position:"relative",top:"90vh"}}>
              <div style={{display:"flex"}} onMouseEnter={()=>{setShowEffect1(true);}} onMouseOut={()=>{setShowEffect1(false);}}>
                <div style={{width:"50vw",display:"flex",justifyContent:"center",height:"30vh"}}><img src="./robot_pic.png" style={{width:"80%",objectFit:"contain",transform:"scaleX(-1)"}}></img></div>
                <div style={{width:"40vw",display:"flex",justifyContent:"center",height:"30vh",flexDirection:"column"}}>
                  <div style={{position:"relative",left:"10px",top:"100px"}}>Bot an AI Friend that is Made for Your Emotional Well-being.</div>
                  <div className="save_button" onClick={()=>{setTimeout(()=>{window.location.href = "./bot"},2000)}}>Talk to Bot</div>
                </div>
              </div>
              <video src="./effect_animation2.mp4" style={{width:"100vw",height:"50vh",objectFit:"cover",animation:show_effect1==true?"animation3 1600ms ease-out 0s 1 alternate forwards":"animation4 1600ms ease-out 0s 1 alternate forwards",opacity:"0",zIndex:"-10",position:"relative",top:"-320px"}} playsInline muted autoPlay loop></video>
              <div style={{display:"flex",position:"relative",top:"-170px",left:"20px"}} onMouseEnter={()=>{setShowEffect2(true);}} onMouseOut={()=>{setShowEffect2(false);}}>
                <div style={{display:"flex",width:"40vw"}}>
                  <div style={{position:"relative",left:"40px",top:"100px"}}>The AI that is being Built to Help in Your Routine Tasks</div>
                </div>
                <div style={{width:"50vw",height:"30vh",display:"flex"}}><img src="./robot_pic.png" style={{width:"80%",objectFit:"contain",transform:"scaleX(1)",position:"relative",left:"50px"}}></img></div>
              </div>
              <div style={{marginBottom:"-120px",position:"relative",top:"-320px",left:"50px"}}><div className="save_button" onClick={()=>{setTimeout(()=>{window.location.href = "./bot"},2000)}}>Try out</div></div>
              {<video src="./effect_animation2.mp4" style={{width:"100vw",height:"50vh",objectFit:"cover",animation:show_effect2==true?"animation3 1600ms ease-out 0s 1 alternate forwards":"animation4 1600ms ease-out 0s 1 alternate forwards",opacity:"0",zIndex:"-10",position:"relative",top:"-420px"}} playsInline muted autoPlay loop></video>}
              <div className="model_container">
                <div style={{display:"flex"}}>
                  <div style={{position:"relative",top:"-300px",left:"44%"}}><ModelViewer rotate3={rotation}></ModelViewer></div>
                  <div style={{position:"relative",left:"-100vw",backgroundColor:"red",width:"50px",height:"50px",animation:"div1_animation 20ms ease-in-out 0s infinite alternate forwards"}} onAnimationIteration={()=>{setRotation(rotation+1);}}></div>
                </div>
                {show_text1.current==true&&<div className="text1" style={{width:"240px",position:"relative",top:"-410px",left:"5%",opacity:"0",animation:"animation5 1.2s ease-in 0s 1 alternate forwards"}}>The Friendly AI with whom You can spend Your Time, Play Games and Research on Web </div>}
                <div style={{width:"100vw",backgroundColor:"red",position:"relative",top:"-560px",opacity:"0"}} ref={text1_ref}>Hello</div>
                <div ref={text2_ref} style={{width:"100vw",backgroundColor:"green",position:"relative",top:"-200px",opacity:"0"}}>Hello2</div>
                {show_text2.current==true&&<div style={{position:"relative",top:"-265px",left:"-30px",opacity:"0",animation:"animation6 2s ease-in 0s 1 alternate forwards"}}>The Upcoming AI Agent - Bot</div>}
                <div ref={circle_ref=>{
                  if (circle_ref&&text1_ref.current){
                    if (circle_ref.getBoundingClientRect().bottom>=text1_ref.current.getBoundingClientRect().top){show_text1.current = true;}
                    if (circle_ref.getBoundingClientRect().bottom>=text2_ref.current.getBoundingClientRect().top){show_text2.current = true;}
                  }
                }} style={{width:"100%",height:"10%",backgroundColor:"white",borderRadius:"100px",position:"fixed",top:"80vh",left:"0vw",opacity:"0"}}></div>
              </div>
              {show_text2.current==true&&<div style={{display:"flex",flexWrap:"wrap",cursor:"default",position:"relative",top:"-180px",justifyContent:"center",animation:"box_container_animation 1300ms ease-out 0s 1 alternate forwards"}}>
                <div style={{width:"10px",borderRadius:"8px",height:"380px",animation:"box1_animation 1300ms ease-out 0s 1 alternate forwards",boxShadow:"0px 0px 10px 3px rgb(66, 7, 138)",backgroundColor:"rgb(59, 7, 122)",position:"relative",left:"0px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <div style={{width:"85%",height:"85%",backgroundColor:"rgb(37, 4, 78)",borderRadius:"18px",paddingTop:"75px",paddingLeft:"20px",display:"flex",flexWrap:"wrap"}}>
                    <div style={{animation:"text2_animation 100ms ease-in-out 2s 1 alternate forwards",opacity:"0"}}>
                      Play Games with Bot, Use it Like a Childhood Friend and Pass Your Free Time with Happiness and Joy.
                      <DotLottieReact
                        src="https://lottie.host/770c1336-30fa-4e64-9141-51f6fdd4908d/5HrAWFqRvq.lottie"
                        loop
                        autoplay
                        style={{width:"130px",height:"340px",position:"relative",top:"-100px",left:"20px"}}
                        onClick={()=>{
                          if (profile_name!=""){window.location.href = "/play_games";}
                          else{window.location.href = "/bot"}
                        }}
                      />
                    </div>
                  </div>  
                </div>
                <div style={{width:"10px",borderRadius:"8px",height:"380px",animation:"box1_animation 1300ms ease-out 0s 1 alternate forwards",boxShadow:"0px 0px 10px 3px rgb(14, 20, 203)",backgroundColor:"rgb(14, 20, 203)",position:"relative",left:"0px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <div style={{width:"85%",height:"85%",backgroundColor:"rgb(18, 22, 137)",borderRadius:"18px",paddingTop:"75px",paddingLeft:"20px",display:"flex",flexWrap:"wrap"}}>
                    <div style={{animation:"text2_animation 100ms ease-in-out 2s 1 alternate forwards",opacity:"0"}}>
                      Chat with Bot AI and Also search the Web through Bot RAG System, and Solve Your Daily Problems.
                      <DotLottieReact
                        src="https://lottie.host/ff11641c-0f70-4c93-8c1f-9df1d1c0b849/kPQ5vXCd2V.lottie"
                        loop
                        autoplay
                        style={{width:"140px",position:"relative",top:"-148px",left:"20px"}}
                        onClick={()=>{window.location.href = "/bot";}}
                      />
                    </div>
                  </div>
                </div>
                <div style={{width:"10px",borderRadius:"8px",height:"380px",animation:"box1_animation 1300ms ease-out 0s 1 alternate forwards",boxShadow:"0px 0px 10px 3px rgb(32, 127, 228)",backgroundColor:"rgb(32, 127, 228)",position:"relative",left:"0px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <div style={{width:"85%",height:"85%",backgroundColor:"rgb(23, 94, 170)",borderRadius:"18px",paddingTop:"75px",paddingLeft:"20px",display:"flex",flexWrap:"wrap"}}>
                   <div style={{animation:"text2_animation 100ms ease-in-out 2s 1 alternate forwards",opacity:"0"}}> 
                      Use it as Your Task Reminder. Bot Reminds Your Tasks and Notes, Set Alarms and Timers on Your Saved Tasks in Bot.
                      <DotLottieReact
                        src="https://lottie.host/cbea1b65-b877-4d32-87b7-b73e051285fa/t7lMvFqBsK.lottie"
                        loop
                        autoplay
                        style={{width:"80px",height:"120px",position:"relative",top:"-20px",left:"60px"}}
                        onClick={()=>{
                          if (profile_name!=""){window.location.href = "/tasks_reminder";}
                          else{window.location.href = "/bot"}
                        }}
                      />
                  </div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
