/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { log } from 'console';
import LatencyMonitor from 'latency-monitor';


// registration
const registration = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let pass: string = req.body.pass;

	new Promise((resolve, reject) => {   
        const result:any = require('../Databases/registration_db')
        result.db_registration(id, pass)
    
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })
    }).then(rp => {
        return res.status(200).json({
            "status": "registration successful"
        });
	}).catch(() => {
        return res.status(200).json({
            "status": "registration error^ user exists"
        });
	})
};

//login
const login = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let pass: string = req.body.pass;

	new Promise((resolve, reject) => {   
        const result:any = require('../Databases/login_db')
        result.db_login(pass, id)
        
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })
    }).then(rp => {
        let token:any = require('../Databases/newToken')
        let newToken:string = token.new_token()
        let updateToken:any = require('../Databases/updateToken')
        updateToken.updateToken(id, newToken)

        async function func() {
            let all:string;
			const status_online:any = require('../Databases/newLogout_db');
			let a:number = await status_online.new_logout(id, newToken, all)
            if(a) {
                const result:any = require('../Databases/logout_db')
                result.logout(newToken, all)
            }
		}
		setInterval(func, 600000) //время жизни токена 10 min, после чего узера вылогинивает

        res.status(200).json({
            "token": newToken
        });
	}).catch(() => {
        res.status(200).json({
            "status": "login error"
        });
	})
};


//infouser
const infoUser = async (req: Request, res: Response, next: NextFunction) => {
    let token:string = req.headers.authorization;
    let id :string | string[] = req.headers.id;

	new Promise((resolve, reject) => {   
        const result:any = require('../Databases/infoUser_db')
        result.infoUser(token)
        
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })
    }).then(rp => {
    
        let updateTime:any = require('../Databases/updateTime')
        updateTime.updateTtime(id, token)
        res.status(200).json({
            status: true, rp
        });
	}).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
	})
};


//logout
const logout = async (req: Request, res: Response, next: NextFunction) => {
    let token:string = req.headers.authorization
    let all: string | string[] = req.headers.test
    console.log(token);
    console.log(all + "  allll");

    new Promise((resolve, reject) => {   
        const result:any = require('../Databases/logout_db')
        result.logout(token, all)
        
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })
    }).then(rp => {
        res.status(200).json({
        status: true
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    })
};

//latency
const latency = async (req: Request, res: Response, next: NextFunction) => {
    let token:string = req.headers.authorization
    let id: string | string[] = req.headers.id
    let all: string | string[] = req.headers.test
    console.log(token);
    console.log(all + "  allll");

    new Promise((resolve, reject) => {   
        let updateTime:any = require('../Databases/updateTime')
        updateTime.updateTtime(id, token)
        
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })

    }).then(rp => {
        const monitor:any = new LatencyMonitor();
        let time:number = monitor.latencyCheckIntervalMs

        return res.status(200).json({
            "latency": time
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    })
};

export default { registration, login, infoUser, logout, latency };