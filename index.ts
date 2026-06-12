import express from 'express';
import authRoutes from './src/routes/auth.routes';
import r2Routes from './src/routes/r2.routes';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
//allow CORS for development
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/r2', r2Routes);

app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

