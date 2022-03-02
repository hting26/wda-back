import adoptions from '../models/adoptions.js'

export const submitApply = async (req, res) => {
  console.log(req)
  try {
    const result = await adoptions.create({ user: req.user._id, description: req.body.description, name: req.body.name, phone: req.body.phone, date: req.body.date, dog: req.body.dog, status: req.body.status })
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
export const deleteAdoptionById = async (req, res) => {
  try {
    const result = await adoptions.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '' })
    }
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
  }
}
export const editAdoptionById = async (req, res) => {
  try {
    // findByIdAndUpdate 預設回來的 result 是更新前的資料
    // 加上 new true 後可以回來新的資料
    const result = await adoptions.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({
      success: true,
      message: '',
      status: result.status
    })
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器發生錯誤' })
    }
  }
}
