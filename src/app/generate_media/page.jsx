"use client"
import {useRef,useState,useEffect} from "react";
import "./page.css";

export default function Generate_Media(){
    //API KEY: AIzaSyBiLDG_0zCzRUuwSmqOuvJb31EDUUrOIXI
    //CX: 85c67bdd4b269422f
    let [content,setContent] = useState([]),[query,setQuery] = useState(""),[send_query,setSendQuery] = useState(false),[div_index,setDivIndex] = useState(0),[image_index,setImageIndex] = useState(1);
    let [video_opacity,setVideoOpacity] = useState(1),[current_content,setCurrentContent] = useState("Images"),[content2,setContent2] = useState([]),[video_links,setVideoLinks] = useState([]);
    let input_ref = useRef(null),image_ref = useRef(null);
    let videos_array = [];
    async function getData(prompt){
        const API_KEY = "AIzaSyBiLDG_0zCzRUuwSmqOuvJb31EDUUrOIXI",CX = "85c67bdd4b269422f";
        if (current_content=="Images"){
            const query = encodeURIComponent(prompt);
            const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&searchType=image`;
            const response = await fetch(url);
            const data = await response.json();
            for (let index=0;index<=data.items.length-1;index++){
                if (String(data.items[index].link).endsWith(".png")||String(data.items[index].link).endsWith(".jpeg")||String(data.items[index].link).endsWith(".jpg")||String(data.items[index].link).endsWith(".webp")||String(data.items[index].link).endsWith(".avif")){
                    setImageIndex(image_index+1);
                    setContent(previous=>[...previous,<img key={`${query}${image_index*(index+1)*Number(String(Math.random())[2])}`} ref={image_ref} className="Image" src={`${data.items[index].link}`} style={{width:"240px",height:"240px",borderRadius:"10px",objectFit:"fill"}}></img>]);
                }
            }
        }
        if (current_content=="Videos"){
            const query = encodeURIComponent(`${prompt} site:youtube.com`);
            const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`;
            const response = await fetch(url);
            const data = await response.json(),array = [];
            /*Replace watch?v= with /embed and Replace playlist?list= with /embed/videoseries?list=*/
            for (let index=0;index<=data.items.length-1;index++){videos_array.push(data.items[index].link);}
            for (let index=0;index<=data.items.length-1;index++){
                setImageIndex(image_index+1);
                if (videos_array[index].includes("watch?v=")){array.push(videos_array[index].replace("watch?v=","embed/"));}
                if (videos_array[index].includes("playlist?list=")){array.push(videos_array[index].replace("playlist?list=","embed/videoseries?list="));}
                setContent2(previous=>[...previous,<iframe key={`${query}${image_index*(index+1)*Number(String(Math.random())[2])}`} src={`${array[index]}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>])
            }
        }
    }
    return(
        <>
          <div className="container" style={{marginTop:"100vh"}}>
            <div style={{position:"relative",top:"-100vh"}}>
                <div className="Logo" style={{display:"flex",cursor:"pointer",width:"200px",fontFamily:`"Michroma",sans-serif`,position:"relative",left:"40px",top:"40px"}} onClick={()=>{window.location.href = "/"}}>
                    <img src="bot_icon.png" style={{width:"65px",height:"65px",zIndex:"200",borderRadius:"40px"}}></img>
                    <div style={{position:"relative",top:"19px",left:"7px",filter:"drop-shadow(5px 5px 10px #000000ff)"}}>Bot</div>
                </div>
                <div className="line1" style={{position:"relative",opacity:"0",left:"80px",top:"70px",backgroundColor:"rgb(77,156,240)",boxShadow:"0px 0px 15px 2px rgb(77,156,240)",width:"1px",height:"80vh"}}></div>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div className="line2" style={{position:"relative",opacity:"0",left:"-80px",top:"30vh",backgroundColor:"rgb(77,156,240)",boxShadow:"0px 0px 15px 2px rgb(77,156,240)",width:"1px",height:"80vh"}}></div>
                </div>
                <div className="content" >
                    {/*Add Everything here.*/}
                    <div style={{display:"flex",position:"fixed",zIndex:"100"}}>
                        <div style={{position:"relative",top:"-270px"}}>
                            <div style={{position:"relative",backgroundColor:current_content=="Images"?"rgb(13, 95, 184)":"rgb(255,255,255)",width:"100px",display:"flex",justifyContent:"center",alignItems:"center",height:"50px",top:"-160px",left:"20px",borderRadius:"40px",border:"1px solid white",color:current_content=="Images"?"white":"rgb(17, 68, 187)",cursor:"pointer"}} onClick={()=>{setCurrentContent("Images")}}>Images</div>
                            <div style={{position:"relative",backgroundColor:current_content=="Videos"?"rgb(13, 95, 184)":"rgb(255,255,255)",width:"100px",display:"flex",justifyContent:"center",alignItems:"center",height:"50px",top:"-150px",left:"20px",borderRadius:"40px",border:"1px solid white",cursor:"pointer",color:current_content=="Videos"?"white":"rgb(17, 68, 187)"}} onClick={()=>{setCurrentContent("Videos")}}>Videos</div>
                        </div>
                        <input ref={input_ref} style={{width:"70vw",height:"100px",backgroundColor:"rgb(30,30,30)",borderRadius:"18px",position:"relative",top:"-300px",left:"-30px",border:"none",fontFamily:`"Michroma",sans-serif`,paddingBottom:"30px",paddingLeft:"20px",overflowX:"scroll"}} onChange={(event)=>{setQuery(event.target.value);}} onKeyDown={(event)=>{
                            if (event.key=="Enter"&&query!=""){
                                setVideoOpacity(.5);getData(event.target.value);setDivIndex(div_index+1);
                                if (current_content=="Images"){setContent(previous=>[...previous,<div key={`Div${div_index}`} style={{position:"relative",left:"0px",top:"0px",marginLeft:"-30px",backgroundColor:"white",opacity:".6",width:"1px",height:"250px"}}></div>]);}
                                setTimeout(()=>{event.target.value = "";setQuery("")},1000);
                            }
                        }}></input>
                        <div className="send_button" style={{borderRadius:"40px",width:"38px",height:"38px",position:"relative",top:"-270px",left:"-10px"}}><img src="https://github.com/MujtabaMazhr/Images/blob/main/send_icon.png?raw=true" style={{filter:"invert(0)",width:"19px",height:"19px",position:"relative",left:"10px",top:"10px"}} onClick={()=>{
                            if (query!=""){
                                setVideoOpacity(.35);getData(query);setDivIndex(div_index+1);
                                if (current_content=="Images"){setContent(previous=>[...previous,<div key={`Div${div_index}`} style={{position:"relative",left:"0px",top:"0px",marginLeft:"-30px",backgroundColor:"white",opacity:".6",width:"1px",height:"250px"}}></div>]);}
                                setTimeout(()=>{input_ref.current.value = "";setQuery("")},1000);
                            }
                        }}></img></div>
                    </div>
                    <div className="content" style={{position:"relative",top:"-100vh",overflowY:"visible",zIndex:"50",height:"40vh",left:"0px",display:"flex",gap:"50px",flexWrap:"wrap"}}>
                        {current_content=="Images"&&content}
                        {current_content=="Videos"&&content2}
                    </div>
                </div>
                <video src="./bg_video.mp4" autoPlay muted playsInline loop className="bg_video" style={{opacity:`${video_opacity}`}}></video>
            </div>
          </div>
        </>
    );
}