import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({ user, token });
    } catch (err) {
        return response.status(401).json({ message: 'user or password is incorrect.' })
    }
});

export default sessionRouter;
