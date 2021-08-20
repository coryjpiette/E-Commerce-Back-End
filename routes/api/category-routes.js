

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', (req, res) => {
    // FIND all tags
  
    Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        ]
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {

              console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    // FIND tags by iD
 
    Tag.findOne({
        where: {
              id: req.params.id
        },
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                  attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        ]
    })
        .then(dbTagData => {
         if (!dbTagData) {
                res.status(404).json({ message: 'No tag found with this id' });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});