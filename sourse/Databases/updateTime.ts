function updateTtime(user_id:string, token:string) {
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

        let seconds:number = new Date().getTime() / 1000;
        connection.query('UPDATE online SET lastTime = ? WHERE id_user = ?', [seconds, user_id])     
        resolve(true);
    });
}

module.exports = {
    updateTtime: updateTtime
}