import express from 'express';
import { auth } from '../controllers';
import { verifySignup } from '../middleware';

const authRouter = express.Router();

authRouter.use((_req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );

  next();
});

authRouter.post(
  '/signup',
  [verifySignup.checkDuplicateUser, verifySignup.checkRoleExists],
  auth.signup
);

authRouter.post('/signin', auth.signIn);

export default authRouter;
