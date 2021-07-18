function updateToken(user_id, token) {
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
        connection.query('UPDATE users SET token = ? WHERE phone_email = ?', [token, user_id]);
        resolve(true);
    });
}
module.exports = {
    updateToken: updateToken
};
//# sourceMappingURL=updateToken.js.map