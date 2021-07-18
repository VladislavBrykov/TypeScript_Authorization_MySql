function db_login(pass, id) {
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
        const sqll = `SELECT id FROM users WHERE phone_email = ?`;
        connection.query(sqll, id, function (err, results) {
            if (err)
                resolve(false);
            const sqll = `SELECT id FROM users WHERE phone_email = ?`;
            connection.query(sqll, id, function (err, results) {
                if (err)
                    resolve(false);
                if (results.length > 0) {
                    let a = results[0];
                    console.log(a.id);
                    a = {
                        id: a.id
                    };
                    let seconds = new Date().getTime() / 1000;
                    connection.query('UPDATE online SET online = ? WHERE id_user = ?', ["onn", id]);
                    connection.query('UPDATE online SET lastTime = ? WHERE id_user = ?', [seconds, id]);
                    console.log(a);
                    resolve(a);
                }
                else {
                    resolve(false);
                }
            });
        });
    });
}
module.exports = {
    db_login: db_login
};
//# sourceMappingURL=login_db.js.map