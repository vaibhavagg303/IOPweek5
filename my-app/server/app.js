import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import stationsRouter from './routes/stations.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
  
app.use('/stations',stationsRouter);


const PORT = process.env.PORT || 8000;
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mia2p.mongodb.net/step2DB?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => app.listen(PORT,() => console.log(`Server started at ${PORT}`)))
.catch((error) => console.log(error));