const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const Product = require("../models/productModel");

/**
 * EP to get all products
 */
router.get("/", function(req, res, next) {
    Product.find().exec()
        .then((docs) => {
            console.log(docs);
            res.status(200).send({
                products: docs
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error: error
            })
        })
})


/**
 * EP to get specific product
 */
router.get("/:id", function (req, res, next) {
    const id = req.params.id;
    Product
        .findById({_id: id})
        .exec()
        .then((docs) => {
            console.log(docs);
            if(docs) {
                res.status(200).send({
                    docs
                })
            } else {
                res.status(200).send({
                    response: "product does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error: "invalid product id"
            })
        })
})


/**
 * EP to get add product
 */
router.post("/", function (req, res, next) {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), 
        name: req.body.name, 
        price: req.body.price
    })
    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "product added to the database",
                product: {
                    product
                }
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error: error
            })
        })
})


/**
 * EP to delete specific product
 */
router.delete("/:id", function (req, res, next) {
    const id = req.params.id
    Product.remove({ _id: id }).exec()
        .then((response) => {
            console.log(response)
            res.status(200).send({
                response: response
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send({
                error: error
            })
        })
})


/**
 * EP to update specific product
 */
router.patch("/:id", function (req, res, next) {
    const id = req.params.id;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({ _id: id}, { $set: updateOps}).exec()
        .then((response) => {
            console.log(response);
            res.status(200).send({
                response
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error
            })
        })
})

module.exports = router;