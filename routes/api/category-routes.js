const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Use the findAll method on the Category model to fetch all categories
    const categoryData = await Category.findAll({
      include: [{ model: Product }], // Include associated Products
    });

    // Send the category data back to the user
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Find one category by its `id` value
// be sure to include its associated Products
// get a category by its ID
// some req.params.nonsense
// send that back to user
router.get('/:id', async (req, res) => {
  try {
const categoryData = await Category.findByPk(req.params.id, {
  include: [{ model: Product }],
});
res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
// get the body and get the contents and insert into sequelize
// category(DOT)create 
// whatever we created we can return it back off the res.json
router.post('/', async (req, res) => {
  try {
const categoryData = await Category.create({
  category_name: req.body.category_name,
});
res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// update a category by its `id` value
// taking in an id as a parameter and also receiving a req.body
// sequelize update
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (categoryData[0] === 0) {
      // Handle the case where no rows were updated
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category updated successfully' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});


// delete a category by its `id` value
// DESTROY
// destroying based off the req.params.id
// res.json to let the server know it's gone
// you have to send something back in order for it to close
router.delete('/:id', async (req, res) => {
try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!categoryData){
    res.status(404).json({ message: 'No Category by that ID found'});
    return;
  }

  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
