import express from 'express';
import cors from 'cors'
import { gownRouter} from './router/gownRouter.js'
import {logErrors} from './middleware/logErrors.js'
import { modelRouter } from './router/modelRouter.js'
import { imageRouter } from './router/imageRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/gowns', gownRouter);
app.use('/models', modelRouter);
// app.use('/images', imageRouter);
app.use('/images', express.static('dress2' + './img'));
app.use(logErrors);

app.listen(8080, (err) => {
    if (err) console.error(`server error: ${err}`);
    console.log("Server listening on PORT", 8080);
});
