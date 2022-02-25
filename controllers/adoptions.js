import adoptions from '../models/adoptions.js'

export const submitApply = async (req, res) => {
  console.log(req)
  try {
    const result = await adoptions.create({ userId: req.user._id, description: req.body.description, name: req.body.name, phone: req.body.phone, date: req.body.date, dog: req.body.dog })
    await req.user.save()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getMyAdoptions = async (req, res) => {
  try {
    const result = await adoptions.find({ user: req.user._id }).populate('dog', 'name')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptions.find().populate('user', 'account').populate('dog', 'name')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
