import mongoose from "mongoose";

export async function connectDB(){
    try{
            await mongoose.connect(process.env.MONGO_URL!)
            const connection=mongoose.connection;
            connection.on("connected",()=>{
                console.log("Connected to db")
            })
            connection.on("error",(err)=>{
                console.log("Error while connecting to db ",err)
                process.exit()
            })
    } catch(err){
        console.log("Something went wrong while connecting to db",err)
    }

}