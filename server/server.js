import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3222;
// Connect to MongoDB (Hosted on MongoDB Atlas)8
const mongoDbUri = `mongodb+srv://RamanSB:${process.env.DB_PASSWORD}@user.8qys6.mongodb.net/User?retryWrites=true&w=majority`;
// const testMongoDbUri = "mongodb://127.0.0.1:27017";
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`Successfully connected to db.`);
});
mongoose.connection.on('error', (err) => {
    throw new Error(`Error connecting to database @ ${mongoDbUri}\n${err}.`);
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
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });

}

app.listen(PORT || 3222, () => {
    console.log(`Server is listening for requests at port ${PORT}`);
});
