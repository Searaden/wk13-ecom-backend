const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
        model: Product,
        attributes: ['product_name', 'price', 'stock'],
        through: ProductTag,
        },
      ],
    });
    res.status(200).json(tags);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock'],
          through: ProductTag,
        },
      ],
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found'});
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(deletedTag);
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
