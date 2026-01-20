import { NextResponse } from "next/server";
import fs from "fs/promises";

let array = [];
export async function POST(request){
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    let file = await request.json();
    array.push(file);
    return NextResponse.json(file,{headers});
}
export async function GET(request){
    let picture = "",type = "";
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    const { searchParams } = new URL(request.url);
    let username = searchParams.get("username"),password = searchParams.get("password");
    console.log("Username Parameter: ",username);
    console.log("GET Request to Access: ",array);
    for (let index=0;index<=array.length-1;index++){
        console.log("File Value: ",array[index].username);
        if (array[index].username==username&&array[index].password==password){picture = array[index].profile_pic,type = array[index].type;}
    }
    return NextResponse.json({message: picture,type: type},{headers});
}
export async function OPTIONS(){
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}