import secret from '../secret';
import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/connection';
import { Roles } from '../types';

// lol idk
declare global {
  namespace Express {
    export interface Request {
      userId: string | undefined;
    }
  }
}

export const verifyToken: RequestHandler = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ msg: 'no token!' });
  }

  if (Array.isArray(token)) token = token.join('');

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).send({ msg: '>:C' });
    }

    if (typeof decoded === 'string') {
      // this might be an error
      req.userId = decoded;
    } else {
      req.userId = decoded.id;
    }

    next();
  });
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  const { userId } = req;

  console.log('userId:', userId);

  if (!userId) return res.status(400).send({ msg: 'no userId set??' });

  // userId or username????
  const user = await db.user.findUnique({
    where: { username: userId },
    select: { username: true, Users_Role: true },
  });

  const isAdmin = user?.Users_Role.some((role) => role.role_id === Roles.ADMIN);

  if (isAdmin) {
    next();
  } else {
    res.status(403).send({ msg: '>:C' });
    return;
  }
};
