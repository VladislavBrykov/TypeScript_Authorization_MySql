function new_token():string {
    let text:string = "";
    let possible:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    for (let i = 0; i < 100; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(text);
    return text;
}
    
module.exports = {
    new_token: new_token
}