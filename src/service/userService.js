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
    //test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true
    })

    // let roles = await db.Group.findOne({
    //     include: [{ model: db.Role}],
    //     raw: true,
    //     nest: true
    // })

    let r = await db.Group.findAll({
        include: { model: db.Role, where: { id: 1 } },
        raw: true,
        nest: true
    })

    console.log(">>> check newUser: ", newUser);
    console.log(">>> check roles: ", r);






    // // get the promise implementation, we will use bluebird
    // // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // let user = [];

    // try {
    //     const [rows, fields] = await connection.execute('select * from user');
    //     return rows;
    //     console.log(">>> check rows: ", rows);
    // } catch (error) {
    //     console.log(">>> check error: ", error);
    // }
    let users = [];
    users = await db.User.findAll();
    return users;

}

const deleteUser = async (userId) => {

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // let user = [];

    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
    //     return rows;
    //     console.log(">>> check rows: ", rows);
    // } catch (error) {
    //     console.log(">>> check error: ", error);
    // }
    await db.User.destroy({
        where: { id: userId }
    })
}

const getUserById = async (id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // let user = [];

    // try {
    //     const [rows, fields] = await connection.execute('Select * FROM user WHERE id=?', [id]);
    //     console.log(">>> check rows: ", rows);
    //     return rows;
    // } catch (error) {
    //     console.log(">>> check error: ", error);
    // }
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true });
}

const updatUserInfor = async (email, username, id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // let user = [];

    // try {
    //     const [rows, fields] = await connection.execute('update user SET email=?, username=? WHERE id=?', [email, username, id]);
    //     console.log(">>> check rows: ", rows);
    //     return rows;
    // } catch (error) {
    //     console.log(">>> check error: ", error);
    // }
    await db.User.update({
        email: email, username: username
    }, {
        where: { id: id }
    });
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updatUserInfor
}