import nc from 'next-connect'
import db from '../../../../config/db'
import FollowUp from '../../../../models/pregnancy-care/FollowUp'
import Patient from '../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../utils/auth'

const schemaName = FollowUp

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
      .sort({ date: -1 })
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
    const { patient, date, description } = req.body

    const patients = await Patient.findById(patient)

    if (!patients) return res.status(400).json({ error: `Patient not found` })

    const followUp = await schemaName.create({
      patient: patients._id,
      description,
      date,
      createdBy: req.user._id,
    })

    return res.status(201).send(followUp)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
