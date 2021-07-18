"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/posts.ts */
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../controllers/post"));
const router = express_1.default.Router();
router.post('/registration', post_1.default.registration);
router.post('/login', post_1.default.login);
router.get('/infouser', post_1.default.infoUser);
router.get('/logout', post_1.default.logout);
router.get('/latency', post_1.default.latency);
module.exports = router;
//# sourceMappingURL=posts.js.map