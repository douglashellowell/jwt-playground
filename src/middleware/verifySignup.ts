import { RequestHandler } from 'express';
import db from '../db/connection';
import { Roles } from '../types';

export const checkDuplicateUser: RequestHandler = async (req, res, next) => {
  const { username, email } = req.body;

  // check if user already registered
  if (!username) return res.status(400).send({ msg: 'no user sent' });

  const userFromName = await db.users.findUnique({ where: { username } });

  if (userFromName) return res.status(400).send({ msg: 'user already exists' });

  // const userFromEmail = await db.users.findUnique({ where: {} });

  // if (userFromEmail) return res.status(400).send({ msg: 'email used!' });
  //

  next();
};

export const checkRoleExists: RequestHandler = (req, res, next) => {
  const { roles }: { roles: string[] } = req.body;

  for (let i = 0; i < roles.length; i++) {
    const role = +roles[i];
    if (![Roles.ADMIN, Roles.MOD, Roles.USER].includes(role)) {
      res.status(404).send({ msg: "role doesn't exist" });
      return;
    }
  }

  next();
};
