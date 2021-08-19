  
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// GET products
router.get('/', (req, res) => {
    
    // FIND products
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
         attributes: ['id', 'category_name']
            },
            {
             model: Tag,
                attributes: ['id', 'tag_name']
            }
        ]
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET product
router.get('/:id', (req, res) => {
   
    // FIND product by ID 
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
            {
                model: Category,
                attributes: ['id', 'category_name']
            },
            {
                model: Tag,
                attributes: ['id', 'tag_name']
            }
        ]
    })
        .the