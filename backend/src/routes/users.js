import { Router  } from "express";
import express from 'express';
import {db} from "../db_config.js";
import md5 from 'md5'
export const usersRouter = Router();

usersRouter.use(express.json());


usersRouter.use("/login", (req, res , next) => {
    let {username } = req.body;
    // username = username
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            if(result.length<=0){
                res.send({
                    message: 'User not found'
                });
            }
            else{
                next();
            }
        }
    })

})

usersRouter.post('/login', (req, res) => {
    let {username , password} = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    password = md5(password)
    db.query(query, [username, password], (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            if(result.length<=0){
                res.send({
                    message: 'Wrong password'
                });
            }else{
                res.send({
                    message: 'Login successfull',
                    userToken: result[0]
                })
            }
        }
    })
});


usersRouter.get('/:username', (req, res) => {
    const {username} = req.params;
    const query = 'SELECT * FROM users WHERE username != ?';
    db.query(query, [username], (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

