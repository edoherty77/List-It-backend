const db = require('../models')

//GET ALL ITEMS ROUTE
const index = async (req, res) => {
  try {
    //find all
    const foundItems = db.Item.find({})
    if (!foundItems.length)
      return await res.json({
        message: 'No items found',
      })

    //return
    await res.json({ items: foundItems })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  index,
  // show,
  // create,
  // update,
  // destroy,
}
