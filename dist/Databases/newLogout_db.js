function new_logout(id, token, all) {
    let mysql = require('mysql');
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
        const res = `SELECT lastTime FROM online WHERE id_user = ?`;
        connection.query(res, id, function (err, results) {
            let t = results[0];
            console.log(t.lastTime);
            let seconds = new Date().getTime() / 1000;
            if ((seconds - t.lastTime) < 600) {
                let time = seconds - t.lastTime;
                console.log(time);
                resolve(time);
            }
        });
    });
}
module.exports = {
    new_logout: new_logout
};
//# sourceMappingURL=newLogout_db.js.map