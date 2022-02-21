import mongoose from 'mongoose'

const adoptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  dogs: {
    type: [
      {
        dog: {
          type: mongoose.ObjectId,
          ref: 'dogs',
          required: [true, '缺少 ID']
        }
      }
    ]
  },
  form: {},
  date: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export default mongoose.model('adoptions', adoptionSchema)
