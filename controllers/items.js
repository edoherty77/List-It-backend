const db = require('../models')

//GET ALL ITEMS ROUTE
const index = async (req, res) => {
  console.log(req.body)
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

//SHOW ITEM ROUTE
const show = async (req, res) => {
  console.log(req.params.id)
  //use url id to find specific item
  db.Item.findById(req.params.id, (err, foundItem) => {
    if (err) console.log('Error in items#show:', err)
    if (!foundItem) return res.json({ message: 'none found' })
    res.json({ item: foundItem })
  })
}

//CREATE ITEM ROUTE
const create = async (req, res) => {
  try {
    //use req.body to create new item
    const createdItem = await db.Item.create(req.body)

    //find item's category - push, save, return
    const foundCategory = await db.Category.findOne({
      title: req.body.category,
    })
    foundCategory.items.push(createdItem)
    await foundCategory.save()

    await createdItem.save()

    await res.json({ item: createdItem })
  } catch (error) {
    console.log(error)
  }
}

//UPDATE ITEM ROUTE
const update = async (req, res) => {
  const data = req.body
  //item values before it was updated
  const oldValues = data.item

  //item values after being updated
  const updatedValues = data.values

  try {
    //update and save the item
    const updatedItem = await db.Item.findByIdAndUpdate(
      req.params.id,
      updatedValues,
      { new: true },
    )
    if (!updatedItem)
      return await res.json({
        message: 'No item with that ID',
      })
    await updatedItem.save()

    //Find the original db category using the old values
    const oldCategory = await db.Category.findOne({
      title: oldValues.category,
    })

    //Find the new db category using the updated values
    const newCategory = await db.Category.findOne({
      title: updatedValues.category,
    })

    //Check to see if the user updated the category. If yes, remove from old and push to new
    if (oldValues.category !== updatedValues.category) {
      await oldCategory.items.remove(updatedItem)
      await oldCategory.save()
      await newCategory.items.push(updatedItem)
      await newCategory.save()
    }

    //return updated item
    await res.json({ item: updatedItem })
  } catch (error) {
    console.log(error)
  }
}

//DELETE ITEM ROUTE
const destroy = async (req, res) => {
  try {
    //Use id from url to delete item
    const deletedItem = await db.Item.findByIdAndDelete(req.params.id)

    //Use id from deleted item to find the category - remove, save, return
    const foundCategory = await db.Category.findOne({ items: deletedItem._id })
    if (foundCategory) {
      await foundCategory.items.remove(deletedItem)
      await foundCategory.save()

      await res.json({ item: deletedItem })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}
