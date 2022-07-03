import nc from 'next-connect'
import db from '../../../../../config/db'
import History from '../../../../../models/pregnancy-care/History'
import Patient from '../../../../../models/Patient'
import { isAuth } from '../../../../../utils/auth'

const schemaName = History

const handler = nc()
handler.use(isAuth)
handler.get(async (req, res) => {
  await db()
  try {
    const q = req.query && req.query.q

    const patient = q ? await Patient.findOne({ patientId: q }) : null

    let query = schemaName.find(patient ? { patient: patient._id } : {})

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      patient ? { patient: patient._id } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
      .populate('patient', ['patientId', 'name'])
      .populate('createdBy', ['name'])

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
    if (!req.body.patient)
      return res.status(400).json({ error: 'Patient is required' })

    const object = await schemaName.create({
      ...req.body,
      createdBy: req.user._id,
    })
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
