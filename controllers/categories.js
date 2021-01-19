const db = require('../models')

//GET ALL CATEGORIES
const index = async (req, res) => {
  try {
    const Category = await db.Category.find({}).populate('items')
    if (!Category.length)
      return res.json({
        message: 'none found',
      })
    await res.json({ category: Category })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  index,
  // create,
}
