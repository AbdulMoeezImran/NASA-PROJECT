import http from 'http';
import app from './app.js'
import mongoose from 'mongoose';
import { loadPlanetsData } from "./models/planets.model.js";

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:!Q2w3e4r@nasacluster.cwoin1h.mongodb.net/NASA?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error('err');
});

const server = http.createServer(app);

const startServer = async () => {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
}

startServer();