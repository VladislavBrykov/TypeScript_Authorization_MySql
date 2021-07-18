function db_login(pass: string, id: string) {
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

        const sqll:string = `SELECT id FROM users WHERE phone_email = ?`;

        connection.query(sqll, id, function(err:any, results:any) {
            if(err) 
                resolve (false);

            const sqll:string = `SELECT id FROM users WHERE phone_email = ?`;

            connection.query(sqll, id, function(err:any, results:any) {
                if(err) 
                    resolve (false);
                        
                if (results.length > 0) {
                    let a:any = results[0]
                    console.log(a.id);

                    a = {
                    id: a.id
                    }

                    let seconds:number = new Date().getTime() / 1000;

                    connection.query('UPDATE online SET online = ? WHERE id_user = ?', ["onn", id])     
                    connection.query('UPDATE online SET lastTime = ? WHERE id_user = ?', [seconds, id])     

                    console.log(a);
                    resolve(a);
                } else {
                    resolve(false);
                }
            });
        });
    });
}

module.exports = {
    db_login:  db_login
}