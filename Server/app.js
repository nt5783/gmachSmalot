import express from 'express';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { gownRouter } from './router/gownRouter.js'
import { logErrors } from './middleware/logErrors.js'
import { modelRouter } from './router/modelRouter.js'
import { loginRouter } from './router/loginRouter.js';
import { signupRouter } from './router/signupRouter.js';
import { colorRouter } from './router/colorRouter.js';
import { seasonRouter } from './router/seasonRouter.js';
import { sizeRouter } from './router/sizeRouter.js';
import { lengthRouter } from './router/lengthRouter.js';
import { orderRouter } from './router/orderRouter.js';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/gowns', gownRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/models', modelRouter);
app.use('/colors', colorRouter)
app.use('/seasons', seasonRouter)
app.use('/sizes', sizeRouter)
app.use('/lengths', lengthRouter)
app.use('/order',orderRouter)
app.use("/img", express.static(__dirname + '/img'));
app.use(logErrors);


// app.use(bodyParser.json());

// הגדרת multer להעלאת קבצים
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img'); // שמירת הקבצים בתיקיית img
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


const upload = multer({ storage });

// טיפול בבקשת העלאה
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

app.listen(8080, (err) => {
    if (err) console.error(`server error: ${err}`);
    console.log("Server listening on PORT", 8080);
});