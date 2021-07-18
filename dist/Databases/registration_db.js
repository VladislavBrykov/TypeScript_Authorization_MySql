function db_registration(pass, id) {
    let mysql = require('mysql');
    console.log(mysql);
    const connection = mysql.createConnection({
        host: "localhost",
        user: "Vladislav55",
        database: "banda",
        password: "Vladislav55"
    });
    return new Promise((resolve, reject) => {
        const db = "USE banda";
        connection.query(db, function (err, results) {
            if (err)
                console.log(err);
            console.log(results);
        });
        const dbb_t = "CREATE TABLE IF NOT EXISTS online (id_user varchar(50) NOT NULL UNIQUE, online varchar(70) NOT NULL, lastTime int(100) NOT NULL);";
        connection.query(dbb_t, function (err, results) {
            if (err)
                console.log(err);
            console.log(results);
            let seconds = new Date().getTime() / 1000;
            let user = [pass, "off", seconds];
            const sql = `INSERT INTO online(id_user, online, lastTime) VALUES(?, ?, ?)`;
            connection.query(sql, user, function (err, results) {
                if (err) {
                    console.log(err);
                    resolve(false);
                }
            });
        });
        const db_t = "CREATE TABLE IF NOT EXISTS users (id int(10) unsigned NOT NULL AUTO_INCREMENT, phone_email varchar(700) NOT NULL UNIQUE, password varchar(700) NOT NULL, token varchar(700) NOT NULL, type_id varchar(20) NOT NULL, PRIMARY KEY (id));";
        connection.query(db_t, function (err, results) {
            if (err)
                console.log(err);
            console.log(results);
        });
        let token = require('../Databases/newToken');
        let newToken = token.new_token();
        console.log(newToken + "         newToken");
        function typeId(pass) {
            let res = pass.match(/\S/g);
            console.log(res);
            let num = res.indexOf("@");
            if (num > 0)
                return "emal";
            if (num < 0)
                return "mobile";
        }
        let type_id = typeId(pass);
        let users = [pass, id, newToken, type_id];
        const sql = `INSERT INTO users(phone_email, password, token, type_id) VALUES(?, ?, ?, ?)`;
        connection.query(sql, users, function (err, results) {
            if (err) {
                console.log(err);
                resolve(false);
            }
            resolve(true);
        });
    });
}
module.exports = {
    db_registration: db_registration
};
//# sourceMappingURL=registration_db.js.map