import mongoose from 'mongoose'

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '必須有名字']
  },
  description: {
    type: String,
    required: [true, '必須有說明']
  },
  image: {
    type: String
  },
  sell: {
    type: Boolean,
    default: true
  }
}, { versionKey: false })

export default mongoose.model('dogs', dogSchema)
