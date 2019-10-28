'use strict'

const util = require('util');
const mysql = require('mysql');
const db = require('./../db');
var crypto = require('crypto-js');
const secret = 'xxxxxx';

module.exports = {
    post: (req, res) => {
        let us = req.body.user;
        let pw = req.body.pass;
        // Mã hóa
        //var string = crypto.AES.encrypt(pw, secret).toString();
        
        // Xem chuỗi đã mã hóa
        //console.log(string);
        
        // Lấy danh sách byte đã mã hóa
        //var bytes = crypto.AES.decrypt(string, 'ma bi mat');
        //var string_decode = bytes.toString(crypto.enc.Utf8);
        let sql = "SELECT * FROM accounts WHERE username = '"+us+"'";
        db.query(sql, (err, response)=>{
            if (response.length == 0){
                res.json({result: 'failed'});
            }else{
                let string = response[0].password;
                let bytes = crypto.AES.decrypt(string, secret);
                bytes.toString(crypto.enc.Utf8) === pw ? res.json({
                    result: 'success', 
                    data: {
                        id: response[0].id,
                        username: response[0].username,
                        email: response[0].email
                    }
                }) : res.json({result: 'failed'});
            }
        })
    },
    put: (req, res)=>{
        let us = req.body.username;
        let pw = crypto.AES.encrypt(req.body.password, secret).toString();
        let email = req.body.email;
        let sql = "INSERT INTO accounts VALUES (null, '"+us+"', '"+pw+"', '"+email+"')";
        db.query(sql, (err, response)=>{
            res.json({ result: 'success'});
        }, (err)=>{
            res.json({ result: 'failed', message: response });
        });
    },
    checkUserExist: (req, res)=>{
        let sql = "SELECT username FROM accounts WHERE username = '"+req.body.username+"'";
        db.query(sql, (err, response)=>{
            if (response.length != 0){
                res.json({ result: true });
            }else{
                res.json({ result: false });
            }
        })
    },
    checkEmailExist: (req, res)=>{
        let sql = "SELECT email FROM accounts WHERE email = '"+req.body.email+"'";
        db.query(sql, (err, response)=>{
            if (response.length != 0){
                res.json({ result: true });
            }else{
                res.json({ result: false });
            }
        })
    }
}