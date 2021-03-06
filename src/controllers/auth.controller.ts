import { RequestHandler } from 'express';
import db from '../db/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import secret from '../secret';

export const signup: RequestHandler = async (req, res, next) => {
  const {
    username,
    email,
    password,
    roles,
  }: { username: string; email: string; password: string; roles: string[] } =
    req.body;

  const createdUser = await db.user.create({
    data: {
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    },
  });

  if (roles) {
    await db.users_Role.createMany({
      data: roles.map((role) => {
        return {
          user_id: createdUser.id,
          role_id: Number(role),
        };
      }),
    });
  }

  res.status(200).send({ msg: `user ${createdUser.username} created!` });
};

export const signIn: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await db.user.findUnique({
    where: { username },
    select: { Users_Role: true, username: true, password: true, email: true },
  });

  if (!user)
    return res.status(404).send({ msg: `user ${username} not found!` });

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid)
    return res
      .status(401)
      .send({ accessToken: null, msg: 'invalid password!' });

  const ONE_DAY_IN_MS = 8400;
  const token = jwt.sign({ id: user.username }, secret, {
    expiresIn: ONE_DAY_IN_MS,
  });

  //   const userRoles = await db.users.findUnique({
  //     where: { username },
  //     select: { Users_Roles: true },
  //   });

  const authorities = user.Users_Role.map((role) => `ROLE_${role.role_id}`);

  res.status(200).send({
    username: user.username,
    email: user.email,
    roles: authorities,
    accessToken: token,
  });
};

console.log();
