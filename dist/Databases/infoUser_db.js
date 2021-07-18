function infoUser(token) {
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
        const sqll = `SELECT * FROM users WHERE token = ?`;
        console.log(sqll);
        connection.query(sqll, token, function (err, results) {
            if (err)
                console.log(err);
            console.log(results);
            if (results.length > 0) {
                let a = results[0];
                console.log(a.id);
                a = {
                    id: a.phone_email,
                    "type_id": a.type_id
                };
                console.log(a);
                resolve(a);
            }
            else {
                resolve(false);
            }
        });
    });
}
module.exports = {
    infoUser: infoUser
};
//# sourceMappingURL=infoUser_db.js.map