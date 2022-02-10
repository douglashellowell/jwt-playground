import express from 'express';
import { games } from '../controllers/index';
import { authJWT } from '../middleware';

const gamesRouter = express.Router();

gamesRouter.use((_req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

gamesRouter.get('/all', games.allAccess);

gamesRouter.get('/user', [authJWT.verifyToken], games.usersOnly);

// gamesRouter.get('/mod', games.moderatorsOnly);

gamesRouter.get('/admin', [authJWT.isAdmin], games.adminOnly);

export default gamesRouter;
