import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
// Get the client
import mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password);
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
        }
    );
}


const getUserList = () => {
    let users = [];
    connection.query(
        'Select * from users ',
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }
            console.log("check results: ", results); // results contains rows returned by server
        }
    );
}

module.exports = {
    createNewUser, getUserList
}