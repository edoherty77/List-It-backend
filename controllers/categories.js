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

// const show = async (req, res) => {
//   try {
//     const Category = await db.Category.findOne({ title: req.body.title })
//     if (!Category.length)
//       return res.json({
//         message: 'none found',
//       })
//     await res.json({ category: Category })
//   } catch (error) {
//     console.log(error)
//   }
// }

module.exports = {
  index,
  // show,
  // create,
}
