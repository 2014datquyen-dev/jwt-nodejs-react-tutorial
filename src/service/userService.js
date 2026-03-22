import bcrypt from "bcryptjs";
// Get the client
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {

    let hashPass = hashPassword(password);
    try {
        db.User.create({
            username: username,
            email: email,
            password: hashPass
        });
    } catch (error) {
        console.log(">>> check error: ", error);
    }

}


const getUserList = async () => {
    // get the promise implementation, we will use bluebird
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let user = [];

    try {
        const [rows, fields] = await connection.execute('select * from user');
        return rows;
        console.log(">>> check rows: ", rows);
    } catch (error) {
        console.log(">>> check error: ", error);
    }
}

const deleteUser = async (id) => {

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let user = [];

    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows;
        console.log(">>> check rows: ", rows);
    } catch (error) {
        console.log(">>> check error: ", error);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let user = [];

    try {
        const [rows, fields] = await connection.execute('Select * FROM user WHERE id=?', [id]);
        console.log(">>> check rows: ", rows);
        return rows;
    } catch (error) {
        console.log(">>> check error: ", error);
    }
}

const updatUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let user = [];

    try {
        const [rows, fields] = await connection.execute('update user SET email=?, username=? WHERE id=?', [email, username, id]);
        console.log(">>> check rows: ", rows);
        return rows;
    } catch (error) {
        console.log(">>> check error: ", error);
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updatUserInfor
}