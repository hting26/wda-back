import adoptions from '../models/adoptions.js'
// import users from '../models/users.js'

export const submitApply = async (req, res) => {
  try {
    // if (req.user.cart.length === 0) {
    //   res.status(400).send({ success: false, message: '購物車是空的' })
    //   return
    // }
    // const hasNotSell = await users.aggregate([
    //   {
    //     $match: {
    //       _id: req.user._id
    //     }
    //   },
    //   {
    //     $project: {
    //       'cart.product': 1
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'products',
    //       localField: 'cart.product',
    //       foreignField: '_id',
    //       as: 'cart.product'
    //     }
    //   },
    //   {
    //     $match: {
    //       'cart.product.sell': false
    //     }
    //   }
    // ])
    // if (hasNotSell.length > 0) {
    //   res.status(400).send({ success: false, message: '包含下架商品' })
    //   return
    // }
    const result = await adoptions.create({ user: req.user._id, products: req.user.cart })
    req.user.cart = []
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: result._id })
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
    const result = await adoptions.find({ user: req.user._id }).populate('dogs.dog')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptions.find().populate('user', 'account').populate('dogs.dog')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
