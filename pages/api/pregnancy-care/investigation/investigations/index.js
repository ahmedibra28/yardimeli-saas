import nc from 'next-connect'
import db from '../../../../../config/db'
import Investigation from '../../../../../models/pregnancy-care/Investigation'
import Patient from '../../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../../utils/auth'

const schemaName = Investigation

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
      .populate('labTests.labTest')
      .populate('images.image')
      .populate('vaccinations.vaccination')

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
    let { patient, images, labTests, vaccinations, investigationType, date } =
      req.body

    if (!patient) return res.status(400).json({ error: 'Patient is required' })

    if (investigationType === 'image' && !Array.isArray(images))
      images = [images]
    if (investigationType === 'laboratory' && !Array.isArray(labTests))
      labTests = [labTests]
    if (investigationType === 'vaccination' && !Array.isArray(vaccinations))
      vaccinations = [vaccinations]

    const object = await schemaName.create({
      images: images ? images.map((image) => ({ image })) : [],
      labTests: labTests ? labTests.map((lab) => ({ labTest: lab })) : [],
      vaccinations: vaccinations
        ? vaccinations.map((vac) => ({ vaccination: vac }))
        : [],
      investigationType,
      status: 'pending',
      date,
      patient,
      createdBy: req.user._id,
    })
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
