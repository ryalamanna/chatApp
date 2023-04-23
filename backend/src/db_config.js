import mysql from 'mysql2';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root' ,
    password: 'Qmzpal123###',
    database: 'chat_db'
})

db.getConnection((err)=>{
    if(err){
        console.log('error connecting to database');
    }
    else{
        console.log('connected to database')
    }
})