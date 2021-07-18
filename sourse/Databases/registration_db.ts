function db_registration(pass: string, id: string) {
    let  mysql:any  =  require ( 'mysql' ) ; 
    console.log(mysql);

    const connection:any = mysql.createConnection({
        host: "localhost",
        user: "Vladislav55",
        database: "banda",
        password: "Vladislav55"
    });

    return new Promise((resolve, reject) => {
        const db:string = "USE banda";

        connection.query(db, function(err:any, results:any) {
            if(err) console.log(err);
            console.log(results);
        });

        const dbb_t: String = "CREATE TABLE IF NOT EXISTS online (id_user varchar(50) NOT NULL UNIQUE, online varchar(70) NOT NULL, lastTime int(100) NOT NULL);"
        connection.query(dbb_t, function(err:any, results:any) {
            if(err) console.log(err);
            console.log(results);
            let seconds:number = new Date().getTime() / 1000;

            let user: Object = [pass, "off", seconds];
            const sql:string = `INSERT INTO online(id_user, online, lastTime) VALUES(?, ?, ?)`;

            connection.query(sql, user, function(err: any, results:any) {
                if(err) {
                    console.log(err);
                    resolve (false);
                }
            });
        });

        const db_t: String = "CREATE TABLE IF NOT EXISTS users (id int(10) unsigned NOT NULL AUTO_INCREMENT, phone_email varchar(700) NOT NULL UNIQUE, password varchar(700) NOT NULL, token varchar(700) NOT NULL, type_id varchar(20) NOT NULL, PRIMARY KEY (id));"
        connection.query(db_t, function(err:any, results:any) {
            if(err) console.log(err);
            console.log(results);
        });

        let token:any = require('../Databases/newToken')
        let newToken:string = token.new_token()
        console.log(newToken + "         newToken");

        function typeId(pass:string):string {
            let res:RegExpMatchArray = pass.match(/\S/g);
            console.log(res);
            let num:number = res.indexOf("@")
            if(num>0)
                return "emal"
            if(num<0)
                return "mobile"
        }

        let type_id:string = typeId(pass)
        let users: Object = [pass, id, newToken, type_id];
        const sql:string = `INSERT INTO users(phone_email, password, token, type_id) VALUES(?, ?, ?, ?)`;

        connection.query(sql, users, function(err: any, results:any) {
            if(err) {
                console.log(err);
                resolve (false);
            }
            resolve(true)
        });
    });
}

module.exports = {
    db_registration:  db_registration
}