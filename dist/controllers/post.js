"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const latency_monitor_1 = __importDefault(require("latency-monitor"));
// registration
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.body.id;
    let pass = req.body.pass;
    new Promise((resolve, reject) => {
        const result = require('../Databases/registration_db');
        result.db_registration(id, pass)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        return res.status(200).json({
            "status": "registration successful"
        });
    }).catch(() => {
        return res.status(200).json({
            "status": "registration error^ user exists"
        });
    });
});
//login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.body.id;
    let pass = req.body.pass;
    new Promise((resolve, reject) => {
        const result = require('../Databases/login_db');
        result.db_login(pass, id)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        let token = require('../Databases/newToken');
        let newToken = token.new_token();
        let updateToken = require('../Databases/updateToken');
        updateToken.updateToken(id, newToken);
        function func() {
            return __awaiter(this, void 0, void 0, function* () {
                let all;
                const status_online = require('../Databases/newLogout_db');
                let a = yield status_online.new_logout(id, newToken, all);
                if (a) {
                    const result = require('../Databases/logout_db');
                    result.logout(newToken, all);
                }
            });
        }
        setInterval(func, 600000); //время жизни токена 10 min, после чего узера вылогинивает
        res.status(200).json({
            "token": newToken
        });
    }).catch(() => {
        res.status(200).json({
            "status": "login error"
        });
    });
});
//infouser
const infoUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    let id = req.headers.id;
    new Promise((resolve, reject) => {
        const result = require('../Databases/infoUser_db');
        result.infoUser(token)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        let updateTime = require('../Databases/updateTime');
        updateTime.updateTtime(id, token);
        res.status(200).json({
            status: true, rp
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    });
});
//logout
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    let all = req.headers.test;
    console.log(token);
    console.log(all + "  allll");
    new Promise((resolve, reject) => {
        const result = require('../Databases/logout_db');
        result.logout(token, all)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        res.status(200).json({
            status: true
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    });
});
//latency
const latency = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    let id = req.headers.id;
    let all = req.headers.test;
    console.log(token);
    console.log(all + "  allll");
    new Promise((resolve, reject) => {
        let updateTime = require('../Databases/updateTime');
        updateTime.updateTtime(id, token)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        const monitor = new latency_monitor_1.default();
        let time = monitor.latencyCheckIntervalMs;
        return res.status(200).json({
            "latency": time
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    });
});
exports.default = { registration, login, infoUser, logout, latency };
//# sourceMappingURL=post.js.map