import mongoose from 'mongoose'

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '必須有名字']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  }
}, { versionKey: false })

export default mongoose.model('dogs', dogSchema)
