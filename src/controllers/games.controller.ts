import { RequestHandler } from 'express';

export const adminOnly: RequestHandler = (req, res) => {
  res.json({ msg: 'admin only!!' });
};

export const moderatorsOnly: RequestHandler = (req, res) => {
  res.json({ msg: 'mods!!' });
};

export const usersOnly: RequestHandler = (req, res) => {
  res.json({ msg: 'users!!' });
};

export const allAccess: RequestHandler = (req, res) => {
  res.json({ msg: 'public!!' });
};
