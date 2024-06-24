import express from 'express';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { gownRouter} from './router/gownRouter.js'
import {logErrors} from './middleware/logErrors.js'
import { modelRouter } from './router/modelRouter.js'
import { userRouter } from './router/userRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/gowns', gownRouter);
app.use('/signup', userRouter);
app.use('/login', userRouter);
app.use('/models', modelRouter);
app.use("/img", express.static(__dirname + '/img'));
app.use(logErrors);

app.listen(8080, (err) => {
    if (err) console.error(`server error: ${err}`);
    console.log("Server listening on PORT", 8080);
});
