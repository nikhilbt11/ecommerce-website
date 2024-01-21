import mongoose from 'mongoose' 
import 'dotenv/config'

export async function dbConnect(){
    try{
      await  mongoose.connect(process.env.DATABASE_URL)
       console.log("Connection Setup With Database")
    }catch(err){
        console.log(err)
    }
    
}