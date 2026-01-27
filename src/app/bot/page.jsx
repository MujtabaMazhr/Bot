"use client"
import {useState,useEffect,useRef} from "react"
import { OpenRouter } from "@openrouter/sdk";
import "./page.css"
// powerful, efficient,

export default function Bot(){
  let [username,setUsername] = useState(""),[date_of_birth,setDateofBirth] = useState(""),[password,setPassword] = useState(""),[profile_pic,setProfilePic] = useState("");
  let [name,setName] = useState(""),[dob,setDob] = useState(""),[pswd,setPswd] = useState(""),[do_login,doLogin] = useState(false),[prompt,setPrompt] = useState(""),[answers,setAnswers] = useState([]),[container_opacity,setContainerOpacity] = useState(1);
  let [show_applications,setShowApplications] = useState(false);
  let queries_ref = useRef([]),queries_divs = [],ai_answers = useRef([]),add_prompt = useRef(true),apps_ui_ref = useRef(null);
  let [button_opacity,setButtonOpacity] = useState(1);
  let input_refs = [useRef(null),useRef(null),useRef(null)],sidebar_ref = useRef(null),prompt_ref = useRef(null),send_button_ref = useRef(null),div1_ref = useRef(null);
  useEffect(()=>{document.title = "Bot";},[]);
  if (typeof window!="undefined"){useEffect(()=>{setUsername(localStorage.getItem("username"));setDateofBirth(localStorage.getItem("date_of_birth"));setPassword(localStorage.getItem("password"));},[]);}
  useEffect(()=>{
    if (typeof window!="undefined"){if (localStorage.getItem("username")==""||localStorage.getItem("username")==null){doLogin(true);}}
  },[]);
  async function sendPic(picture,type){
    const fetching = await fetch("/api/user_data",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({"username":username,"password":password,"type":type})
    });
    const response = await fetching.json();
    return response;
  }
  async function sendProfilePic(picture,type){
    let data = await sendPic(picture,type);
  }
  /*async function getProfilePic(){
    const fetching = await fetch(`/api/user_data?username=${username}&password=${password}`);
    const response = await fetching.json();
    return response;
  }*/
  /*async function getPic(){
    let data = await getProfilePic();
    if (typeof data.message=="object"){setProfilePic(URL.createObjectURL(new Blob([new Uint8Array(data.message)],{type: data.type})));}
    else{setProfilePic(data.message);}
  }*/
  //getPic();
  /*function userPic(){
    return(
      <div style={{backgroundColor:"rgb(25,25,25)",width:"300px",height:"350px",borderRadius:"12px"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
          <div style={{fontSize:"10px",color:"black",backgroundColor:"white",borderRadius:"2vw",width:"170px",height:"30px",position:"relative",top:"65px",fontFamily:`"Michroma",sans-serif`}}><div style={{position:"relative",top:"8px",opacity:".6",width:"250px"}}>Click to Upload Your Image</div><input type="file" style={{width:"100%%",opacity:"0",marginLeft:"-25px",position:"relative",top:"-5px"}} onChange={(event)=>{
            setProfilePic(URL.createObjectURL(event.target.files[0]));
            const reader = new FileReader();
            reader.readAsArrayBuffer(event.target.files[0]);
            reader.onloadend = ()=>{
              if (reader.result){
                const uint8Array = new Uint8Array(reader.result);
                //sendProfilePic(Array.from(uint8Array),event.target.files[0].type);
              }
            }
          }} accept="image/*"></input></div>
        </div>
        <div style={{display:"flex",justifyContent:"center",position:"relative",top:"100px"}}>Or Choose the Avatar</div>
        <div style={{display:"flex",justifyContent:"center",position:"relative",top:"100px",gap:"10px",marginTop:"30px",flexWrap:"wrap"}}>
          <img src="avatar1.png" style={{width:"57px",borderRadius:"50px"}} onClick={()=>{setProfilePic("avatar1.png");sendProfilePic("avatar1.png","string")}}></img>
          <img src="avatar2.png" style={{width:"57px",borderRadius:"50px"}} onClick={()=>{setProfilePic("avatar2.png");sendProfilePic("avatar2.png","string")}}></img>
          <img src="avatar3.png" style={{width:"57px",borderRadius:"50px"}} onClick={()=>{setProfilePic("avatar3.png");sendProfilePic("avatar3.png","string")}}></img>
          <img src="avatar4.png" style={{width:"57px",borderRadius:"50px"}} onClick={()=>{setProfilePic("avatar4.png");sendProfilePic("avatar4.png","string")}}></img>
          <img src="avatar5.png" style={{width:"57px",borderRadius:"50px"}} onClick={()=>{setProfilePic("avatar5.png");sendProfilePic("avatar5.png","string")}}></img>
        </div>
      </div>
    )
  }*/
  function login(){
    return(
        <>
          <div style={{backgroundColor:"rgb(25,25,25)",width:"300px",height:"350px",borderRadius:"12px"}}>
            <img src="https://github.com/MujtabaMazhr/Images/blob/main/close_icon.png?raw=true" style={{width:"19px",height:"19px",position:"relative",left:"29px",top:"20px"}} onClick={()=>{doLogin(false);}}></img>
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column",position:"relative",left:"80px",top:"50px",gap:"40px"}}>
                <input className="input" ref={input_refs[0]} style={{backgroundColor: "white", width: "150px", marginTop: "-1vh", border: "none", borderRadius: "15px", height: "35px", color: "black", fontSize: "small"}} onChange={(event)=>{setName(event.target.value);}} onKeyDown={(event)=>{if (event.key=="Enter"){input_refs[1].current.focus();}}} placeholder="Your Name:"></input>
                <input className="input" ref={input_refs[1]} style={{backgroundColor: "white", width: "150px", marginTop: "-1vh", border: "none", borderRadius: "15px",zIndex:"200", height: "35px", color: "black", fontSize: "small"}} onChange={(event)=>{setDob(event.target.value);}} onKeyDown={(event)=>{if (event.key=="Enter"){input_refs[2].current.focus();}}} placeholder="Date of Birth: 1/1/2007"></input>
                <input className="input" ref={input_refs[2]} style={{backgroundColor: "white", width: "150px", marginTop: "-1vh", border: "none", borderRadius: "15px", height: "35px", color: "black", fontSize: "small"}} onChange={(event)=>{setPswd(event.target.value);}} placeholder="Set a Password:"></input>
                {(name!=""&&dob.length>=8&&pswd.length>=4)&&<div style={{width:"90px",height:"30px",borderRadius:"15px",display:"flex",justifyContent:"center",position:"relative",left:"20px",cursor:"default"}} onClick={()=>{setTimeout(()=>{setUsername(name);setDateofBirth(dob);setPassword(pswd);doLogin(false);},1000)}} className="login">Login</div>}
            </div>
          </div>
        </>
    )
  }
  if (typeof window!="undefined"){if ((username!=""&&password!=""&&date_of_birth!="")&&(username!=null&&password!=null&&date_of_birth!=null)){localStorage.setItem("username",username);localStorage.setItem("date_of_birth",date_of_birth);localStorage.setItem("password",password);}}
  useEffect(()=>{if (prompt==""){setButtonOpacity(0);}},[]);
  async function askMistralAI(){
    const openrouter = new OpenRouter({
      apiKey: "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"
    });
    const stream = await openrouter.chat.send({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant named Bot. - Your name is Bot.- You must never say you are a Mistral, Mixtral, or any other model. - If asked what model you are, reply: "I am Bot."- If asked who created you, reply: "Bot Developer has Created Me."`
        },
        {
          "role": "user",
          "content": `${queries_ref.current[queries_ref.current.length-1]}`
        }
      ],
      stream: true
    });
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        ai_answers.current[ai_answers.current.length-1].push(content);
      }
    }
   //console.log("AI Answers Array: ",ai_answers.current);
   //for (let index=0;index<=ai_answers.current.length-1;index++){setAnswers(previous=>[...previous,<div style={{marginTop:`${index*60}px`}} key={`${index}`}>{ai_answers.current[index]}</div>]);}
   //queries_divs.push(<div style={{marginTop:"60px"}} key={`${ai_answers.current[queries_ref.current.length-1]}`}>{ai_answers.current[queries_ref.current.length-1]}</div>)
   const new_answers_divs = <div style={{marginTop:"60px"}} key={`${ai_answers.current[queries_ref.current.length-1]}`}>{ai_answers.current[queries_ref.current.length-1]}</div>
   setAnswers(previous=>[...previous,new_answers_divs]);
  }
  function content(){
    return(
      <>
        <div className="content_div" style={{width:"100vw",display:"flex",justifyContent:"center",position:"fixed",backgroundColor:"rgb(10,10,10)",zIndex:"100",height:"400px"}} ref={div1_ref}>
          <input style={{width:"60%",height:"60px",backgroundColor:"rgb(30,30,30)",borderRadius:"18px",border:"none",position:"relative",top:"95px",fontFamily:"Michroma",padding:"10px"}} ref={prompt_ref} onChange={(event)=>{
            send_button_ref.current.style.animation = "button2_animation 800ms ease-in 0s 1 alternate forwards";
            if (event.target.value==""){send_button_ref.current.style.animation = "button1_animation 800ms ease-in 0s 1 alternate forwards"}
          }} onKeyDown={(event)=>{if (event.key=="Enter"){
            if (prompt_ref.current.value!=""){
              add_prompt.current = true;
              setPrompt(prompt_ref.current.value);
              queries_ref.current.push(prompt_ref.current.value);
              prompt_ref.current.value = "";
              div1_ref.current.style.animation = "prompt_bar_animation 800ms ease-in 0s 1 alternate forwards";
              //queries_divs.push(<div style={{marginTop:"0px",position:"relative",left:"49vw",width:"120px"}} key={`${queries_ref.current[queries_ref.current.length-1]}`}>{queries_ref.current[queries_ref.current.length-1]}</div>)
              const new_queries_divs = [<div style={{marginTop:"0px",position:"relative",left:"49vw",width:"120px"}} key={`${queries_ref.current[queries_ref.current.length-1]}`}>{queries_ref.current[queries_ref.current.length-1]}</div>]
              //console.log("Queries Divs: ",queries_divs);
              setAnswers(previous=>[...previous,new_queries_divs]);
              ai_answers.current.push([]);askMistralAI();
              for (let index=queries_ref.current.length-1;index<=queries_ref.current.length-1;index++){queries_divs.push(<div style={{marginTop:`${index*60}px`,position:"relative",left:"49vw",width:"120px"}} key={`${queries_ref.current[index]}`}>{queries_ref.current[index]}</div>)}
            }
          }
        }
        }
          ></input>
          <div className="send_button" style={{borderRadius:"40px",width:"38px",height:"38px",position:"relative",top:"105px",left:"7px",opacity:`${button_opacity}`}} ref={send_button_ref} onClick={()=>{
            if (prompt_ref.current.value!=""){
              setPrompt(prompt_ref.current.value);
              queries_ref.current.push(prompt_ref.current.value);
              prompt_ref.current.value = "";
              div1_ref.current.style.animation = "prompt_bar_animation 800ms ease-in 0s 1 alternate forwards";
              //queries_divs.push(<div style={{marginTop:"0px",position:"relative",left:"49vw",width:"120px"}} key={`${queries_ref.current[queries_ref.current.length-1]}`}>{queries_ref.current[queries_ref.current.length-1]}</div>)
              const new_queries_divs = [<div style={{marginTop:"0px",position:"relative",left:"49vw",width:"120px"}} key={`${queries_ref.current[queries_ref.current.length-1]}`}>{queries_ref.current[queries_ref.current.length-1]}</div>]
              setAnswers(previous=>[...previous,new_queries_divs]);
              ai_answers.current.push([]);askMistralAI();
              for (let index=queries_ref.current.length-1;index<=queries_ref.current.length-1;index++){queries_divs.push(<div style={{marginTop:`${index*60}px`,position:"relative",left:"49vw",width:"120px"}} key={`${queries_ref.current[index]}`}>{queries_ref.current[index]}</div>)}
            }
          }}><img src="https://github.com/MujtabaMazhr/Images/blob/main/send_icon.png?raw=true" style={{filter:"invert(0)",width:"19px",height:"19px",position:"relative",left:"10px",top:"10px"}}></img></div>
        </div>
      </>
    )
  }
  return(
    <>
      <div style={{marginTop:"100vh"}} className="container">
        <div style={{position:"relative",top:"-100vh"}}>
          <div style={{position:"relative",top:"0vh",opacity:`${container_opacity}`}}>
            {username==null&&<img src="https://github.com/MujtabaMazhr/Images/blob/main/person_icon.png?raw=true" style={{width:"40px",filter:"brightness(100)",borderRadius:"50px",position:"relative",left:"27px",top:"30px"}} onClick={()=>{doLogin(true);}}></img>}
          </div>
          <div style={{position:"relative",top:"30vh",display:"flex",justifyContent:"center",opacity:`${container_opacity}`}}>
            {do_login==true&&login()}
            {(do_login==false&&username!=null&&username!="")&&content()} 
          </div>
          <div style={{position:"relative",left:"20vw",width:"50vw",top:"0vh",opacity:`${container_opacity}`}}>
            <div style={{opacity:"0"}}>Queries</div>
              {/*<div style={{position:"relative",left:"49vw",width:"120px"}}>{queries_divs}</div>*/}
              <div style={{marginTop:"60px"}}>{answers}</div>
          </div>
          <div className="sidebar" style={{width:"250px",height:"100vh",backgroundColor:"rgb(14,14,14)",position:"relative",left:"-250px",top:"0px",zIndex:"100",position:"fixed",opacity:`${container_opacity}`}} ref={sidebar_ref}>
            <div style={{display:"flex"}}>
                <img src="https://github.com/MujtabaMazhr/Images/blob/main/sidebar_icon.png?raw=true" style={{width:"21px",height:"24px",position:"relative",left:"160px",top:"55px",cursor:"pointer"}} onClick={()=>{
                  sidebar_ref.current.style.animation = "sidebar_animation 500ms ease-in 0s 1 alternate forwards";
                }}></img>
            </div>
          </div>
          <div className="apps_ui" style={{position:"relative",top:"86vh",left:"87vw",zIndex:"102",position:"fixed",animation:"apps_ui_animation 800ms ease-in 0s 1 alternate forwards",transition:"transform 500ms ease-in,filter 500ms ease-in"}} onMouseEnter={()=>{setShowApplications(true);setContainerOpacity(.5)}}>
            <div style={{display:"flex",gap:"2px",marginTop:"4px"}}>
              <div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgba(13, 95, 184, 1) 100%)",width:"15px",height:"15px",borderRadius:"2px"}} ></div>
              <div style={{background:"linear-gradient(90deg, rgba(13, 95, 184, 1) 0%,rgba(3, 23, 48, 1) 100%)",width:"15px",height:"15px",borderRadius:"2px"}}></div>
            </div>
            <div style={{display:"flex",gap:"2px",marginTop:"4px"}}>
              <div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgba(13, 95, 184, 1) 100%)",width:"15px",height:"15px",borderRadius:"2px"}} ></div>
              <div style={{background:"linear-gradient(90deg, rgba(13, 95, 184, 1) 0%,rgba(3, 23, 48, 1) 100%)",width:"15px",height:"15px",borderRadius:"23px"}}></div>
            </div>
          </div>
          {show_applications==true&&
            <div style={{backgroundColor:"rgb(15,15,15)",width:"45%",height:"57%",animation:"apps_animation 800ms ease-in 0s 1 alternate forwards",position:"relative",left:"100vw",top:"200px",position:"fixed",zIndex:"102",borderRadius:"16px",cursor:"default"}} ref={apps_ui_ref}>
              <img src="https://cdn-icons-png.flaticon.com/512/758/758811.png" style={{width:"20px",transform:"scaleX(-1)",position:"relative",top:"-70px",left:"15px"}} onClick={()=>{
                apps_ui_ref.current.style.animation = "apps_animation2 800ms ease-in 0s 1 alternate forwards";
                setTimeout(()=>{setShowApplications(false);setContainerOpacity(1);},1000);
              }}></img>
              <div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",marginLeft:"10px",marginTop:"30px"}} onClick={()=>{window.location.href = "/generate_media"}}>Generate Media</div>
              <div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"120px",height:"1px",marginLeft:"30px",marginTop:"3px"}}></div>
              <div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",marginLeft:"30px",marginTop:"30px"}} onClick={()=>{window.location.href = "/bot"}}>Chat</div>
              <div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"70px",height:"1px",marginLeft:"30px",marginTop:"3px"}}></div>
              <div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",marginLeft:"30px",marginTop:"30px"}} onClick={()=>{window.location.href = "/play_games"}}>Play Games</div>
              <div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"120px",height:"1px",marginLeft:"30px",marginTop:"3px"}}></div>
              <div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",marginLeft:"30px",marginTop:"30px"}} onClick={()=>{window.location.href = "/tasks_reminder"}}>Tasks Reminder</div>
              <div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"150px",height:"1px",marginLeft:"30px",marginTop:"3px"}}></div>
            </div>}
        </div>
      </div>
    </>
  )
}
