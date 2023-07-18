import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import planetsRouter from './routes/planets/planets.router.js';
import launchesRouter from './routes/launches/launches.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})

export default app;