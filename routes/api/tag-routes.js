
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {

    // FIND all tags
  \
    Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        ]
    })