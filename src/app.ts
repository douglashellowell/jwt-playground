import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes';
import gamesRouter from './routes/games.routes';
const app = express();

app.use(cors());
app.use(bodyParser.json()); // parse json
app.use(bodyParser.urlencoded({ extended: true })); // parse x-www-form-urlencoded

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'welcome' });
  // res.json is a thing!
});

app.use('/auth', authRouter);

app.use('/games', gamesRouter);

// POST	/api/auth/signup	signup new account
// POST	/api/auth/signin	login an account
// GET	/api/test/all	    retrieve public content
// GET	/api/test/user  	access User’s content
// GET	/api/test/mod	    access Moderator’s content
// GET	/api/test/admin 	access Admin’s content

export default app;
