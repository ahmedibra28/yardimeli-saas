import nc from 'next-connect'
import db from '../../../../../config/db'
import Patient from '../../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../../utils/auth'

const schemaName = Patient

const handler = nc()
handler.use(isAuth)
handler.get(async (req, res) => {
  await db()
  try {
    const q = req.query && req.query.q

    let query = schemaName.find(q ? { name: { $regex: q, $options: 'i' } } : {})

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      q ? { name: { $regex: q, $options: 'i' } } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ date: -1 })
      .lean()
      .sort({ createdAt: 1 })

    const result = await query

    res.status(200).json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.post(async (req, res) => {
  await db()
  try {
    const {
      patientId,
      patientType,
      reference,
      name,
      dateOfBirth,
      mobile,
      district,
      status,
      date,
    } = req.body
    if (patientType === 'Child') {
      const check = await schemaName.findOne({
        patientId: reference.toUpperCase(),
        patientType: 'Parent',
      })
      if (!check)
        return res.status(404).json({ error: 'Parent does not exist' })
    }
    const object = await schemaName.create({
      patientId,
      patientType,
      reference,
      name,
      dateOfBirth,
      mobile,
      district,
      status,
      date,
      trimester: patientType === 'Child' ? undefined : trimester,
      isActive: true,
      createdBy: req.user._id,
    })
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
