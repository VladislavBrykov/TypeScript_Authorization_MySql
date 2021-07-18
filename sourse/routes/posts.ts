/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/post';

const router = express.Router();

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/infouser', controller.infoUser);
router.get('/logout', controller.logout);
router.get('/latency', controller.latency);

export = router;