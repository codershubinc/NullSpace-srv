import express from 'express';
import authRoutes from './src/routes/auth.routes';
import r2Routes from './src/routes/r2.routes';
import * as dotenv from 'dotenv';
import { requireAuth } from './src/middleware/auth.middleware';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
//allow CORS for development
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, World! from NullSpace Server');
});
app.use('/r2', (req, res, next) => {
    requireAuth(req, res, next);
}, r2Routes);

app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
