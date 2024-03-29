'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM products';
        db.query(sql, (err, response) => {
            let items = response;
            let newItems = [];
            try {
                items.forEach(element => {
                    element.availableSizes = JSON.parse(element.availableSizes);
                    element.sku = Number(element.sku);
                    element.isFreeShipping = element.isFreeShipping == 1 ? true : false;
                    newItems.push(element);
                });
            } catch (err){
                res.send(err)
            } finally{
                res.json({products: newItems});
            }
        });
        //res.sendFile(path.join(__dirname, 'data', 'products.json'));
        //res.sendFile('products.json', { root: 'data'});
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({message: response})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products (name, color, price) VALUES ("'+data.name+'","'+data.color+'",'+data.price+')';
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json({message: response})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({message: response})
        })
    }
}