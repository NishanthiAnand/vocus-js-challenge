import express from 'express';
import path from 'path';
import { apiRouter } from './routes/api/apiRouter';
import cors  from 'cors';
import bodyParser from 'body-parser';
import jwt from './_helpers/jwt';
import errorHandler from './_helpers/error-handler';
//import RootPath from 'app-root-path';



const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

app.use('/api', apiRouter);

app.get('/customers', (_req, res) =>
  res.sendFile(path.join(`${__dirname}/public/customers.html`)),
);

//error handler
app.use(errorHandler);

app.listen(port);

console.log(`✨ Express started at http://localhost:${port}`);
