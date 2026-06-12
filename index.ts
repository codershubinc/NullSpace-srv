import express from 'express';
import authRoutes from './src/routes/auth.routes';
import r2Routes from './src/routes/r2.routes';
import dbRoutes from './src/routes/db.routes';
import * as dotenv from 'dotenv'; 
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
//allow CORS for development
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, World! from NullSpace Server');
});
app.use('/r2', r2Routes);
app.use('/db', dbRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
