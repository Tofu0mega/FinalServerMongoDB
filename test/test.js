import express from 'express'
import mongoose from 'mongoose'
const app = express();

const uri =
"mongodb+srv://pokhrelyural:lkG1RolwssIzY1Tq@kuventsjs.dstsau0.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
      await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
  } catch (err) {
      console.error(err);
      process.exit(1);
  }
};

connectDB();

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
