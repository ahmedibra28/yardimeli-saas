import nc from 'next-connect'
import db from '../../../../config/db'
import Investigation from '../../../../models/pregnancy-care/Investigation'
import Patient from '../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../utils/auth'

const handler = nc()
handler.use(isAuth)
handler.post(async (req, res) => {
  await db()

  try {
    const { investigationType, patient } = req.body

    if (!investigationType)
      return res.status(404).json({ error: 'Investigation type is required' })

    const types = ['laboratory', 'image', 'vaccination']
    if (!types.includes(investigationType))
      return res.status(404).json({
        error: `investigation type must be one of the following: (${types.join(
          ', '
        )})`,
      })

    if (!patient) {
      const investigations = await Investigation.find({
        investigationType: investigationType.toLowerCase(),
        status: 'completed',
      })
        .sort({ createdAt: -1 })
        .lean()
        .populate('patient', ['patientId', 'name'])
        .populate('createdBy', ['name'])
        .populate('labTests.labTest', ['name'])
        .populate('images.image', ['name'])
        .populate('vaccinations.vaccination', ['name'])

      return res.status(200).send(investigations)
    } else {
      const pt = await Patient.findOne({
        patientId: patient.toUpperCase(),
      })
      if (!pt) return res.status(404).json({ error: 'Patient not found' })

      const investigations = await Investigation.find({
        investigationType: investigationType.toLowerCase(),
        patient: pt._id,
        status: 'completed',
      })
        .sort({ createdAt: -1 })
        .lean()
        .populate('patient', ['patientId', 'name'])
        .populate('createdBy', ['name'])
        .populate('labTests.labTest', ['name'])
        .populate('images.image', ['name'])
        .populate('vaccinations.vaccination', ['name'])

      return res.status(200).send(investigations)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
