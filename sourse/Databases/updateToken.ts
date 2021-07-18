function updateToken(user_id, token) {
    let  mysql:any  =  require ( 'mysql' ) ; 

    const connection:any = mysql.createConnection({
        host: "localhost",
        user: "Vladislav55",
        database: "banda",
        password: "Vladislav55"
    });

    return new Promise((resolve, reject) => {
        const db:string = "USE banda";

        connection.query(db, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
        connection.query('UPDATE users SET token = ? WHERE phone_email = ?', [token, user_id])     
        resolve(true);
    });
}

module.exports = {
    updateToken: updateToken
}