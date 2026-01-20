"use client"
import { useState, useEffect, useRef } from "react";
import "./page.css";
// Voice Array 4:

export default function Tasks_Reminder() {
    let [total_tasks, setTotalTasks] = useState(0), [do_navigation, doNavigation] = useState(false), [notes_ui, setNotesUI] = useState([]), [nav_animation, setNavAnimation] = useState(""), [do_animation, doAnimation] = useState(false), [notes_index, setNotesIndex] = useState(0);
    let [div_opacity, setDivOpacity] = useState(1), [show_all_tasks, setShowAllTasks] = useState(false), [notes, setNotes] = useState([]), [opacity_container, setOpacityContainer] = useState(1), [add_tasks, setAddTasks] = useState(false), [do_alarm, doAlarm] = useState([]), [do_timer, doTimer] = useState([]),[do_time,doTime] = useState([]);
    let [index1,setIndex1] = useState(0), index2 = useRef(-1), [show_warning1, setShowWarning1] = useState(false), [ids, setIds] = useState([0]), [background_index, setBackgroundIndex] = useState(0), [task_container_class, taskContainerClass] = useState(""), [make_changes, setMakeChanges] = useState([false, false, false]), [values, setValues] = useState([]), [save_timer,setSaveTimer] = useState(null), [save_alarm,setSaveAlarm] = useState(null), [working_alarms,setWorkingAlarms] = useState([]), [working_timers,setWorkingTimers] = useState([]);
    let changes_made = useRef(null), backgrounds_array = useRef([]);
    let background_images = [<img src="./background1.jpg" style={{ width: "200px", height: "140px", borderRadius: "8px" }}></img>, <img src="./background2.png" style={{ width: "200px", height: "140px", borderRadius: "8px" }}></img>, <img src="./background3.png" style={{ width: "200px", height: "140px", borderRadius: "8px" }}></img>, <img src="./background4.png" style={{ width: "200px", height: "140px", borderRadius: "8px" }}></img>], background_images_refs = [useRef(null), useRef(null), useRef(null), useRef(null)],[bg_img_src,setBgImgSrc] = useState("./background1.jpg");
    let timers_refs = [useRef(null), useRef(null), useRef(null), useRef(null)], [timer_type, setTimerType] = useState("timer"), [timer, setTimer] = useState([0, 0, 0]), [alarm, setAlarm] = useState([0, 0]), [timers, setTimers] = useState([]), [alarms, setAlarms] = useState([]),[profile_name,setProfileName] = useState(""),timers_added = useRef(false),voices = useRef("");
    useEffect(()=>{voices.current = speechSynthesis.getVoices();},[]);
    useEffect(()=>{
        if (typeof window!="undefined"){
            if (localStorage.getItem("username")!=null){setProfileName(localStorage.getItem("username"));}
        }
    },[])
    function speak(argument){
        if ("speechSynthesis" in window){
            const utterance = new SpeechSynthesisUtterance(`${argument}`);
            utterance.voice = speechSynthesis.getVoices()[0];
            //utterance.volume= 4
            if (speechSynthesis.getVoices().length>0){window.speechSynthesis.speak(utterance);}
        }
    }
    useEffect(()=>{for (let index=1;index<=100;index++){
        setIds(previous=>[...previous,index]);
        if (do_time.length<=0){doTime(previous=>[...previous,false]);}
    }},[]);
    async function takeData(){
        const fetching = await fetch("/api/notify");
        const response = await fetching.json();
        return response;
    }
    async function getData(){
        const data = await takeData();
        //console.log("Data: ",data);
        for (let index=0;index<=data.message.length-1;index++){
            if (typeof window!="undefined"){
                if (data.message[index].profile_name==localStorage.getItem("username")){setNotes(data.message[index].notes);setAlarms(data.message[index].alarms);setBgImgSrc(data.message[index].background_img_src);doAlarm(data.message[index].do_alarm);doTimer(data.message[index].do_timer);setTimers(data.message[index].timers);setWorkingTimers(data.message[index].working_timers);setWorkingAlarms(data.message[index].working_alarms);doTime(data.message[index].do_time);index2.current = data.message[index].index2;taskContainerClass(data.message[index].task_container_class);}
            }
        }
    }
    useEffect(()=>{getData();},[]);
    async function sendData() {
        const fetching = await fetch("/api/notify",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({"notes":notes,"alarms":alarms,"timers":timers,"working_alarms":working_alarms,"working_timers":working_timers,"do_alarm":do_alarm,"do_timer":do_timer,"profile_name":profile_name,"do_time":do_time,"index2":index2.current,"task_container_class":task_container_class})
        });
        const response = fetching.json();
        return response;
    }
    async function postData(){
        const data = await sendData();
        //console.log("Taken Data: ",data);
    }
    function addTasks() {
        //console.log("Notes: ", notes);
        return (
            <>
                <div className="tasks_popup1" style={{ animation: do_animation == true ? "animation1 800ms ease-out 0s 1 alternate forwards" : "" }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/758/758811.png" style={{ width: "20px", opacity: "1", position: "relative", left: "30px", top: "30px", transform: "scaleX(-1)" }} onClick={() => {
                        //console.log("Wanted Variable: ", notes[index2]);
                        if (changes_made.current == true) { setShowWarning1(true); setOpacityContainer(0); }
                        else {
                            doAnimation(true); setTimeout(() => {
                                doAnimation(false); changes_made.current = false; setNotes(previous => {
                                    let array = [...previous];
                                    array.splice(array.length - 1, 1); index2.current = index2.current - 1;
                                    return array;
                                }); setAddTasks(false);
                            }, 1000); setIndex1(0); setNotesUI([]);
                        }
                    }}></img>
                    <div style={{ fontSize: "large", position: "relative", left: "70px", top: "2px", color: "rgba(17, 108, 207, 1)" }}>Add New Tasks</div>
                    <div className="tasks_popup2" style={{ display: "flex" }}>
                        <textarea key={`${notes_ui.length}`} id={`${ids[index1]}`} rows={5} style={{ fontFamily: `"Michroma",sans-serif`, fontSize: "small", padding: "10px", backgroundColor: "rgb(10,10,10)", border: "1px solid rgb(60,60,60)", borderRadius: "8px", resize: "none", overflowY: "auto", position: "relative", left: "100px", top: "30px", width: "65%", height: "35%", opacity: "0" }}></textarea>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src="./add_icon.png" style={{ width: "29px", height: "29px", marginLeft: "300px", position: "fixed", zIndex: "100" }} onClick={() => {
                                setIndex1(index1 + 1);setNotesUI(previous => [...previous, <textarea key={`${notes_ui.length}`} onKeyDown={(event) => { if (event.key != "Enter" && event.key != "") { changes_made.current = true; } }} rows={5} style={{ fontFamily: `"Michroma",sans-serif`, fontSize: "small", padding: "10px", backgroundColor: "rgb(10,10,10)", border: "1px solid rgb(60,60,60)", borderRadius: "8px", resize: "none", overflowY: "auto", position: "relative", left: "", top: "60px", width: "65%", height: "35%" }} id={`${ids[index1]}`} onChange={(event) => {
                                    if (changes_made.current == true) {
                                        setNotes((previous) => {
                                            let array = [...previous];
                                            if (event.target.value!=""){array[index2.current][Number(event.target.id)] = event.target.value;}
                                            else { changes_made.current = false; }
                                            return array;
                                        });
                                    }
                                }}></textarea>]);
                            }}></img>
                        </div>
                    </div>
                    <div className="save_button_container">{(changes_made.current == true) && <div className="save_button" onClick={() => {
                        setTimeout(() => {
                            doAnimation(true); setShowWarning1(false); setOpacityContainer(1); setTimeout(() => { doAnimation(false); changes_made.current = false; setIndex1(0); setNotesUI([]); setAddTasks(false); }, 1000);
                        }, 1000);
                        if (notes.length>1){taskContainerClass("tasks_container");}
                    }}>Save</div>}</div>
                    {show_warning1 == true && <div style={{ position: "relative", borderRadius: "9px", top: "-60%", left: "50px", backgroundImage: "linear-gradient(135deg, rgb(17,108,207) 0%, rgb(20,20,20) 30%)", width: "75%", height: "190px" }}>
                        <div style={{ position: "relative", left: "20px", top: "15px" }}>Would You Like to Save these Notes?</div>
                        <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px", gap: "35px" }}>
                            <div style={{ backgroundImage: "linear-gradient(90deg, rgb(17,108,207) 0%,rgb(0,0,0) 90%)", width: "70px", height: "30px", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => {
                                doAnimation(true); setShowWarning1(false); setOpacityContainer(1); setTimeout(() => { doAnimation(false); changes_made.current = false; setIndex1(0); setNotesUI([]); setAddTasks(false); }, 1000)
                                if (notes.length>1) { taskContainerClass("tasks_container"); }
                            }}>Save</div>
                            <div style={{ backgroundImage: "linear-gradient(90deg, rgb(17,108,207) 0%,rgb(0,0,0) 90%)", width: "75px", height: "30px", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => {
                                setNotes((previous) => {
                                    let array = [...previous];
                                    array.splice(index2.current, 1); index2.current = index2.current - 1;
                                    return array;
                                }); setShowWarning1(false); setOpacityContainer(1); setTimeout(() => { doAnimation(false); setIndex1(0); setNotesUI([]); setAddTasks(false); changes_made.current = false; }, 1000)
                            }}>Cancel</div>
                        </div>
                    </div>}
                    <div className="popup_container" style={{ opacity: `${opacity_container}` }}>
                        <div className="tasks_popup3" style={{ position: "relative", left: "100px", top: "-220px", display: "flex", flexDirection: "column", gap: "25px", zIndex: "39" }}>
                            {notes_ui}
                        </div>
                    </div>
                </div>
            </>)
    }
    function displayAllTasks() {
        let notes_array = [],default_bg_img = <img src={`${bg_img_src}`} style={{ width: "200px", height: "140px", borderRadius: "8px" }}></img>;
        for (let index = 0; index <= notes.length - 1; index++) {
            //backgrounds_array.current.push(default_bg_img);
            notes_array.push(
                <div key={index} style={{ width: "200px", height: "140px" }}>
                    {background_images[1]}
                    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column", gap: "10px", width: "90%", height: "75%", position: "relative", top: "-120px", left: "10px", overflowX: "scroll", overflowY: "scroll" }} className="notes_container">{notes[index].map(getValue)}</div>
                    <div style={{ position: "relative", top: "-100px", display: "flex", gap: "10px", left: "5px" }}>
                        {/*<img src="./background_icon.png" style={{ width: "23px", zIndex: "100", height: "23px" }} onClick={() => {
                            setBackgroundIndex(index); console.log("Selected INdex: ", index);
                            setMakeChanges(previous => {
                                let array = [...previous];
                                array[0] = true;
                                return array;
                            })
                        }}></img>*/}
                        <img src="./edit_icon.png" style={{ width: "23px", zIndex: "100", height: "23px" }} onClick={() => {
                            setBackgroundIndex(index);
                            setMakeChanges(previous => {
                                let array = [...previous];
                                array[1] = true;
                                return array;
                            })
                        }}></img>
                        <img src="./add_alert_icon.png" style={{ width: "23px", zIndex: "100", height: "23px" }} onClick={() => {
                            setBackgroundIndex(index);
                            if (do_time[index]!=true){
                                setMakeChanges(previous => {
                                    let array = [...previous];
                                    array[2] = true;
                                    return array;
                                });
                            }
                        }} id={`${index}`}></img>
                    </div>
                </div>
            );
        }
        return (
            <>
                <div style={{ display: "flex", flexWrap: "wrap", position: "relative", gap: "60px", top: "30px" }}>
                    {notes_array}
                </div>
            </>
        );
    }
    function getValue(item) {
        let notes_array2 = [];
        notes_array2.push(<div key={item}>{`\n${item}`}</div>);
        return notes_array2;
    }
    function giveValues() {
        let array = [];
        for (let index = 0; index <= notes[background_index].length - 1; index++) {
            array.push(<textarea key={`Value${index}`} value={notes[background_index][index]} style={{ fontFamily: `"Michroma",sans-serif`, fontSize: "small", padding: "10px", backgroundColor: "rgb(10,10,10)", border: "1px solid rgb(60,60,60)", borderRadius: "8px", resize: "none", overflowY: "auto", position: "relative", left: "", top: "60px", width: "65%", height: "35%" }} onChange={(event) => {
                setNotes(previous => {
                    let array = [...previous];
                    array[background_index][index] = event.target.value;
                    return array;
                });
            }}></textarea>);
        }
        return array;
    }
    //setInterval(()=>{
        //if (String(new Date().toLocaleTimeString()).slice(6,8)=="01"){console.log("Current TIme: ", current_time.toLocaleTimeString().slice(6,8));}
        //console.log(String(new Date().toLocaleTimeString()).slice(6,8));
    //},200);
    function ringReminder(){
        let number = 0;
        if (Number(String(new Date().toLocaleTimeString()).slice(0, 2)) > 12) { number = 12 }
        else { number = 0; }
        for (let index = 0; index <= do_alarm.length - 1; index++) {
            if (do_alarm[index]==true){
                //console.log("TIme is Here: ", new Date().toLocaleTimeString());
                //console.log("Working Alarm: ", working_alarms);
                for (let index = 0; index <= working_alarms.length - 1; index++) {
                    if ((Number(String(new Date().toLocaleTimeString()).slice(0, 2)) - number == Number(String(working_alarms[index][0]))) && (Number(String(new Date().toLocaleTimeString()).slice(3, 5)) == Number(String(working_alarms[index][1])))&&(String(new Date().toLocaleTimeString()).slice(6,8)=="01")){
                        speak(notes[background_index][0]);
                        timers_added.current = null;
                    }
                }
            }
        }
        
        for (let index = 0; index <= do_timer.length - 1; index++) {
            if (do_timer[index]==true){
                //console.log("Working TImer: ", working_timers[index]);
                for (let index = 0; index <= working_timers.length - 1; index++) {
                    if ((Number(String(new Date().toLocaleTimeString()).slice(0, 2))-number==Number(String(working_timers[index][0]))) && (Number(String(new Date().toLocaleTimeString()).slice(3, 5)) == Number(String(working_timers[index][1])))&&(Number(String(new Date().toLocaleTimeString()).slice(6,8))==Number(String(working_timers[index][2])))) {timers_added.current = null;}
                }
            }
        }
        if (timers_added.current==null){speak(notes[background_index][0]);timers_added.current = false;}
    }
    //if (remind_task.current==true){useEffect(()=>{speak();remind_task.current = false;console.log("Condition Satisfied. ",remind_task.current);},[]);}
    setInterval(() => { ringReminder(); }, 200);
    return (
        <>
            <div className="container" style={{ marginTop: "100vh" }}>
                <div style={{ position: "relative", top: "-100vh", transition: "opacity 700ms ease-in" }}>
                    <div className="Logo" style={{ display: "flex", opacity: `${div_opacity}`, transition: "opacity 700ms ease-in", cursor: "pointer", width: "200px", fontFamily: `"Michroma",sans-serif`, position: "relative", left: "40px", top: "40px" }} onClick={()=>{window.location.href = "/"}}>
                        <img src="bot_icon.png" style={{ width: "65px", height: "65px", zIndex: "200", borderRadius: "40px" }}></img>
                        <div style={{ position: "relative", top: "19px", left: "7px", filter: "drop-shadow(5px 5px 10px #000000ff)" }}>Bot</div>
                    </div>
                    <div>
                        <img src="https://github.com/MujtabaMazhr/Images/blob/main/navigation_icon.png?raw=true" style={{ width: "40px", filter: "invert(27%) sepia(91%) saturate(1832%) hue-rotate(193deg) brightness(96%) contrast(92%)", position: "relative", left: "90vw", top: "-10px", opacity: `${div_opacity}`, transition: "opacity 700ms ease-in", animation: do_navigation == true ? "navigation_icon_animation 650ms ease-in-out 0s 1 alternate forwards" : "navigation_icon_animation2 650ms ease-in-out 0s 1 alternate forwards", zIndex: "201" }} onClick={() => {
                            //"sidebar_animation2 820ms ease-out 0s 1 alternate forwards":"sidebar_animation 820ms ease-out 0s 1 alternate forwards"
                            if (do_navigation == false) { doNavigation(true); setDivOpacity(.35); setNavAnimation("sidebar_animation 820ms ease-out 0s 1 alternate forwards"); }
                            else { doNavigation(false); setDivOpacity(1); setNavAnimation("sidebar_animation2 820ms ease-out 0s 1 alternate forwards"); }
                        }}></img>
                        <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "60vh", opacity: `${div_opacity}`, transition: "opacity 700ms ease-in" }}>
                            <img src="https://github.com/MujtabaMazhr/Images/blob/main/new_post_icon.png?raw=true" style={{ filter: "invert(1)", width: "30px", height: "30px", zIndex: "50",position:"fixed"}} onClick={() => {
                                if (make_changes[0] == false && make_changes[1] == false && make_changes[2] == false) {
                                    index2.current = index2.current + 1; setNotes(previous => [...previous, []]); setAddTasks(true);
                                    if (do_navigation == true) { doNavigation(false); setDivOpacity(1); setNavAnimation("sidebar_animation2 820ms ease-out 0s 1 alternate forwards"); }
                                }
                            }}></img>
                        </div>
                        <div style={{ width: "55vw", height: "85vh", backgroundColor: "black", position: "relative", left: "100vw", animation: `${nav_animation}`, position: "relative", top: "-140px", zIndex: "200", borderRadius: "10px" }}>
                            <div style={{ position: "relative", top: "130px", left: "0px", opacity: "1", gap: "30px", animation: do_navigation == true ? "buttons_animation 650ms ease-in-out 1s 1 alternate forwards" : "buttons_animation2 650ms ease-in-out 1s 1 alternate forwards" }}>
                                {/*rgb(77,156,240) 0%, */}
                                <div style={{ backgroundImage: "linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", cursor: "default" }} onClick={() => {
                                    if (notes[0] == null) { index2.current = index2.current + 1; setNotes(previous => [...previous, []]);setAddTasks(true); }
                                    setTimeout(() => { setShowAllTasks(true); doNavigation(false); setDivOpacity(1); setNavAnimation("sidebar_animation2 820ms ease-out 0s 1 alternate forwards"); }, 500)
                                }}>Your Tasks</div>
                                {/*<div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"120px",height:"1px",position:"relative",top:"10px"}}></div>*/}
                                {/*<div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",cursor:"default",position:"relative",top:"40px"}}>Recents</div>*/}
                                {/*<div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"120px",height:"1px",position:"relative",top:"50px"}}></div>*/}
                                {/*<div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",cursor:"default",position:"relative",top:"80px"}}>Favourites</div>*/}
                                {/*<div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"120px",height:"1px",position:"relative",top:"90px"}}></div>*/}
                                {/*<div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",cursor:"default",position:"relative",top:"120px"}}>Highest Priority</div>*/}
                                {/*<div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"120px",height:"1px",position:"relative",top:"130px"}}></div>*/}
                                {/*<div style={{backgroundImage:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",cursor:"default",position:"relative",top:"160px"}}>Timer and Alarm</div>*/}
                                {/*<div style={{background:"linear-gradient(90deg, rgb(77,156,240) 0%,rgb(13, 95, 184) 40%,rgba(6, 35, 65, 1) 100%)",width:"120px",height:"1px",position:"relative",top:"170px"}}></div>*/}
                            </div>
                        </div>
                        <div style={{ position: "relative", top: "-90vh" }}>
                            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "50px", zIndex: "50" }}>
                                {add_tasks == true && addTasks()}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "130px" }}>
                                {make_changes[0] == true && <div style={{ backgroundColor: "black", borderRadius: "10px", width: "110vw", height: "300px", zIndex: "101", padding: "40px", display: "flex", justifyContent: "center" }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/758/758811.png" style={{ width: "20px", height: "20px", zIndex: "103", position: "relative", top: "130px", left: "20px", transform: "scaleX(-1)" }} onClick={() => {
                                        setMakeChanges(previous => {
                                            let array = [...previous];
                                            array[0] = false;
                                            return array;
                                        })
                                    }}></img>
                                    <div style={{ position: "relative", top: "50px" }}>Select Background:</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "25px", width: "500px", position: "relative", top: "30px" }}>
                                        <img ref={background_images_refs[0]} src="./background1.jpg" style={{ width: "70px", height: "60px", borderRadius: "8px" }} onClick={() => {backgrounds_array.current[background_index] = background_images[0];background_images_refs[0].current.style.border = "2px solid whitesmoke";background_images_refs[1].current.style.border = "none";background_images_refs[2].current.style.border = "none";background_images_refs[3].current.style.border = "none";setBgImgSrc("./background1.jpg")}}></img>
                                        <img ref={background_images_refs[1]} src="./background2.png" style={{ width: "70px", height: "60px", borderRadius: "8px" }} onClick={() => {backgrounds_array.current[background_index] = background_images[1];background_images_refs[1].current.style.border = "2px solid whitesmoke";background_images_refs[2].current.style.border = "none";background_images_refs[3].current.style.border = "none";background_images_refs[0].current.style.border = "none";setBgImgSrc("./background2.png")}}></img>
                                        <img ref={background_images_refs[2]} src="./background3.png" style={{ width: "70px", height: "60px", borderRadius: "8px" }} onClick={() => {backgrounds_array.current[background_index] = background_images[2];background_images_refs[2].current.style.border = "2px solid whitesmoke";background_images_refs[0].current.style.border = "none";background_images_refs[1].current.style.border = "none";background_images_refs[3].current.style.border = "none";setBgImgSrc("./background3.png")}}></img>
                                        <img ref={background_images_refs[3]} src="./background4.png" style={{ width: "70px", height: "60px", borderRadius: "8px" }} onClick={() => {backgrounds_array.current[background_index] = background_images[3];background_images_refs[3].current.style.border = "2px solid whitesmoke";background_images_refs[0].current.style.border = "none";background_images_refs[1].current.style.border = "none";background_images_refs[2].current.style.border = "none";setBgImgSrc("./background4.png")}}></img>
                                    </div>
                                </div>}
                                {make_changes[1] == true && <div style={{ backgroundColor: "black", borderRadius: "10px", width: "55vw", height: "300px", zIndex: "101", display: "flex", justifyContent: "center" }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/758/758811.png" style={{ width: "20px", height: "20px", zIndex: "103", position: "relative", top: "26px", left: "1px", transform: "scaleX(-1)" }} onClick={() => {
                                        setMakeChanges(previous => {
                                            let array = [...previous];
                                            array[1] = false;
                                            return array;
                                        })
                                    }}></img>
                                    {/*notes[background_index]*/}
                                    {/*<textarea value={notes[background_index]} style={{fontFamily:`"Michroma",sans-serif`,fontSize:"small",padding:"10px",backgroundColor:"rgb(10,10,10)",border:"1px solid rgb(60,60,60)",borderRadius:"8px",resize:"none",overflowY:"auto",position:"relative",left:"",top:"60px",width:"65%",height:"35%"}} onChange={()=>{}}></textarea>*/}
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px", overflowY: "scroll" }} className="values_div">{giveValues()}</div>
                                </div>}
                                {make_changes[2] == true && <div style={{ backgroundColor: "black", borderRadius: "10px", width: "90vw", height: "300px", zIndex: "101", display: "flex", justifyContent: "center" }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/758/758811.png" style={{ width: "20px", height: "20px", zIndex: "103", position: "relative", top: "26px", left: "80px", transform: "scaleX(-1)" }} onClick={() => {
                                        setMakeChanges(previous => {
                                            let array = [...previous];
                                            array[2] = false;
                                            return array;
                                        }); setTimerType("timer"); setSaveTimer(null); setSaveAlarm(false);
                                        if (save_timer == true) {
                                            setTimer(previous => {
                                                let array = [...previous];
                                                for (let index = 0; index <= 2; index++) { array[index] = "0"; }
                                                return array;
                                            }); setAlarm(previous => {
                                                let array = [...previous];
                                                for (let index = 0; index <= 1; index++) { array[index] = "0"; }
                                                return array;
                                            })
                                        }
                                    }}></img>
                                    <div style={{ position: "relative", top: "25px", left: "120px" }}>Add Notification for this Task:</div>
                                    <div className="notification_container">
                                        <div style={{ position: "relative", left: "-70px" }}>
                                            <div ref={timers_refs[0]} style={{ position: "relative", top: "45px", cursor: "default", left: "12px", zIndex: "150", fontSize: "medium", opacity: "1" }} onMouseEnter={() => { timers_refs[0].current.style.animation = "timer_type1 580ms ease-out 0s 1 alternate forwards", timers_refs[1].current.style.animation = "timer_type2 580ms ease-out 0s 1 alternate forwards", setTimerType("timer") }} inputMode="numeric" pattern="[0-9]*">Timer</div>
                                            <div ref={timers_refs[1]} style={{ position: "relative", top: "56px", cursor: "default", left: "12px", zIndex: "350", fontSize: "x-small", opacity: ".5" }} onMouseEnter={() => { timers_refs[0].current.style.animation = "timer_type4 580ms ease-out 0s 1 alternate forwards", timers_refs[1].current.style.animation = "timer_type3 580ms ease-out 0s 1 alternate forwards", setTimerType("alarm") }} inputMode="numeric" pattern="[0-9]*">Alarm</div>
                                        </div>
                                        {timer_type.includes("timer") && <div style={{ position: "relative", left: "-75px" }}>
                                            <input style={{ width: "50px", fontFamily: `"Michroma",sans-serif`, color: "white", height: "50px", border: "none", backgroundColor: "black", opacity: "1", padding: "15px" }} onChange={(event) => {
                                                if (Number(event.target.value)&&Number(event.target.value)<=12) {
                                                    setTimer(previous => {
                                                        let array = [...previous];
                                                        array[0] = event.target.value;
                                                        return array;
                                                    }); setSaveTimer(true);setSaveAlarm(false);
                                                }
                                                else { setSaveTimer(false); }
                                            }}></input>
                                            <div style={{ backgroundColor: "white", width: "50px", height: "1px" }}></div>
                                            <div style={{ position: "relative", top: "7px", left: "15px" }}>H</div>
                                        </div>}
                                        {timer_type.includes("timer") && <div style={{ position: "relative", left: "-75px" }}>
                                            <input style={{ width: "50px", fontFamily: `"Michroma",sans-serif`, color: "white", height: "50px", border: "none", backgroundColor: "black", opacity: "1", padding: "15px" }} onChange={(event) => {
                                                setTimer(previous => {
                                                    let array = [...previous];
                                                    if (Number(event.target.value) && Number(event.target.value) <= 59) {
                                                        array[1] = event.target.value; setSaveTimer(true); setSaveAlarm(false);
                                                    }
                                                    else { setSaveTimer(false); }
                                                    return array;
                                                });
                                            }}></input>
                                            <div style={{ backgroundColor: "white", width: "50px", height: "1px" }}></div>
                                            <div style={{ position: "relative", top: "7px", left: "15px" }}>M</div>
                                        </div>}
                                        {timer_type.includes("timer") && <div style={{ position: "relative", left: "-75px" }}>
                                            <input style={{ width: "50px", fontFamily: `"Michroma",sans-serif`, color: "white", height: "50px", border: "none", backgroundColor: "black", opacity: "1", padding: "15px" }} onChange={(event) => {
                                                setTimer(previous => {
                                                    let array = [...previous];
                                                    if (Number(event.target.value) && Number(event.target.value) <= 59) {
                                                        array[2] = event.target.value; setSaveTimer(true); setSaveAlarm(false);
                                                    }
                                                    else { setSaveTimer(false); }
                                                    return array;
                                                });
                                            }}></input>
                                            <div style={{ backgroundColor: "white", width: "50px", height: "1px" }}></div>
                                            <div style={{ position: "relative", top: "7px", left: "15px" }}>S</div>
                                        </div>}
                                        {timer_type.includes("alarm") && <div style={{ width: "200px", display: "flex", position: "relative", left: "-25px", gap: "15px" }}>
                                            <input ref={timers_refs[2]} style={{ backgroundColor: "black", fontFamily: `"Michroma",sans-serif`, opacity: "1", paddingLeft: "10px", border: "none", width: "50px", height: "50px", position: "relative", border: "3px solid white", borderRadius: "6px", outline: "none" }} onClick={() => { timers_refs[2].current.style.border = "3px solid rgb(17,108,207)", timers_refs[3].current.style.border = "3px solid white" }} inputMode="numeric" pattern="[0-9]*" onChange={(event) => {
                                                setAlarm(previous => {
                                                    let array = [...previous];
                                                    if (Number(event.target.value) && Number(event.target.value) <= 12) {
                                                        array[0] = event.target.value; setSaveTimer(false); setSaveAlarm(true);
                                                    }
                                                    else { setSaveAlarm(false); }
                                                    return array;
                                                });
                                            }}></input>
                                            <input ref={timers_refs[3]} style={{ backgroundColor: "black", fontFamily: `"Michroma",sans-serif`, opacity: "1", paddingLeft: "10px", border: "none", width: "50px", height: "50px", position: "relative", border: "3px solid white", borderRadius: "6px", outline: "none" }} onClick={() => { timers_refs[3].current.style.border = "3px solid rgb(17,108,207)", timers_refs[2].current.style.border = "3px solid white" }} inputMode="numeric" pattern="[0-9]*" onChange={(event) => {
                                                setAlarm(previous => {
                                                    let array = [...previous];
                                                    if (Number(event.target.value) && Number(event.target.value) <= 59) {
                                                        array[1] = event.target.value; setSaveTimer(false); setSaveAlarm(true);
                                                    }
                                                    else { setSaveAlarm(false); }
                                                    return array;
                                                });
                                            }}></input>
                                        </div>}
                                    </div>                                    {/*left: -250px*/}
                                    <div style={{ position: "relative", top: "330px", left: "-225px", display: "flex" }}>
                                        {<div className="save_button2" onClick={() => {
                                            setTimeout(() => {
                                                if (save_timer == true&&timers_added.current!=true) {
                                                    setMakeChanges(previous => {
                                                        let array = [...previous];
                                                        array[2] = false;
                                                        return array;
                                                    }); setTimerType("timer"); setSaveTimer(false); setSaveAlarm(false);
                                                    setTimers(previous => [...previous, timer]);
                                                    doTimer(previous => [...previous, true]);setWorkingTimers(previous => [...previous, timer]);doTime(previous=>{
                                                            let array = [...previous];
                                                            array[background_index] = true;
                                                            return array;
                                                        });timers_added.current = true;
                                                }
                                                else {
                                                    setTimer(previous => {
                                                        let array = [...previous];
                                                        for (let index = 0; index <= 2; index++) { array[index] = "0"; }
                                                        return array;
                                                    })
                                                }
                                                if (save_alarm == true&&timers_added.current!=true) {
                                                    setMakeChanges(previous => {
                                                        let array = [...previous];
                                                        array[2] = false;
                                                        return array;
                                                    }); setTimerType("timer"); setSaveTimer(false); setSaveAlarm(false);
                                                    setAlarms(previous => [...previous, alarm]);
                                                    doAlarm(previous => [...previous, true]); setWorkingAlarms(previous => [...previous, alarm]);doTime(previous=>{
                                                            let array = [...previous];
                                                            array[background_index] = true;
                                                            return array;
                                                        });timers_added.current= true;
                                                }
                                                else {
                                                    setAlarm(previous => {
                                                        let array = [...previous];
                                                        for (let index = 0; index <= 1; index++) { array[index] = "0"; }
                                                        return array;
                                                    })
                                                }
                                            }, 1200);
                                        }}>Save</div>}
                                    </div>
                                </div>}
                            </div>
                            {<div style={{ display: "flex", justifyContent: "center", position: "relative", top: "50px", zIndex: "49", flexWrap: "wrap",width:"92vw" }} className={`${task_container_class}`}>
                                {(show_all_tasks == true && add_tasks == false && (make_changes[0] == false && make_changes[1] == false && make_changes[2] == false)) && displayAllTasks()}
                            </div>}
                            {<div style={{ backgroundColor: "black", width: "110vw", height: "180vh", position: "relative", top: "-80vh",position:"fixed", opacity: "0", zIndex: (make_changes[0] == true || make_changes[1] == true || make_changes[2] == true) ? "100" : "1", animation: (make_changes[0] == true || make_changes[1] == true || make_changes[2] == true) ? "container_animation 800ms ease-in 0s 1 alternate forwards" : "container_animation2 800ms ease-in 0s 1 alternate forwards" }}></div>}
                            {(notes.length>0&&show_all_tasks==true)&&<div className="save_button3" onClick={()=>{postData();}}>Save</div>}
                        </div>
                    </div>
                    <div style={{ opacity: `${div_opacity}`, transition: "opacity 700ms ease-in" }}>
                        <video src="./task_reminder_animation.mp4" autoPlay muted playsInline loop className="bg_video"></video>
                    </div>
                </div>
            </div>
        </>
    )
}