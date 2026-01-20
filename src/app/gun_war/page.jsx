"use client"
import { useState,useRef,useEffect } from "react";
import "./page.css";

export default function Gun_War(){
    let [left,setLeft] = useState(0),[top,setTop] = useState(-20),[player_moving_right,setPlayerMovingRight] = useState(true),[player_moving_left,setPlayerMovingLeft] = useState(false),[player_moving,setPlayerMoving] = useState(false),[player_firing,setPlayerFiring] = useState(false),[player_top,setPlayerTop] = useState(85),[player_left,setPlayerLeft] = useState(0),[bombing,setBombing] = useState(false),[total_coins,setTotalCoins] = useState(140);
         /*Pistol,Rm,M5,M4,AK,m134*/
    const guns = [1,2,3,4,5,6],[bot_left,setBotLeft] = useState(20),[bot_top,setBotTop] = useState(0),[bot_health,setBotHealth] = useState(50),[bot_magazine_time,setBotMagazineTime] = useState(2500),[bot_sprite_count,setBotSpriteCount] = useState(0),[bot_walking,setBotWalking] = useState(false),[bot_firing,setBotFiring] = useState(0),[bot_rect_left,setBotRectLeft] = useState(null),[bot_bullet_explosion,setBotBulletExplosion] = useState(0),[bot_rect_top,setBotRectTop] = useState(null),[bot_rect_width,setBotRectWidth] = useState(null),[bot_rect_height,setBotRectHeight] = useState(null),[damage_to_bot,setDamagetoBot] = useState(1),[give_damage,setGiveDamage] = useState(false);
    let [selected_gun,setSelectedGun] = useState("pistol"),[gun_index,setGunIndex] = useState(0),[fire_repetition,setFireRepetion] = useState(1),[bullet_repetition,setBulletRepetition] = useState(0),[guns_unlocked,setGunsUnlocked] = useState([0,0,0,0,0]);
              // singularity_sphere,void_incendiary,echo_charge                     ballistic_core,stellar_collapse,quantum_eraser                    apex_predator,nova_strike
    let [grenade_counts,setGrenadeCounts] = useState([1,1,1]),[bomb_counts,setBombCounts] = useState([1,1,1]),[missile_counts,setMissileCounts] = useState([1,1]),[throwable,setThrowAble] = useState(""),[bomb_left,setBombLeft] = useState(1),[bomb_top,setBombTop] = useState(24),[explosion,setExplosion] = useState(""),[explosion_width,setExplosionWidth] = useState(40),[explosion_count,setExplosionCount] = useState(0),[explode_bomb,setExplodeBomb] = useState(false),[bomb_distance,setBombDistance] = useState(0),[bomb_opacity,setBombOpacity] = useState(1),[bomb_width,setBombWidth] = useState(12),[bomb_height,setBombHeight] = useState(12);
    let [object1_Y,setObject1Y] = useState(0),[scale_x,setScaleX] = useState(1),[fire_distance,setFireDistance] = useState(0),[fire_position,setFirePosition] = useState(0),[gun_load_time,setGunLoadTime] = useState(100),[fire_range,setFireRange] = useState(0),[fire_y,setFireY] = useState(45),[bullet_x,setBulletX] = useState(0),[bullet_y,setBulletY] = useState(48),[bullet_distance,setBulletDistance] = useState(0),[bullet_range,setBulletRange] = useState(0),[selected_bomb,setSelectedBomb] = useState({});
    let [variable,setVariable] = useState(0),[mouse_is_up,setMouseIsUp] = useState(false),time = null,[bullet_angle,setBulletAngle] = useState(20),[show_weapons,setShowWeapons] = useState(false),[bomb_type,setBombType] = useState("Grenade"),[show_guns,setShowGuns] = useState(false),[show_bombs,setShowBombs] = useState(true);
    let button_refs = [useRef(null),useRef(null),useRef(null),useRef(null)],[show_info1,setShowInfo1] = useState(false),[show_info2,setShowInfo2] = useState(false),[show_info3,setShowInfo3] = useState(false),bomb_ref = useRef(null),line_ref = useRef(null),bot_ref = useRef(null),bot_bullet_refs = [useRef(null),useRef(null),useRef(null),useRef(null)],bot_physics = [useRef(0)],game_over_ref = useRef(null),game_won_ref = useRef(null);
    let [save_variables,setSaveVariables] = useState(false),[player_health,setPlayerHealth] = useState(140);
    if (mouse_is_up==true){setTimeout(()=>{setMouseIsUp(null);},5000);}
    function gunLoadTime(){
      setTimeout(()=>{
        setGunLoadTime(guns[gun_index]*1000);
        if (gun_index==0||gun_index==1){setFireRepetion(1);}
        else{setFireRepetion("infinite");}
        if (gun_index==1||gun_index==0){setBulletRepetition(1);}
        if (gun_index>=2&&gun_index<=5){setBulletRepetition(50);}
      },100);
    }
    //useEffect(()=>{gunLoadTime();},[]);
    gunLoadTime();
    useEffect(()=>{
      if (window.matchMedia("(max-width:550px)").matches==true){setFireRange(-16);setBulletRange(-16);}
      if (window.matchMedia("(min-width:551px)").matches==true){setFireRange(-12);setBulletRange(-16);}
      if (window.matchMedia("(min-width:740px)").matches==true){setFireRange(-10);setBulletRange(-16);}
      if (window.matchMedia("(min-width:960px)").matches==true){setFireRange(-8);setBulletRange(-8);}
      if (window.matchMedia("(min-width:1050px)").matches==true){setFireRange(-6);setBulletRange(-6);}
      if (window.matchMedia("(min-width:1660px)").matches==true){setFireRange(-3);setBulletRange(-3);}
      if (window.matchMedia("(min-width:2000px)").matches==true){setFireRange(-1);setBulletRange(-1);}
    },[]);
    useEffect(()=>{
      if (typeof window!="undefined"){
        if (localStorage.getItem("selected_gun")!=null){setSelectedGun(localStorage.getItem("selected_gun"));}
        if (localStorage.getItem("guns_unlocked")!=null){setGunsUnlocked(JSON.parse(localStorage.getItem("guns_unlocked")));}
        if (localStorage.getItem("total_coins")!=null){setTotalCoins(Number(localStorage.getItem("total_coins")));}
        if (localStorage.getItem("grenade_counts")!=null){setGrenadeCounts(JSON.parse(localStorage.getItem("grenade_counts")));}
        if (localStorage.getItem("bomb_counts")!=null){setBombCounts(JSON.parse(localStorage.getItem("bomb_counts")));}
        if (localStorage.getItem("missile_counts")!=null){setMissileCounts(JSON.parse(localStorage.getItem("missile_counts")));}
        if (localStorage.getItem("gun_index")!=null){setGunIndex(JSON.parse(localStorage.getItem("gun_index")));}
        if (localStorage.getItem("damage")!=null){setDamagetoBot(JSON.parse(localStorage.getItem("damage")));}
        setSaveVariables(true);
      }
    },[]);
    function player(){
      let bullet = <img src="./Folder/bullet1.png" ref={player_bullet_ref=>{
        if (player_bullet_ref){
          if ((Number(player_bullet_ref.getBoundingClientRect().left)>=bot_rect_left&&Number(player_bullet_ref.getBoundingClientRect().left)<=bot_rect_left+bot_rect_width)&&(Number(player_bullet_ref.getBoundingClientRect().top)>=bot_rect_top&&Number(player_bullet_ref.getBoundingClientRect().top)<=bot_rect_height+bot_rect_top)){
            if (bot_health>0&&give_damage==true){setBotHealth(bot_health-damage_to_bot);setGiveDamage(false);setTotalCoins(total_coins+2);}
          }
        }
      }} style={{width:"14px",height:"9px",transform:`rotate(${bullet_angle}deg) scaleX(${scale_x})`,position:"relative",top:`${bullet_y}px`,left:`${bullet_x+bullet_distance}vw`,animation:scale_x==1?`bullet_animation 80ms ease-in-out 0s ${bullet_repetition} alternate forwards`:`bullet_animation2 80ms ease-in-out 0s ${bullet_repetition} alternate forwards`}}></img>;
      if (player_moving==true&&mouse_is_up==null){setTimeout(()=>{setPlayerMoving(false);},1000)}
      if (player_firing==true){
        setTimeout(()=>{setPlayerFiring(false);},gun_load_time);
      }
      if (bombing==true&&explode_bomb==true){
        setTimeout(()=>{
          if (throwable.includes("grenade_icon.png")||throwable.includes("void_incendiary.webp")||throwable.includes("echo_charge.png")){setExplosionWidth(40);}
          if (throwable.includes("ballistic_core.png")||throwable.includes("stellar_collapse.png")||throwable.includes("quantum_eraser.png")){setExplosionWidth(60);}
          if (throwable.includes("apex_predator.png")||throwable.includes("nova_strike.png")){setExplosionWidth(75);}
        },100);
        setTimeout(()=>{
          if (explosion_count==0){setExplosion(<img src="./Folder/explosion1.png" style={{width:`${explosion_width}px`,position:"relative",left:`120px`,top:`40px`,animation:"explosion1_animation 10ms ease-in 0s 1 alternate forwards"}} onAnimationEnd={()=>{setExplosionCount(1);}}></img>)}
          if (explosion_count==1){setExplosion(<img src="./Folder/explosion1_2.png" style={{width:`${explosion_width}px`,position:"relative",left:`120px`,top:`40px`,animation:"explosion2_animation 10ms ease-in 0s 1 alternate forwards"}} onAnimationEnd={()=>{setExplosionCount(2);}}></img>)}
          if (explosion_count==2){setExplosion(<img src="./Folder/explosion1_3.png" style={{width:`${explosion_width}px`,position:"relative",left:`120px`,top:`40px`,animation:"explosion3_animation 10ms ease-in 0s 1 alternate forwards"}} onAnimationEnd={()=>{setExplosionCount(3);}}></img>)}
          if (explosion_count==3){setExplosion(<img src="./Folder/explosion1_4.png" style={{width:`${explosion_width}px`,position:"relative",left:`120px`,top:`40px`,animation:"explosion4_animation 10ms ease-in 0s 1 alternate forwards"}} onAnimationEnd={()=>{setExplosionCount(4);}}></img>)}
          if (explosion_count==4){
            setExplosion("");setExplosionCount(0);setExplodeBomb(false);setBombing(false);
            if (selected_bomb.grenade==0){setBotHealth(bot_health-3);}
            if (selected_bomb.grenade==1){setBotHealth(bot_health-4);}
            if (selected_bomb.grenade==2){setBotHealth(bot_health-5);}
            if (selected_bomb.bomb==0){setBotHealth(bot_health-5);}
            if (selected_bomb.bomb==1){setBotHealth(bot_health-5);}
            if (selected_bomb.bomb==2){setBotHealth(bot_health-6);}
            if (selected_bomb.missile==0){setBotHealth(bot_health-6);}
            if (selected_bomb.missile==1){setBotHealth(bot_health-7);}
          }
          setBombOpacity(0);
        },200);
      }
      //Number(refs[index].current.getBoundingClientRect().left)>=Number(div_ref.current.getBoundingClientRect().left-50)
      return(
      <>
        <div style={{position:"relative",left:"45vw",top:"-100px",zIndex:"400"}}>
          {(player_firing==false&&player_moving_right==true&&player_moving==false)&&<img src="./Folder/player.png" style={{width:"10px",height:"50px",position:"relative",top:`${player_top}px`,left:`${player_left}vw`}}></img>}
          {(player_firing==false&&player_moving_left==true&&player_moving==false)&&<img src="./Folder/player.png" style={{width:"10px",transform:"scaleX(-1)",height:"50px",position:"relative",top:`${player_top}px`,left:`${player_left}vw`}}></img>}
          {(player_firing==false&&variable==0&&player_moving==true)&&<img src="./Folder/player1_2.png" style={{width:"40px",transform:`scaleX(${scale_x})`,height:"50px",position:"relative",top:`${player_top}px`,left:`${player_left}vw`}}></img>}
          {(player_firing==false&&variable==1&&player_moving==true)&&<img src="./Folder/player1_3.png" style={{width:"40px",transform:`scaleX(${scale_x})`,height:"50px",position:"relative",top:`${player_top}px`,left:`${player_left}vw`}}></img>}
          {(player_firing==false&&variable>=2&&player_moving==true)&&<img src="./Folder/player1.png" style={{width:"40px",transform:`scaleX(${scale_x})`,height:"50px",position:"relative",top:`${player_top}px`,left:`${player_left}vw`}}></img>}
          {(player_firing==true)&&
          <div>
            <img src={`./Folder/${selected_gun}_player.png`} style={{width:"60px",transform:`scaleX(${scale_x})`,height:"60px",position:"relative",top:`${player_top}px`,left:`${player_left}vw`}}></img>
            <img src={`./Folder/gun_fire.png`} style={{width:"12px",height:"12px",position:"relative",left:`${fire_position+fire_distance}vw`,top:`${fire_y}px`,opacity:"1",animation:`gun_fire_animation 80ms ease-in-out 0s ${fire_repetition} alternate forwards`}}></img>
            {bullet}
          </div>
          }
          {bombing==true&&<div>
                  <img src={throwable} style={{width:`${bomb_width}px`,height:`${bomb_height}px`,position:"relative",left:`${bomb_distance+bomb_left}vw`,top:`${bomb_top}px`,animation:"bomb_animation 100ms ease-in 0s 1 alternate forwards",transition:"left 650ms ease-in, top 650ms ease-in",opacity:`${bomb_opacity}`,transform:"rotate(30deg)"}} ref={bomb_ref} onAnimationStart={()=>{bomb_ref.current.style.position = "relative",bomb_ref.current.style.left = `${player_left}vw`;bomb_ref.current.style.top = `${player_top}px`;}} onAnimationEnd={()=>{
                    setTimeout(()=>{setExplodeBomb(true);},650);
                  }}></img>
                  {explosion}
                </div>
          }
          {(bot_bullet_explosion>=1&&bot_firing==true)&&<div>
              {bot_bullet_explosion==1&&<img src="./Folder/explosion1.png" style={{width:"40px",height:"40px",position:"relative",left:`${player_left}vw`,top:`${player_top-40}px`,animation:"bot5_animation 180ms ease-in-out 0s 2 alternate forwards"}} onAnimationIteration={()=>{
                setBotBulletExplosion(0);setBotFiring(0);setBotBulletExplosion(0);bot_physics[0].current = 0;
                setPlayerHealth(player_health-30);
              }}></img>}
            </div>}
        </div>
      </>)
    }
    function useBomb(throwable,info_number){
      if (info_number==1){setShowInfo1(false);setThrowAble(throwable);setShowInfo2(false);setShowInfo3(false);}
      if (info_number==2){setShowInfo2(false);setThrowAble(throwable);setShowInfo1(false);setShowInfo3(false);}
      if (info_number==3){setShowInfo3(false);setThrowAble(throwable);setShowInfo2(false);setShowInfo1(false);}
    }
    function weaponsPopup(){
      return(
        <>
          <div>
            <img src="https://github.com/MujtabaMazhr/Images/blob/main/close_icon.png?raw=true" style={{width:"25px",height:"25px",zIndex:"301",position:"relative",left:"7px",top:"-200px"}} onClick={()=>{setShowWeapons(false);}}></img>
            <div style={{backgroundImage:"linear-gradient(90deg, rgba(30, 30, 30, 1) 0%, rgba(50, 50, 50, 1) 50%, rgba(30, 30, 30, 1) 100%)",width:"350px",height:"360px",borderRadius:"16px",position:"relative",top:"-250px",zIndex:"300"}}>
              <div style={{display:"flex",justifyContent:"center",gap:"35px",position:"relative",top:"30px"}}>
                <img src="./Folder/grenade_icon.png" style={{width:"42px",height:"42px",backgroundColor:show_bombs==true?"rgb(23, 98, 229)":"",borderRadius:"7px"}} onClick={()=>{setShowBombs(true);setShowGuns(false);}}></img>
                <img src="./Folder/pistol.png" style={{width:"42px",height:"42px",backgroundColor:show_guns==true?"rgb(23, 98, 229)":"",borderRadius:"7px"}} onClick={()=>{setShowGuns(true);setShowBombs(false);}}></img>
              </div>
              {show_bombs==true&&<div style={{position:"relative",top:"20px"}}>
                <div style={{display:"flex",justifyContent:"center",gap:"60px",position:"relative",top:"45px"}}>
                  <img src="./Folder/grenade_icon.png" style={{width:"42px",height:"42px"}} onClick={()=>{setBombType("Grenade");}}></img>
                  <img src="./Folder/big_bomb_icon.png" style={{width:"42px",height:"42px"}} onClick={()=>{setBombType("Big Bomb");}}></img>
                  <img src="./Folder/missile_icon.png" style={{width:"42px",height:"42px"}} onClick={()=>{setBombType("Missile");}}></img>
                </div>
                <div ref={line_ref} style={{width:"55px",height:"1px",backgroundColor:"white",opacity:".4",position:"relative",top:"60px",left:"147px",animation:"line1_animation 100ms ease-in-out 0s infinite alternate forwards",transition:"left 670ms ease-in"}} onAnimationIteration={()=>{
                  if (bomb_type=="Grenade"){line_ref.current.style.position = "relative",line_ref.current.style.left = "50px";}
                  if (bomb_type=="Big Bomb"){line_ref.current.style.position = "relative",line_ref.current.style.left = "147px";}
                  if (bomb_type=="Missile"){line_ref.current.style.position = "relative",line_ref.current.style.left = "244px";}
                }}></div>
                {bomb_type=="Grenade"&&<div style={{position:"relative",top:"110px",left:"76px",display:"flex",justifyContent:"center",gap:"10px"}}>
                  <div style={{position:"relative",left:"10px"}}>{grenade_counts[0]}</div>
                  <img src="./Folder/grenade_icon.png" style={{width:"35px",position:"relative",left:"10px"}} onClick={()=>{
                    if (total_coins>=30){
                    setTotalCoins(total_coins-30);setGrenadeCounts(previous=>{
                    let array = [...previous];
                    array[0] = array[0]+1;
                    return array;
                  })}}}></img>
                  <div style={{position:"relative",left:"50px"}}>{grenade_counts[1]}</div>
                  <img src="./Folder/void_incendiary.webp" style={{width:"35px",position:"relative",left:"50px"}} onClick={()=>{
                    setTotalCoins(total_coins-40);setGrenadeCounts(previous=>{
                    let array = [...previous];
                    array[1] = array[1]+1;
                    return array;
                  })}}></img>
                  <div style={{position:"relative",left:"70px"}}>{grenade_counts[2]}</div>
                  <img src="./Folder/echo_charge.png" style={{width:"35px",position:"relative",left:"75px"}} onClick={()=>{
                    setTotalCoins(total_coins-45);setGrenadeCounts(previous=>{
                    let array = [...previous];
                    array[2] = array[2]+1;
                    return array;
                  })}}></img>
                  <div style={{position:"relative",left:"-200px",top:"60px",display:"flex",gap:"53px"}}>
                    <div style={{position:"relative",left:"20px",display:"flex"}}>
                      30<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                    <div style={{position:"relative",left:"20px",display:"flex"}}>
                      40<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                    <div style={{position:"relative",left:"20px",display:"flex"}}>
                      45<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                  </div>
                </div>}
                {bomb_type=="Big Bomb"&&<div style={{position:"relative",top:"110px",display:"flex",justifyContent:"center",gap:"10px"}}>
                  <div style={{position:"relative",left:"20px"}}>{bomb_counts[0]}</div>
                  <img src="./Folder/ballistic_core.png" style={{width:"65px",position:"relative",left:"11px"}} onClick={()=>{
                    setTotalCoins(total_coins-45);setBombCounts(previous=>{
                    let array = [...previous];
                    array[0] = array[0]+1;
                    return array;
                  })}}></img>
                  <div style={{position:"relative",left:"20px"}}>{bomb_counts[1]}</div>
                  <img src="./Folder/stellar_collapse.png" style={{width:"35px",position:"relative",left:"21px"}} onClick={()=>{
                    setTotalCoins(total_coins-55);setBombCounts(previous=>{
                    let array = [...previous];
                    array[1] = array[1]+1;
                    return array;
                  })}}></img>
                  <div style={{position:"relative",left:"50px"}}>{bomb_counts[2]}</div>
                  <img src="./Folder/quantum_eraser.png" style={{width:"75px",position:"relative",left:"30px"}} onClick={()=>{
                    setTotalCoins(total_coins-55);setBombCounts(previous=>{
                    let array = [...previous];
                    array[2] = array[2]+1;
                    return array;
                  })}}></img>
                  <div style={{marginLeft:"-90px",display:"flex"}}>
                    <div style={{position:"relative",left:"-145px",top:"85px"}}>
                      45<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                    <div style={{position:"relative",left:"-95px",top:"85px"}}>
                      55<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                    <div style={{position:"relative",left:"-50px",top:"85px"}}>
                      55<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                  </div>
                </div>}
                {bomb_type=="Missile"&&<div style={{position:"relative",top:"110px",display:"flex",justifyContent:"center",gap:"40px"}}>
                  <div style={{position:"relative",left:"50px"}}>{missile_counts[0]}</div>
                  <img src="./Folder/apex_predator.png" style={{width:"46px",height:"75px",position:"relative",left:"10px"}} onClick={()=>{
                    setTotalCoins(total_coins-45);setMissileCounts(previous=>{
                      let array = [...previous];
                      array[0] = array[0]+1;
                      return array;
                    })
                  }}></img>
                  <div style={{position:"relative",left:"0px"}}>{missile_counts[1]}</div>
                  <img src="./Folder/nova_strike.png" style={{width:"46px",height:"75px",position:"relative",left:"-40px"}} onClick={()=>{
                    setTotalCoins(total_coins-55);setMissileCounts(previous=>{
                      let array = [...previous];
                      array[1] = array[1]+1;
                      return array;
                    })
                  }}></img>
                  <div style={{marginLeft:"-100px",display:"flex"}}>
                    <div style={{position:"relative",left:"-115px",top:"85px"}}>
                      45<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                    <div style={{position:"relative",left:"-75px",top:"85px"}}>
                      55<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>
                  </div>
                </div>}
              </div>}
              {show_guns==true&&
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"30px",position:"relative",top:"80px"}}>
                  <div>
                    <img src="./Folder/pistol.png" style={{width:"50px"}} onClick={()=>{setSelectedGun("pistol");setGunIndex(0);gunLoadTime();setShowWeapons(false);setDamagetoBot(1);}}></img>
                  </div>
                  <div>
                    <img src="./Folder/mp5.png" style={{width:"60px",height:"45px"}} onClick={()=>{
                      if (guns_unlocked[0]==0&&total_coins>=30){
                        setGunsUnlocked(previous=>{
                          let array = [...previous];
                          array[0] = 1;
                          return array;
                        });setTotalCoins(total_coins-30);setSelectedGun("mp5");setGunIndex(2);gunLoadTime();setShowWeapons(false);setDamagetoBot(2);
                      }
                      if (guns_unlocked[0]==1){setShowWeapons(false);setSelectedGun("mp5");setGunIndex(2);gunLoadTime();setDamagetoBot(2);}
                    }}></img>
                    {guns_unlocked[0]==0&&<div style={{position:"relative",top:"5px"}}>
                      30<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>}
                  </div>
                  <div>
                    <img src="./Folder/remington.png" style={{width:"60px",position:"relative",top:"10px"}} onClick={()=>{
                      if (guns_unlocked[1]==0&&total_coins>=40){
                        setGunsUnlocked(previous=>{
                          let array = [...previous];
                          array[1] = 1;
                          return array;
                        });setTotalCoins(total_coins-40);setSelectedGun("remington");setGunIndex(1);gunLoadTime();setShowWeapons(false);setDamagetoBot(3);
                      }
                      if (guns_unlocked[1]==1){setShowWeapons(false);setSelectedGun("remington");setGunIndex(1);gunLoadTime();setDamagetoBot(3);}
                    }}></img>
                    {guns_unlocked[1]==0&&<div style={{position:"relative",top:"17px"}}>
                      40<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>}
                  </div>
                  <div>
                    <img src="./Folder/m4a1.png" style={{width:"60px",height:"26px",position:"relative",top:"15px"}} onClick={()=>{
                      if (guns_unlocked[2]==0&&total_coins>=55){
                        setGunsUnlocked(previous=>{
                          let array = [...previous];
                          array[2] = 1;
                          return array;
                        });setSelectedGun("m4a1");setGunIndex(3);setTotalCoins(total_coins-55);setShowWeapons(false);gunLoadTime();setDamagetoBot(4);
                      }
                      if (guns_unlocked[2]==1){setShowWeapons(false);setSelectedGun("m4a1");setGunIndex(3);gunLoadTime();setDamagetoBot(4);}
                    }}></img>
                    {guns_unlocked[2]==0&&<div style={{position:"relative",top:"24px"}}>
                      55<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>}
                  </div>
                  <div>
                    <img src="./Folder/ak47.png" style={{width:"60px",height:"20px",position:"relative",top:"30px"}} onClick={()=>{
                      if (guns_unlocked[3]==0&&total_coins>=60){
                        setGunsUnlocked(previous=>{
                          let array = [...previous];
                          array[3] = 1;
                          return array;
                        });setTotalCoins(total_coins-60);setSelectedGun("ak47");setGunIndex(4);gunLoadTime();setShowWeapons(false);setDamagetoBot(4);
                      }
                      if (guns_unlocked[3]==1){setShowWeapons(false);setSelectedGun("ak47");setGunIndex(4);gunLoadTime();setDamagetoBot(4);}
                    }}></img>
                    {guns_unlocked[3]==0&&<div style={{position:"relative",top:"25px"}}>
                      60<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>}
                  </div>
                  <div>
                    <img src="./Folder/m134.png" style={{width:"86px",height:"26px",position:"relative",top:"25px"}} onClick={()=>{
                      if (guns_unlocked[4]==0&&total_coins>=75){
                        setGunsUnlocked(previous=>{
                          let array = [...previous];
                          array[4] = 1;
                          return array;
                        });setTotalCoins(total_coins-75);setSelectedGun("m134");setGunIndex(5);gunLoadTime();setShowWeapons(false);setDamagetoBot(5);
                      }
                      if (guns_unlocked[4]==1){setShowWeapons(false);setSelectedGun("m134");setGunIndex(5);gunLoadTime();setDamagetoBot(5);}
                    }}></img>
                    {guns_unlocked[4]==0&&<div style={{position:"relative",top:"25px"}}>
                      75<img src="./Folder/coin_icon.png" style={{width:"19px",height:"19px"}}></img>
                    </div>}
                  </div>
                </div>
              }
            </div>
          </div>
        </>
      )
    }
    if (typeof window!="undefined"&&save_variables==true){
      localStorage.setItem("selected_gun",selected_gun);localStorage.setItem("guns_unlocked",JSON.stringify(guns_unlocked));localStorage.setItem("total_coins",String(total_coins));localStorage.setItem("grenade_counts",JSON.stringify(grenade_counts));
      localStorage.setItem("bomb_counts",JSON.stringify(bomb_counts));localStorage.setItem("missile_counts",JSON.stringify(missile_counts));localStorage.setItem("gun_index",JSON.stringify(gun_index));localStorage.setItem("damage",JSON.stringify(damage_to_bot));
    }
    function bot(){
      //if (bot_physics[0].current==true){setBotBulletLeft(0),bot_physics[0].current = false;console.log("Condition Satisfied.");}
      return(
        <>
          <div ref={bot_ref} style={{zIndex:"399",position:"relative",opacity:"1",animation:"bot_animation 100ms ease-in-out 0s infinite alternate forwards",transition:player_moving==false?"top 2000ms ease-in-out, left 2000ms ease-in-out":""}} onAnimationIteration={()=>{
              setBotRectLeft(Number(bot_ref.current.getBoundingClientRect().left));setBotRectTop(bot_ref.current.getBoundingClientRect().top);setBotRectWidth(bot_ref.current.getBoundingClientRect().width);setBotRectHeight(bot_ref.current.getBoundingClientRect().height);
              ///*if (Number(player_bullet_ref.current.getBoundingClientRect().left)>=bot_rect_left){console.log("Bullet Touched the Bot's Body.");}*/
              if ((player_moving==false&&bot_firing==0)){
                bot_ref.current.style.left = `${player_left+30}vw`,bot_ref.current.style.top = `${top+5}vh`,setBotWalking(true);
                setBotLeft(bot_ref.current.style.left);setBotTop(bot_ref.current.style.top);
                if (bot_bullet_explosion<=0){setTimeout(()=>{setBotWalking(false);setBotFiring(1);},2000);}
                //setTimeout(()=>{setBotWalking(false);})
              }
              if (player_moving==true){
                bot_ref.current.style.left = `${left/2+player_left+36}vw`,bot_ref.current.style.top = `${top}vh`;
                //if (bot_bullet_explosion<=0){setTimeout(()=>{setBotFiring(1);},2000);}
              }
          }}>
            <div style={{width:`${bot_health}px`,height:"10px",position:"relative",top:"-13px",left:"10px",backgroundColor:"red",border:"1px solid rgba(76, 73, 73, 1)"}}></div>
            {(bot_sprite_count%2==0&&bot_walking==true)&&<img src="./Folder/robot1.png" style={{width:"80px",height:"80px",animation:"bot1_animation 300ms ease-in 0s infinite alternate forwards"}} onAnimationIteration={()=>{
              if (bot_walking==true){setBotSpriteCount(bot_sprite_count+1);}
            }}></img>}
            {(bot_sprite_count%2!=0&&bot_walking==true)&&<img src="./Folder/robot1_2.png" style={{width:"80px",height:"80px",animation:"bot2_animation 300ms ease-in-out 0s infinite alternate forwards"}} onAnimationIteration={()=>{
              if (bot_walking==true){setBotSpriteCount(bot_sprite_count+1);}
            }}></img>}
            {(bot_firing==1)&&<div>
                <img src="./Folder/robot1_3.png" style={{width:"80px",height:"80px"}}></img>
                <img src="./Folder/bullet1.png" style={{width:"14px",height:"14px",position:"relative",top:"-60px",left:`0px`,transform:"rotate(28deg)",filter:"hue-rotate(180deg)",transition:"top 100ms ease-in-out, left 100ms ease-in-out, opacity 100ms ease-in-out",opacity:"1",animation:"bot3_animation 100ms ease-in-out 0s infinite alternate forwards"}} ref={bot_bullet_refs[0]} onAnimationIteration={()=>{
                  bot_bullet_refs[0].current.style.left = `${player_left+9}vw`,bot_bullet_refs[0].current.style.top = `${player_top-175}px`,bot_bullet_refs[0].current.style.opacity = `0`;
                  setTimeout(()=>{
                    if (bot_physics[0].current<=8){setBotFiring(0);setBotWalking(true);}
                    else{
                      //console.log("Condition Satisfied, for Bot Physics:");
                      setBotFiring(2);setBotWalking(false);setPlayerHealth(player_health-20);
                    }
                    bot_physics[0].current = bot_physics[0].current+1;/*console.log("Bot Physics 0: ",bot_physics[0].current);*/},600);
                    if (player_moving==true){setBotWalking(true);setBotFiring(0);}
                }}></img>
              </div>}
            {(bot_firing==2)&&<div>
                <img src="./Folder/robot1_4.png" style={{width:"80px",height:"80px"}}></img>
                <img src="./Folder/bullet1.png"  ref={bot_bullet_refs[1]} style={{width:"14px",height:"14px",position:"relative",top:"-60px",left:`0px`,transform:"rotate(28deg)",filter:"hue-rotate(180deg)",animation:"bot4_animation 100ms ease-in-out 0s infinite alternate forwards",opacity:"1",transition:"top 100ms ease-in-out, left 100ms ease-in-out, opacity 100ms ease-in-out"}} onAnimationIteration={()=>{
                  bot_bullet_refs[1].current.style.left = `${player_left+9}vw`,bot_bullet_refs[1].current.style.top = `${player_top-175}px`,bot_bullet_refs[1].current.style.opacity = `0`;
                  setTimeout(()=>{setBotBulletExplosion(1);},220);
                  if (player_moving==true){setBotWalking(true);setBotFiring(0);}
                }}></img>
                {<img src="./Folder/bullet1.png" ref={bot_bullet_refs[2]} style={{width:"14px",height:"14px",position:"relative",top:"-60px",left:`0px`,transform:"rotate(28deg)",filter:"hue-rotate(180deg)",animation:"bot4_animation 100ms ease-in-out 0s infinite alternate forwards",opacity:"1",transition:"top 100ms ease-in-out, left 100ms ease-in-out, opacity 100ms ease-in-out"}} onAnimationIteration={()=>{
                  bot_bullet_refs[2].current.style.left = `${player_left+9}vw`,bot_bullet_refs[1].current.style.top = `${player_top-175}px`,bot_bullet_refs[2].current.style.opacity = "0";
                  if (player_moving==true){setBotWalking(true);setBotFiring(0);}
                }}></img>}
              </div>}
          </div>
        </>
      )
    }
    return(
        <>
          <div className="container" style={{marginTop:"100vh"}}>
            <div style={{marginTop:"-100vh",width:"100vw",height:"100vh",overflowY:"hidden",overflowX:"hidden"}}>
                <img src="./Folder/background.png" style={{width:"158vw",height:"158vh",position:"relative",left:`${left}vw`,top:`${top}vh`}} className="bg_image"></img>
                <div style={{position:"relative",top:"-130vh"}} className="Game_Functioning">
                  <img src="./Folder/pistol.png" style={{width:"60px",position:"relative",marginTop:"-100px",position:"relative",left:"12px",top:"-20vh",transform:"rotate(-30deg)"}} onClick={()=>{setShowWeapons(true);}}></img>
                  <div style={{display:"flex",marginTop:"-40px",position:"relative",top:"-13vh",left:"0px"}}>
                    <img src="./Folder/coin_icon.png" style={{width:"50px",height:"50px"}}></img>
                    <div style={{position:"relative",top:"13px"}}>{total_coins}</div>
                  </div>
                  <div style={{position:"relative",left:"80px",top:"500px",opacity:".4",position:"fixed",zIndex:"201"}}>
                    <img src="./Folder/up_icon.png" style={{width:"35px",filter:"invert(1)",position:"relative",left:"-5px"}} onClick={()=>{
                      if (top<=-20){setTop(top+2.5);}
                      else{
                        if (player_top>=-20){setPlayerTop(player_top-18);setFireY(fire_y-10);setBulletY(bullet_y-10);setBombTop(bomb_top-10);}
                      }
                    }} onMouseDown={()=>{
                      setPlayerMoving(true);setVariable(variable+1);setMouseIsUp(false);
                      if (variable>=3){setVariable(0);}
                    }} onMouseUp={()=>{time = setTimeout(()=>{setMouseIsUp(true);},2000)}}></img> 
                    <img src="./Folder/right_icon.png" style={{width:"35px",filter:"invert(1)",position:"relative",top:"65px",left:"30px"}} onClick={(event)=>{
                      if (left>=-50){setLeft(left-2.5);setPlayerMovingRight(true);setPlayerMovingLeft(false);setScaleX(1);setBulletAngle(20);setFireDistance(0);setBulletDistance(0);}
                      else{
                        if (player_left<=40){setPlayerLeft(player_left+2.7);setPlayerMovingRight(true);setPlayerMovingLeft(false);setScaleX(1);setBulletAngle(20);setFireDistance(0);setBulletDistance(0);setFirePosition(fire_position+2.7);setBulletX(bullet_x+2.7);setBombLeft(bomb_left+2.7);}
                      }
                    }} onMouseDown={()=>{
                      setPlayerMoving(true);setVariable(variable+1);setMouseIsUp(false);
                      if (variable>=3){setVariable(0);}
                    }} onMouseUp={()=>{setMouseIsUp(true);}}></img>
                    <img src="./Folder/down_icon.png" style={{width:"35px",filter:"invert(1)",position:"relative",top:"145px",left:"-75px"}} onClick={()=>{
                      if (top>=-50){setTop(top-2.5);}
                      else{
                        if (player_top<=450){setPlayerTop(player_top+18);setFireY(fire_y+16);setBulletY(bullet_y+16);setBombTop(bomb_top+16);}
                      }
                    }} onMouseDown={()=>{
                      setPlayerMoving(true);setVariable(variable+1);setMouseIsUp(false);
                      if (variable>=3){setVariable(0);}
                    }} onMouseUp={()=>{setMouseIsUp(true);}}></img>
                    <img src="./Folder/left_icon.png" style={{width:"35px",filter:"invert(1)",position:"relative",top:"65px",left:"-180px"}} onClick={()=>{
                      if (left<=-1){setLeft(left+2.5);setPlayerMovingLeft(true);setPlayerMovingRight(false);setScaleX(-1);setBulletAngle(-20);setFireDistance(fire_range);setBulletDistance(bullet_range);}
                      else{
                        if (player_left>=-28){setPlayerLeft(player_left-2.7);setPlayerMovingLeft(true);setPlayerMovingRight(false);setScaleX(-1);setBulletAngle(-20);setFireDistance(fire_range);setBulletDistance(bullet_range);;setFirePosition(fire_position-2.7);setBulletX(bullet_x-2.7);setBombLeft(bomb_left-2.7);setBombDistance(bullet_range);}
                      }
                    }} onMouseDown={()=>{
                      setPlayerMoving(true);setVariable(variable+1);setMouseIsUp(false);
                      if (variable>=3){setVariable(0);}
                    }} onMouseUp={()=>{setMouseIsUp(true);}}></img>
                  </div>
                  {(show_weapons==false&&player_health>0)&&player()}
                  <div>
                    <div style={{display:"flex",gap:"30px",justifyContent:"flex-end",position:"relative",top:"42vh",left:"-10px",zIndex:"200"}}>
                      {/*<img src="./Folder/bomb_icon.png" style={{width:"55px",height:"55px",opacity:"1",position:"relative",left:"180px",top:"8px",zIndex:"500"}} onClick={()=>{
                        //console.log("Ref: ",button_refs[0].current.style.width);
                        button_refs[0].current.style.animation = "button_animation1 500ms ease-in-out 0s 1 alternate forwards";button_refs[2].current.style.animation = "button_animation3 500ms ease-in-out 0s 1 alternate forwards";
                        if (throwable!=""){
                          if ((throwable.includes("grenade_icon.png")||throwable.includes("void_incendiary.webp")||throwable.includes("echo_charge.png"))&&grenade_counts[selected_bomb.grenade]>0){
                            setBombWidth(12);setBombHeight(12);setBombing(true);setBombOpacity(1);
                            setGrenadeCounts(previous=>{
                              let array = [...previous];
                              array[selected_bomb.grenade] = array[selected_bomb.grenade]-1;
                              console.log("Array 0: ",array[selected_bomb.grenade]);
                              return array;
                            });
                          }
                          if ((throwable.includes("ballistic_core.png")||throwable.includes("stellar_collapse.png")||throwable.includes("quantum_eraser.png"))&&bomb_counts[selected_bomb.bomb]>0){
                            setBombWidth(18);setBombHeight(19);setBombing(true);setBombOpacity(1);
                            setBombCounts(previous=>{
                              let array = [...previous];
                              array[selected_bomb.bomb] = array[selected_bomb.bomb]-1;
                              console.log("Array 1: ",array[selected_bomb.bomb]);
                              return array;
                            });
                          }
                          if ((throwable.includes("apex_predator.png")||throwable.includes("nova_strike.png"))&&missile_counts[selected_bomb.missile]>0){
                            setBombWidth(27);setBombHeight(35);setBombing(true);setBombOpacity(1);
                            setMissileCounts(previous=>{
                              let array = [...previous];
                              array[selected_bomb.missile] = array[selected_bomb.missile]-1;
                              console.log("Array 2: ",array[selected_bomb.missile]);
                              return array;
                            });
                          }
                        }
                      }} ref={button_refs[2]} onMouseUp={()=>{setTimeout(()=>{button_refs[2].current.style.animation = "";button_refs[0].current.style.animation = "";});}}></img>*/}
                      <img src="./Folder/fire_icon.png" style={{width:"50px",height:"55px",opacity:"1",position:"relative",left:"93px",top:"6px",zIndex:"500"}} onClick={()=>{setGiveDamage(true);button_refs[1].current.style.animation = "button_animation2 500ms ease-in-out 0s 1 alternate forwards";button_refs[3].current.style.animation = "button_animation4 500ms ease-in-out 0s 1 alternate forwards";setPlayerFiring(true);/*console.log("PLayer Firing: ",player_firing)*/}} ref={button_refs[3]} onMouseUp={()=>{setTimeout(()=>{button_refs[3].current.style.animation = "";button_refs[1].current.style.animation = "";})}}></img>
                      {/*<img src="./Folder/icon_bg.png" style={{width:"78px",height:"78px",opacity:".6",zIndex:"499"}} ref={button_refs[0]} onClick={()=>{console.log("Ref: ",button_refs[0].current.style)}}></img>*/}
                      <img src="./Folder/icon_bg.png" style={{width:"78px",height:"78px",opacity:".6",zIndex:"499"}} ref={button_refs[1]}></img>
                    </div>
                    <div style={{position:"relative",top:"-20vh",display:"flex",flexDirection:"column",gap:"25px"}}>
                      <div style={{display:"flex"}}>
                        {/*<img src="./Folder/grenade_icon.png" style={{width:"50px",height:"50px"}} onClick={()=>{
                          if (show_info1==false){setShowInfo1(true);}
                          if (show_info1==true){setShowInfo1(false);}
                        }}></img>*/}
                        {((grenade_counts[0]>0||grenade_counts[1]>0||grenade_counts[2]>0)&&show_info1==true)&&<div style={{width:"0px",height:"40px",backgroundColor:"rgba(23, 98, 229, 1)",borderRadius:"20px",position:"relative",left:"10px",display:"flex",gap:"5px",overflow:"hidden",animation:"weapon_info_animation1 700ms ease-in 0s 1 alternate forwards"}}>
                          <img style={{width:"30px",height:"30px",position:"relative",top:"3px"}} src="./Folder/grenade_icon.png" onClick={()=>{useBomb("./Folder/grenade_icon.png",1);setSelectedBomb({"grenade":0})}}></img>
                          <div style={{position:"relative",top:"10px",left:"5px"}}>{grenade_counts[0]}</div>
                          <img style={{width:"30px",height:"30px",position:"relative",top:"3px",left:"10px"}} src="./Folder/void_incendiary.webp" onClick={()=>{useBomb("./Folder/void_incendiary.webp",1);setSelectedBomb({"grenade":1})}}></img>
                          <div style={{position:"relative",top:"10px",left:"8px"}}>{grenade_counts[1]}</div>
                          <img style={{width:"30px",height:"30px",position:"relative",top:"3px",left:"10px"}} src="./Folder/echo_charge.png" onClick={()=>{useBomb("./Folder/echo_charge.png",1);setSelectedBomb({"grenade":2})}}></img>
                          <div style={{position:"relative",top:"10px",left:"10px"}}>{grenade_counts[2]}</div>
                        </div>}
                      </div>
                      <div style={{display:"flex"}}>
                        {/*<img src="./Folder/big_bomb_icon.png" style={{width:"50px",height:"50px"}} onClick={()=>{
                          if (show_info2==false){setShowInfo2(true);}
                          if (show_info2==true){setShowInfo2(false);}
                        }}></img>*/}
                        {((bomb_counts[0]>0||bomb_counts[1]>0||bomb_counts[2]>0)&&show_info2==true)&&<div style={{width:"0px",height:"40px",backgroundColor:"rgba(23, 98, 229, 1)",borderRadius:"20px",position:"relative",left:"10px",display:"flex",gap:"5px",overflow:"hidden",animation:"weapon_info_animation2 700ms ease-in 0s 1 alternate forwards"}}>
                          <img style={{width:"30px",height:"30px",position:"relative",top:"3px"}} src="./Folder/ballistic_core.png" onClick={()=>{useBomb("./Folder/ballistic_core.png",2);setSelectedBomb({"bomb":0})}}></img>
                          <div style={{position:"relative",top:"10px",left:"5px"}}>{bomb_counts[0]}</div>
                          <img style={{width:"24px",height:"30px",position:"relative",top:"3px",left:"10px"}} src="./Folder/stellar_collapse.png" onClick={()=>{useBomb("./Folder/stellar_collapse.png",2);setSelectedBomb({"bomb":1})}}></img>
                          <div style={{position:"relative",top:"10px",left:"8px"}}>{bomb_counts[1]}</div>
                          <img style={{width:"40px",height:"40px",position:"relative",top:"0px",left:"14px"}} src="./Folder/quantum_eraser.png" onClick={()=>{useBomb("./Folder/quantum_eraser.png",2);setSelectedBomb({"bomb":2})}}></img>
                          <div style={{position:"relative",top:"10px",left:"10px"}}>{bomb_counts[2]}</div>
                        </div>}
                      </div>
                      <div style={{display:"flex"}}>
                        {/*<img src="./Folder/missile_icon.png" style={{width:"50px",height:"50px"}} onClick={()=>{
                          if (show_info3==false){setShowInfo3(true);}
                          if (show_info3==true){setShowInfo3(false);}
                        }}></img>*/}
                        {((missile_counts[0]>0||missile_counts[1]>0||missile_counts[2]>0)&&show_info3==true)&&<div style={{width:"0px",height:"40px",backgroundColor:"rgba(23, 98, 229, 1)",borderRadius:"20px",position:"relative",left:"10px",display:"flex",gap:"5px",overflow:"hidden",animation:"weapon_info_animation3 700ms ease-in 0s 1 alternate forwards"}}>
                          <img style={{width:"30px",height:"30px",position:"relative",top:"3px"}} src="./Folder/apex_predator.png" onClick={()=>{useBomb("./Folder/apex_predator.png",3);setSelectedBomb({"missile":0})}}></img>
                          <div style={{position:"relative",top:"10px",left:"5px"}}>{missile_counts[0]}</div>
                          <img style={{width:"30px",height:"30px",position:"relative",top:"3px",left:"10px"}} src="./Folder/nova_strike.png" onClick={()=>{useBomb("./Folder/nova_strike.png",3);setSelectedBomb({"missile":1})}}></img>
                          <div style={{position:"relative",top:"10px",left:"8px"}}>{missile_counts[1]}</div>
                        </div>}
                      </div>
                      <div style={{display:"flex",justifyContent:"center"}}>
                        {show_weapons==true&&weaponsPopup()}
                      </div>
                      {show_weapons==false&&
                          <div style={{display:"flex",justifyContent:"center",position:"relative",left:"-50vw"}}>
                            <img src="./Folder/heart_icon.png" style={{width:"35px",height:"30px",position:"relative",left:"49.5vw",top:"-305px"}}></img>
                            {<div style={{width:`${player_health}px`,height:"18px",backgroundColor:"blue",position:"relative",left:"50vw",top:"-300px",borderRadius:"10px"}}></div>}
                          </div>
                      }
                      {(show_weapons==false&&player_health>0)&&bot()}
                      {player_health<=0&&<div style={{display:"flex",justifyContent:"center",position:"relative",top:"-300px"}}>
                            <div ref={game_over_ref=>{
                              setTimeout(()=>{window.location.reload();},2000);
                            }} style={{width:"400px",height:"300px",backgroundImage:"linear-gradient(90deg, rgba(30, 30, 30, 1) 0%, rgba(50, 50, 50, 1) 50%, rgba(30, 30, 30, 1) 100%)",borderRadius:"30px",position:"relative"}}>
                              <div ref={bot_physics[1]} style={{position:"relative",display:"flex",justifyContent:"center",top:"80px"}}>Game Over</div>
                            </div>
                        </div>}
                      {bot_health<=0&&<div style={{display:"flex",justifyContent:"center",position:"relative",top:"-300px"}}>
                            <div ref={game_won_ref=>{
                              setTimeout(()=>{window.location.reload();},2000);
                            }} style={{width:"400px",height:"300px",backgroundImage:"linear-gradient(90deg, rgba(30, 30, 30, 1) 0%, rgba(50, 50, 50, 1) 50%, rgba(30, 30, 30, 1) 100%)",borderRadius:"30px",position:"relative"}}>
                              <div style={{position:"relative",display:"flex",justifyContent:"center",top:"80px"}}>You Won</div>
                            </div>
                        </div>}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </>
    )
}