function logout(token, all) {
    let mysql = require('mysql');
    console.log(mysql);
    console.log(token);
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
        if (!all) {
            connection.query('UPDATE users SET token = ? WHERE token = ?', ['0', token]);
        }
        if (all)
            connection.query('UPDATE users SET token = 0');
        const sqll = `SELECT * FROM users WHERE token = ?`;
        console.log(sqll);
        connection.query(sqll, token, function (err, results) {
            if (err)
                resolve(false);
            console.log(results);
            resolve(true);
        });
    });
}
module.exports = {
    logout: logout
};
//# sourceMappingURL=logout_db.js.map