import express from 'express';
import cors from 'cors'
import { loginRouter } from './router/loginRouter.js'

import {logErrors} from './middleware/logErrors.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use(logErrors);


app.listen(3000, (err) => {
    if (err) console.error(`server error: ${err}`);
    console.log("Server listening on PORT", 3000);
});
