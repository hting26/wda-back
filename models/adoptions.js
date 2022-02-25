import mongoose from 'mongoose'

const adoptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  dog: {
    type: mongoose.ObjectId,
    ref: 'dogs'
  },
  description: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export default mongoose.model('adoptions', adoptionSchema)
