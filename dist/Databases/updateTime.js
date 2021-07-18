function updateTtime(user_id, token) {
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
        let seconds = new Date().getTime() / 1000;
        connection.query('UPDATE online SET lastTime = ? WHERE id_user = ?', [seconds, user_id]);
        resolve(true);
    });
}
module.exports = {
    updateTtime: updateTtime
};
//# sourceMappingURL=updateTime.js.map