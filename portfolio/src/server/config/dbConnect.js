import mongoose from "mongoose";


const MONGODB_URI = Process.env.MONGODB_URI;


if (!MONGODB_URI) {
    throw new Error("please provide valid url");
    
}


let cached = global.mongoose;

if (!cached) {
    global.mongoose = {conn:null,promise:null};
}

async function dbConnect() {
    if (cached.conn){
        return cached.conn;
    }


    if(!cached.promise){    
     const opts ={
        bufferCommands:true,
        dbName:"Protfolio"
     }

     cached.promise= mongoose.connect(MONGODB_URI,opts)


    }

    try {
        cached.conn = await cached.promise;
        console.log("db connected successfully");
        return cached.conn;
    } catch (error) {
        console.error("error while connecting to db");
        throw error;
    }
}

export default dbConnect;