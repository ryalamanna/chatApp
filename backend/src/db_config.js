import mysql from 'mysql2';
import {config} from 'dotenv'
config();

export const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER ,
    password: process.env.PASSWORD,
    database: 'bike_rental_db'
})

db.getConnection((err)=>{
    if(err){
        console.log('error connecting to database');
    }
    else{
        console.log('connected to database')
    }
})