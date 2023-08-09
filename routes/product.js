const router = require('express').Router();
const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

//CREATE
router.post('/', verifyTokenAndAuthorization, async(req,res)=>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch(err){
        res.status(500).json(err)
    }
})


// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
 
    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
});


// DELETE
router.delete('/:id', verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Product.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Product Has been deleted");
    } catch(err){
        res.status(500).json(err)
    }
})

//GET PRODUCT
router.get('/find/:id', async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        // const data = product._doc;
        res.status(200).json(product);
    } catch(err){
        res.status(500).json(err)
    }
})

// GET ALL PRODUCTS
router.get('/products', async(req,res)=>{  //remove this
// router.get('/products', verifyTokenAndAdmin, async(req,res)=>{  // keep this

    const qNew = req.query.new;
    const qCategory = req. query.category;
    try{
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        } else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            console.log("productsfetching start")
            products = await Product.find();
            console.log("productsfetching end")
        }

        res.status(200).json(products);
    } catch(err){
        res.status(500).json(err)
    }
})

// GET USER STATS


module.exports = router

