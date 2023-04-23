import { Router  } from "express";
import express from 'express';
import {db} from "../db_config.js";
import md5 from 'md5'
export const convRouter = Router();


convRouter.use(express.json());

convRouter.get(
    '/:user_id', (req,res)=>{
        const {user_id} = req.params;
        const query = `SELECT DISTINCT subquery.conversation_partner_id,
                                CASE
                                    WHEN m.sender_id = ${user_id} THEN u_receiver.username
                                    ELSE u_sender.username
                                END AS conversation_partner_name,
                                m.content AS last_message,
                                m.created_on AS last_message_timestamp
                        FROM chat_db.messages AS m
                        JOIN (
                        SELECT 
                        CASE
                            WHEN sender_id = ${user_id} THEN receiver_id
                            ELSE sender_id
                        END AS conversation_partner_id,
                        MAX(created_on) AS last_message_timestamp
                        FROM chat_db.messages
                        WHERE sender_id = ${user_id} OR receiver_id = ${user_id}
                        GROUP BY 
                        CASE
                            WHEN sender_id = ${user_id} THEN receiver_id
                            ELSE sender_id
                        END
                        ) AS subquery
                        ON (
                        (m.sender_id = ${user_id} AND m.receiver_id = subquery.conversation_partner_id AND m.created_on = subquery.last_message_timestamp)
                        OR (m.sender_id = subquery.conversation_partner_id AND m.receiver_id = ${user_id} AND m.created_on = subquery.last_message_timestamp)
                        ) 
                        JOIN chat_db.users AS u_sender
                        ON m.sender_id = u_sender.user_id
                        JOIN chat_db.users AS u_receiver
                        ON m.receiver_id = u_receiver.user_id
                        ORDER BY last_message_timestamp DESC;
                        ` ;
        db.query(query, (err, result) => {
            if(err){
                res.send(err);
            }
            else{
                if(result.length<=0){
                    res.send({
                        message: 'No conversations'
                    })
                }else{
                    res.send(result);
                }
            }
        })
    }
)