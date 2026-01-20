"use client";
import { GoogleMap, LoadScript, Autocomplete, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import "./page.css";

const containerStyle = {
  width: "100%",
  height: "500px"
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 };

export default function MapComponent() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => {
          console.warn("Error fetching location →", err);
        }
      );
    }
  }, []);

  async function calculateRoute() {
    if (!originRef.current.value || !destRef.current.value) return;

    const directionService = new window.google.maps.DirectionsService();

    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destRef.current.value = "";
  }

  return (
    <LoadScript googleMapsApiKey={"AIzaSyA_e0EMpzkKwv9-TqOEYSv5kN4Xf2LrQ3w"} libraries={["places"]} className="container">
      <div style={{ padding: 10 }}>
        <div style={{display:"flex",gap:"23px",justifyContent:"center"}}>
          <Autocomplete>
            <input ref={originRef} className="input" placeholder="Enter Origin" style={{backgroundColor:"rgba(210, 230, 236, 1)",borderRadius:"35px",width:"120px",height:"40px",position:"relative",top:"100px",border:"none",zIndex:"10",color:"rgba(51, 49, 49, 1)"}}/>
          </Autocomplete>
          <Autocomplete>
            <input ref={destRef} className="input" placeholder="Enter Desti.." style={{backgroundColor:"rgba(210, 230, 236, 1)",borderRadius:"35px",width:"120px",height:"40px",position:"relative",top:"100px",border:"none",zIndex:"10",color:"rgba(51, 49, 49, 1)"}}/>
          </Autocomplete>
        </div>
        <div style={{display:"flex",justifyContent:"center",position:"relative",top:"10px",gap:"20px"}}>
          <div onClick={calculateRoute} style={{backgroundColor:"rgba(191, 210, 221, 1)",borderRadius:"35px",width:"75px",height:"27px",position:"relative",top:"100px",border:"none",zIndex:"10",color:"black",display:"flex",justifyContent:"center",cursor:"pointer"}} className="button">Find</div>
        </div>

        {distance && <p >Distance: {distance} | Duration: {duration}</p>}

        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition || defaultCenter} zoom={currentPosition ? 14 : 10} options={{mapTypeControl:false}} style={{position:"relative",top:"-100px"}}>
          {/* 🔵 Current location marker */}
          {currentPosition && <Marker position={currentPosition} clickable={false} />}

          {/* 🛣 Route Renderer */}
          {directionResponse && <DirectionsRenderer directions={directionResponse} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}