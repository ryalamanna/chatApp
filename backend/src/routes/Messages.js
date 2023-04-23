import { Router  } from "express";
import express from 'express';
import {db} from "../db_config.js";
import md5 from 'md5'
export const mesasgesRouter = Router();

mesasgesRouter.use(express.json());

mesasgesRouter.get('/:user_id/:partner_id' , (req , res)=>{
    const {user_id , partner_id} = req.params;
    const query = `SELECT m.message_id, m.content, m.sender_id, m.receiver_id, DATE_FORMAT(m.created_on, '%Y-%m-%d %H:%i:%s') as created_on  FROM chat_db.messages AS m WHERE (m.sender_id = ${user_id} AND m.receiver_id = ${partner_id}) OR (m.sender_id = ${partner_id} AND m.receiver_id = ${user_id}) ORDER BY m.created_on ASC;`;

    db.query(query, (err, result) => {
        if(err){
            res.send(err)
        }else{
            if(result.length<=0){
                res.send({
                    message: 'No messages'
                })
            }else{
                res.json(result)
            }
        }
    })
});


mesasgesRouter.post('/:user_id/:partner_id' , (req , res)=>{
    const {user_id , partner_id} = req.params;
    const {content} = req.body;
    const query = `INSERT INTO chat_db.messages (content, sender_id, receiver_id) VALUES ('${content}', ${user_id}, ${partner_id});`;

    db.query(query, (err, result) => {
        if(err){
            res.send(err)
        }else{
            if(result.affectedRows<=0){
                res.send({
                    message: 'Error'
                })
            }else{
                res.json(result)
            }
        }
    })
});


mesasgesRouter.get('/updateChat/:user_id/:partner_id/:last_displayed_timestamp' , (req , res)=>{
    const {user_id , partner_id, last_displayed_timestamp} = req.params;
    const query = `SELECT 
                        m.message_id, 
                        m.sender_id, 
                        m.receiver_id, 
                        m.content, 
                        DATE_FORMAT(m.created_on, '%Y-%m-%d %H:%i:%s') as created_on, 
                        u.username AS sender_username
                    FROM chat_db.messages AS m 
                    JOIN chat_db.users AS u ON m.sender_id = u.user_id 
                    WHERE ((m.sender_id = ${user_id} AND m.receiver_id = ${partner_id}) OR (m.sender_id = ${partner_id} AND m.receiver_id = ${user_id}))
                    AND m.created_on > '${last_displayed_timestamp}'
                    ORDER BY m.created_on ASC;
                    `;
    db.query(query, (err, result) => {
        if(err){
            res.send(err)
        }else{
            if(result.length<=0){
                res.send({
                    message: 'No messages'
                })
            }else{
                res.send(result)
            }
        }
    })
});
