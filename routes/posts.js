import express from 'express';

import { getAll, get, create, update, like, del } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', get);
router.patch('/:id', update);
router.delete('/:id', del);
router.patch('/:id/likePost', like);

export default router;