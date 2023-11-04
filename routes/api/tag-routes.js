const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // Use the findAll method on the Tag model to fetch all tag data
    // Include the Product model
    const tagData = await Tag.findAll({
      include: [
        { model: Product },
      ],
    });

    // Send the product data back to the user
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
// look at product routesjs
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (tagData[0] === 0) {
      // Handle the case where no rows were updated
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json({ message: 'Tag updated successfully' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag by that ID found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
