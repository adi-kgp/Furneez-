import mongoose from 'mongoose';
const connection = {};

async function connectDb() {
  if (connection.isConnected){
    console.log('using existing connection');
    return;
  } 
  //use new database connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });  // mongoosejs.com/docs/deprecations
  console.log("db connected");
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;