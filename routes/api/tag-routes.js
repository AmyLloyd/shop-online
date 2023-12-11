const router = require('express').Router();
const { Product, ProductTag, Tag } = require('../../models');

// The `/api/tags` endpoint
// get all tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Category and Tag data
  try {
    const tagData= await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'products' }]
    })
    res.status(200).json(tagData)
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include:[{model: Product, through:ProductTag}]
    })
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }});

router.post('/', async (req, res) => {
  console.log(req.body, "request body");
  // create a new tag
if (!req.body.tag_name) {
  console.log("No user data entered");
  return;
}
else {
} try {
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
} catch {
  res.status(500).json({message: "Something went wrong"})
}
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // Calls the update method on the Tag model
    Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      // Gets the tags based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated book as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

// Delete route for a tag with a matching id
router.delete('/:id', async (req, res) => {
  // Looks for the tags based on id given in the request parameters and deletes the instance from the database
  try {
  const userData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!userData) {
    res.status(404).json({ message: 'No data with this id!' });
    return;
  }
    res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
