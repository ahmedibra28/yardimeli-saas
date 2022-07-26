import nc from 'next-connect'
import db from '../../../../config/db'
import Delivery from '../../../../models/pregnancy-care/Delivery'
import Patient from '../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../utils/auth'

const schemaName = Delivery

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
    const {
      patient,
      isActive,
      date,
      gravida,
      para,
      prevCS,
      cervicalDilation,
      descending,
      lie,
      presentation,
      position,
      membrance,
      contraction,
      fetalHeart,
      vitalSign,
      pulse,
      temperature,

      postDate,
      type,
      mode,
      episiotomy,
      repair,
      placenta,
      perinealTear,
      perinealRepair,
      postVitalSign,
      postPulse,
      postTemperature,
    } = req.body

    const preDelivery = {
      date,
      gravida,
      para,
      prevCS,
      cervicalDilation,
      descending,
      lie,
      presentation,
      position,
      membrance,
      contraction,
      fetalHeart,
      vitalSign,
      pulse,
      temperature,
    }
    const postDelivery = {
      postDate,
      type,
      mode,
      episiotomy,
      repair,
      placenta,
      perinealTear,
      perinealRepair,
      postVitalSign,
      postPulse,
      postTemperature,
    }

    const patients = await Patient.findOne({ _id: patient, isActive: true })
    if (!patients) return res.status(404).json({ error: 'Patient not found' })

    const object = await schemaName.create({
      patient,
      preDelivery,
      postDelivery,
      isActive,
      createdBy: req.user._id,
    })
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
