const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  title: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
