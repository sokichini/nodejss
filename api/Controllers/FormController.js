'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM person';
        db.query(sql, (err, response) => {
            if (err) throw err;
            res.json(response);
        });
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM person where id = ?';
        db.query(sql,[req.params.id], (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    },
    search: (req, res) => {
        let sql = "SELECT * FROM person where id LIKE '"+req.body.keyword+"' OR first_name LIKE N'%"+req.body.keyword+"%' OR last_name LIKE N'%"+req.body.keyword+"%'";
        db.query(sql, (err, response) => {
            if (err) throw err;
            res.json(response);
        })
    },
    create: (req, res) => {
        let sql = 'INSERT INTO person VALUES (null, "'+req.body.first_name+'", "'+req.body.last_name+'")'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json({message: "success"})
        })
    },
    update: (req, res) => {
        let data = req.body;
        let id = req.params.id;
        let sql = 'UPDATE person SET ? WHERE id = ?'
        db.query(sql,[data, id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM person WHERE id = ?'
        db.query(sql,[req.params.id], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    }
}