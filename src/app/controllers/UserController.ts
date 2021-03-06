import Queue from '../lib/Queue';
import { Request, Response } from 'express';

export default { // As userController
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password
    };

    await Queue.add('RegistrationMail', { user });

    await Queue.add('UserReport', { user });

    return res.json(user);
  }
};