import mongoose from "mongoose";

export const connectDatabase = async () => {
  

  try {
    if(mongoose.connections && mongoose.connections[0].readyState)
        return;

    const {connection } = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName:"Ahmed"  ,

    }
  );
  console.log("Database Connected");

  }
  catch (error) {
    throw new Error("Database Connection Failed");
  }
}