import { request, response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAnthenticated from '../middlewares/ensureAnthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json({name, email});
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAnthenticated,
    upload.single('avatar'),
    async (request, response) => {
    return response.json({msg:'Upload ok.'});
});

export default usersRouter;
