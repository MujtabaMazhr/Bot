"use client"
import {useState,useEffect,useRef} from "react"
import "./page.css"

export default function Tic_Tac_Toe(){
    let [user_choice,setUserChoice] = useState(null),[bot_choice,setBotChoice] = useState(null),[take_choice,takeChoice] = useState(false),[turn_of_bot,turnOfBot] = useState(false);
    let circles = [<img src="circle_icon.png" style={{width:"100px",height:"100px"}}></img>,<img src="circle_icon.png"></img>,<img src="circle_icon.png"></img>,<img src="circle_icon.png"></img>,<img src="circle_icon.png"></img>,<img src="circle_icon.png"></img>,<img src="circle_icon.png"></img>,<img src="circle_icon.png"></img>,<img src="circle_icon.png"></img>];
    let crosses = [<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>,<img src="cross_icon.png"></img>]
    let [display_circles,setDisplayCircles] = useState([false,false,false,false,false,false,false,false,false]);
    let circles_array = [false,false,false,false,false,false,false,false,false];
    let [display_crosses,setDisplayCrosses] = useState([false,false,false,false,false,false,false,false,false]);
    let crosses_array = [false,false,false,false,false,false,false,false,false];
    let [bot_place,setBotPlace] = useState([false,false,false,false,false,false,false,false,false]);
    let object_ref = useRef(null),number = useRef(0);
    function playTicTacToe(){
        //setTimeout(()=>{setBotChoice("Circle");setUserChoice("Cross");console.log("User Choice Should be Cross: ",user_choice);turnOfBot(true);},4000);
        /*setInterval(()=>{
            if (user_choice==null&&bot_choice==null){
                if (y_axis.current<50){for (let index=1;index<=11;index++){y_axis.current = y_axis.current+1;console.log("Y Axis: ",y_axis.current);}}
                else{setBotChoice("Circle");setUserChoice("Cross");console.log("User Choice Should be Cross: ",user_choice);turnOfBot(true);}
            }
        },1000);*/
        console.log("User CHoice: ",user_choice);console.log("Bot CHoice: ",bot_choice);
        // display_circles[0]==false&&turn_of_bot==true&&((bot_place[1]==true&&bot_place[2]==true))
        if (turn_of_bot==true){
            console.log("Condition Satisfied.");
            if (bot_place[2]==true&&bot_place[1]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[0]==false&&display_crosses[0]==false){array[0] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[1]==true&&bot_place[0]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[2]==false&&display_crosses[2]==false){array[2] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[2]==true&&bot_place[0]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[1]==false&&display_crosses[1]==false){array[1] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[5]==true&&bot_place[4]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[3]==false&&display_crosses[3]==false){array[3] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[3]==true&&bot_place[4]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[5]==false&&display_crosses[5]==false){array[5] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[3]==true&&bot_place[5]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[4]==false&&display_crosses[4]==false){array[4] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[7]==true&&bot_place[6]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[8]==false&&display_crosses[8]==false){array[8] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[8]==true&&bot_place[6]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[7]==false&&display_crosses[7]==false){array[7] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[7]==true&&bot_place[8]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[6]==false&&display_crosses[6]==false){array[6] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[0]==true&&bot_place[3]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[6]==false&&display_crosses[6]==false){array[6] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[0]==true&&bot_place[6]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[3]==false&&display_crosses[3]==false){array[3] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[3]==true&&bot_place[6]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[0]==false&&display_crosses[0]==false){array[0] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[4]==true&&bot_place[7]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[1]==false&&display_crosses[1]==false){array[1] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[1]==true&&bot_place[4]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[7]==false&&display_crosses[7]==false){array[7] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[7]==true&&bot_place[1]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[4]==false&&display_crosses[4]==false){array[4] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[8]==true&&bot_place[2]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[5]==false&&display_crosses[5]==false){array[5] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[5]==true&&bot_place[2]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[8]==false&&display_crosses[8]==false){array[8] = true;}
                return array;
            });turnOfBot(false);}
            if (bot_place[8]==true&&bot_place[5]==true){
                setBotPlace(previous=>{
                let array = [...previous];
                if (display_circles[2]==false&&display_crosses[2]==false){array[2] = true;}
                return array;
            });turnOfBot(false);}
            else{
                number.current = Number(String(Math.random())[2])
                if (bot_place[number.current]==false&&(display_circles[number.current]==false&&display_crosses[Number(String(Math.random())[2])]==false)){
                    setBotPlace(previous=>{
                        let array = [...previous];
                        array[number.current] = true;
                        console.log("NUmber: ",number.current);
                        return array;
                    });turnOfBot(false);
                }
                else{
                    for (let index=0;index<=8;index++){
                        if (display_circles[index]!=true&&display_crosses[index]!=true&&(bot_place[index]==false)){
                            setBotPlace(previous=>{
                                let array = [...previous];
                                array[index] = true;
                                return array;
                            });turnOfBot(false);
                            break
                        }
                    }
                }
            }
        }
    }
    playTicTacToe();console.log("User CHoice: ",user_choice);
    return(
        <>
          <div className="container">
            <div className="Logo" style={{marginLeft:"40px",width:"200px",marginTop:"60px",display:"flex",cursor:"pointer"}} onClick={()=>{window.location.href = "/"}}>
                <img src="bot_icon.png" style={{width:"65px",height:"65px",zIndex:"200",borderRadius:"40px"}}></img>
                <div style={{position:"relative",top:"19px",left:"0px"}}>Bot</div>
            </div>
            <div style={{marginTop:"60vh"}}>
                <div style={{display:"flex",justifyContent:"center",position:"relative",top:"-40vh"}}>
                    <div>
                        <div style={{boxShadow:"0px 0px 4px 3px rgba(181, 18, 217, 1)",width:"75vw",position:"relative",top:"15px",backgroundColor:"rgba(224, 125, 246, 1)",height:"2px",borderRadius:"15px"}}></div>
                        <div style={{boxShadow:"0px 0px 4px 3px rgba(181, 18, 217, 1)",width:"75vw",position:"relative",top:"230px",backgroundColor:"rgba(224, 125, 246, 1)",height:"2px",borderRadius:"15px"}}></div>
                        <div className="box1" style={{width:"24%",height:"140px",position:"relative",top:"-140px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                                if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                    setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                        let array = [...previous];
                                        array[0] = true;
                                        return array;
                                    });console.log("DIsplay Circles:0 ",display_circles[0]);turnOfBot(true);
                                }
                                if (user_choice=="Cross"){
                                    setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                        let array = [...previous];
                                        array[0] = true;
                                        return array;
                                    });console.log("Crosses Crosses:0 ",display_crosses[0]);turnOfBot(true);
                                }
                            }
                        }}>
                            {(display_circles[0]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"20px"}}></img>}
                            {(display_crosses[0]==true)&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"20px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[0]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"20px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[0]==true)&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"20px"}}></img>}
                        </div>
                        <div className="box2" style={{width:"24%",height:"200px",position:"relative",top:"-120px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                                if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                    setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                        let array = [...previous];
                                        array[1] = true;
                                        return array;
                                    });console.log("DIsplay Circles:1 ",display_circles[1]);turnOfBot(true);
                                }
                                if (user_choice=="Cross"){
                                    setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                        let array = [...previous];
                                        array[1] = true;
                                        return array;
                                    });console.log("Crosses Crosses:1 ",display_crosses[1]);turnOfBot(true);
                                }
                            }
                        }}>
                            {display_circles[1]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}
                            {display_crosses[1]==true&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[1]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[1]==true)&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}                            
                        </div>
                        <div className="box3" style={{width:"24%",height:"135px",position:"relative",top:"-120px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                            if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                    let array = [...previous];
                                    array[2] = true;
                                    return array;
                                });console.log("DIsplay Circles:2 ",display_circles[2]);turnOfBot(true);
                            }
                            if (user_choice=="Cross"){
                                setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                    let array = [...previous];
                                    array[2] = true;
                                    return array;
                                });console.log("Crosses Crosses:2 ",display_crosses[2]);turnOfBot(true);
                            }
                            }
                        }}>
                            {display_circles[2]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}
                            {display_crosses[2]==true&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[2]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[2]==true)&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"-10px",top:"60px"}}></img>}
                        </div>
                        <div className="box4" style={{width:"53%",height:"130px",position:"relative",left:"25%",top:"-590px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                            if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                    let array = [...previous];
                                    array[3] = true;
                                    return array;
                                });console.log("DIsplay Circles:3 ",display_circles[3]);turnOfBot(true);
                            }
                            if (user_choice=="Cross"){
                                setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                    let array = [...previous];
                                    array[3] = true;
                                    return array;
                                });console.log("Crosses Crosses:3 ",display_crosses[3]);turnOfBot(true);
                            }
                            }
                        }}>
                            {display_circles[3]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"5px",top:"-5px"}}></img>}
                            {display_crosses[3]==true&&<img src="cross_icon.png" style={{width:"90px",height:"100px",position:"relative",left:"0px",top:"-5px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[3]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"5px",top:"-5px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[3]==true)&&<img src="cross_icon.png" style={{width:"90px",height:"100px",position:"relative",left:"0px",top:"-5px"}}></img>}
                        </div>
                        <div className="box5" style={{width:"53%",height:"210px",position:"relative",left:"25%",top:"-580px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                            if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                    let array = [...previous];
                                    array[4] = true;
                                    return array;
                                });console.log("DIsplay Circles:4 ",display_circles[4]);turnOfBot(true);
                            }
                            if (user_choice=="Cross"){
                                setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                    let array = [...previous];
                                    array[4] = true;
                                    return array;
                                });console.log("Crosses Crosses:4 ",display_crosses[4]);turnOfBot(true);
                            }
                            }
                        }}>
                            {display_circles[4]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"5px",top:"50px"}}></img>}
                            {display_crosses[4]==true&&<img src="cross_icon.png" style={{width:"90px",height:"100px",position:"relative",left:"0px",top:"50px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[4]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"5px",top:"50px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[4]==true)&&<img src="cross_icon.png" style={{width:"90px",height:"100px",position:"relative",left:"0px",top:"50px"}}></img>}
                        </div>
                        <div className="box6" style={{width:"53%",height:"140px",position:"relative",left:"25%",top:"-575px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                            if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                    let array = [...previous];
                                    array[5] = true;
                                    return array;
                                });console.log("DIsplay Circles:5 ",display_circles[5]);turnOfBot(true);
                            }
                            if (user_choice=="Cross"){
                                setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                    let array = [...previous];
                                    array[5] = true;
                                    return array;
                                });console.log("Crosses Crosses:5 ",display_crosses[5]);turnOfBot(true);
                            }
                            }
                        }}>
                            {display_circles[5]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"5px",top:"45px"}}></img>}
                            {display_crosses[5]==true&&<img src="cross_icon.png" style={{width:"90px",height:"100px",position:"relative",left:"0px",top:"45px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[5]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"5px",top:"45px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[5]==true)&&<img src="cross_icon.png" style={{width:"90px",height:"100px",position:"relative",left:"0px",top:"45px"}}></img>}
                        </div>                        
                        <div className="box7" style={{width:"24%",height:"150px",position:"relative",left:"79%",top:"-1120px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                            if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                    let array = [...previous];
                                    array[6] = true;
                                    return array;
                                });console.log("DIsplay Circles:6 ",display_circles[6]);turnOfBot(true);
                            }
                            if (user_choice=="Cross"){
                                setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                    let array = [...previous];
                                    array[6] = true;
                                    return array;
                                });console.log("Crosses Crosses:6 ",display_crosses[6]);turnOfBot(true);
                            }
                            }
                        }}>
                            {display_circles[6]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"45px"}}></img>}
                            {display_crosses[6]==true&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"20px",top:"45px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[6]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"45px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[6]==true)&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"20px",top:"45px"}}></img>}

                        </div>
                        <div className="box8" style={{width:"24%",height:"210px",position:"relative",left:"79%",top:"-1100px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                            if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                    let array = [...previous];
                                    array[7] = true;
                                    return array;
                                });console.log("DIsplay Circles:7 ",display_circles[7]);turnOfBot(true);
                            }
                            if (user_choice=="Cross"){
                                setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                    let array = [...previous];
                                    array[7] = true;
                                    return array;
                                });console.log("Crosses Crosses:7 ",display_crosses[7]);turnOfBot(true);
                            }
                            }
                        }}>
                            {display_circles[7]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"75px"}}></img>}
                            {display_crosses[7]==true&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"20px",top:"75px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[7]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"75px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[7]==true)&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"20px",top:"75px"}}></img>}
                        </div> 
                        <div className="box9" style={{width:"24%",height:"140px",position:"relative",left:"79%",top:"-1090px",display:"flex",justifyContent:"center"}} onClick={()=>{
                            if (turn_of_bot==false){
                            if ((user_choice==null&&bot_choice==null)||user_choice=="Circle"){
                                setUserChoice("Circle");setBotChoice("Cross");setDisplayCircles(previous=>{
                                    let array = [...previous];
                                    array[8] = true;
                                    return array;
                                });console.log("DIsplay Circles:8 ",display_circles[8]);turnOfBot(true);
                            }
                            if (user_choice=="Cross"){
                                setUserChoice("Cross");setBotChoice("Circle");setDisplayCrosses(previous=>{
                                    let array = [...previous];
                                    array[8] = true;
                                    return array;
                                });console.log("Crosses Crosses:8 ",display_crosses[8]);turnOfBot(true);
                            }
                            }
                        }}>
                            {display_circles[8]==true&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"55px"}}></img>}
                            {display_crosses[8]==true&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"55px"}}></img>}
                            {(bot_choice=="Circle"&&bot_place[8]==true)&&<img src="circle_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"55px"}}></img>}
                            {(bot_choice=="Cross"&&bot_place[8]==true)&&<img src="cross_icon.png" style={{width:"115px",height:"100px",position:"relative",left:"15px",top:"55px"}}></img>}
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <div style={{boxShadow:"0px 0px 4px 3px rgba(14, 110, 212, 1)",height:"75vh",width:"2px",position:"relative",left:"-57vw",top:"-135px",backgroundColor:"rgba(12, 146, 235, 1)",borderRadius:"15px"}}></div>
                        <div style={{boxShadow:"0px 0px 4px 3px rgba(14, 110, 212, 1)",height:"75vh",width:"2px",position:"relative",left:"-16vw",top:"-135px",backgroundColor:"rgba(12, 146, 235, 1)",borderRadius:"15px"}}></div>
                    </div>
                    <div style={{backgroundColor:"white",width:"1px",height:"1px",position:"relative",top:`0px`,left:"50vw",animation:"object_animation 4s ease-in-out 0s 1 alternate forwards"}} ref={object_ref} onAnimationEnd={()=>{
                        console.log(object_ref.current.style.top);
                        if (user_choice==null&&bot_choice==null){setBotChoice("Circle");setUserChoice("Cross");console.log("User Choice Should be Cross: ",user_choice);turnOfBot(true);}
                    }}></div>
                </div>
            </div>
          </div>
        </>
    )
}