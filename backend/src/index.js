import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import {usersRouter} from './routes/users.js';
import {convRouter} from './routes/Conv.js';
import {mesasgesRouter} from './routes/Messages.js';
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', usersRouter);
app.use('/conv', convRouter);
app.use('/messages', mesasgesRouter);
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
