import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// Connect to MongoDB (Hosted on MongoDB Atlas)
const mongoDbUri = `mongodb+srv://RamanSB:${process.env.DB_PASSWORD}@user.8qys6.mongodb.net/User?retryWrites=true&w=majority`;
const testMongoDbUri = "mongodb://127.0.0.1:27017";
mongoose.connect(testMongoDbUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log(`Successfully connected to db.`);
});
mongoose.connection.on('error', () => {
    throw new Error("Error connecting to database.");
})

// Configure the express server application
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use('/api/user/', authRoute);
// app.use('/', (req, res) => {
//     res.send("Hello this is the default end point");
// });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening for requests at port ${process.env.SERVER_PORT}`)
});