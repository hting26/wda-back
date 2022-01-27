import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '品名']
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確'],
    required: [true, '必須有商品價格']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  sell: {
    type: Boolean,
    default: true,
    required: [true, '必須有商品價格']
  },
  category: {
    type: String,
    enum: {
      values: ['飾品', '皮件', '鞋子'],
      message: '商品分類不存在'
    }
  }
}, { versionKey: false })

export default mongoose.model('products', productSchema)
