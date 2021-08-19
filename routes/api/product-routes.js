  


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
    

    .then(dbProductData => {
           if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
          res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {

    Product.create(req.body)
        .then((product) => {
            // Create pairings if there's a product tag

            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                  return ProductTag.bulkCreate(productTagIdArr);
            }
            // Response if no product tag
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});