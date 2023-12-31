import { getDataFromToken } from "@/helpers/getDataFromToken";


import { NextRequest , NextResponse } from "next/server";

import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest) {
     try{
     const userId = await getDataFromToken(request);
     const user = await User.findOne({_id: userId}).select("-password");  // it not give the data of password if you want multiple then write with the comma seperated 
     return NextResponse.json({
        message:"Data Found",
        data: user
     });
     }
     catch(error:any){
        return NextResponse.json({error:error.message} , {status: 400});
     }
}
