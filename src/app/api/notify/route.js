import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};
let array = [],give_data = false;
export async function POST(request){
     let body = await request.json();
     console.log("REceived Message: ",body);
     const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mujtabasoftwares@gmail.com",
        pass: "vrjw naja woql iuhj", // App password
      },
    });
    //await transporter.sendMail({from: "mujtabasoftwares@gmail.com",to:"muhammadmujtabamazhar@gmail.com",subject:"Hello",text:"Hello World from Me."});
    array.push(body);console.log("Pushed: ",array);
    return NextResponse.json({message: body},{headers});
}
export async function GET(request){
    give_data = false;
    return NextResponse.json({message:array},{headers});
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