function infoUser(token) {
    let mysql:any  =  require ( 'mysql' ) ; 
    console.log(mysql);
    console.log(token);
    

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
        const sqll:any = `SELECT * FROM users WHERE token = ?`;

        console.log(sqll);

        connection.query(sqll, token, function(err, results) {
                if(err) console.log(err);
                console.log(results)

                if (results.length > 0) {
                    let a:any = results[0]
                    console.log(a.id);

                    a = {
                        id: a.phone_email,
                        "type_id": a.type_id
                    }

                    console.log(a);
                    resolve(a);
                } else {
                    resolve(false);
                }
            });
    });
}

module.exports = {
    infoUser: infoUser
}