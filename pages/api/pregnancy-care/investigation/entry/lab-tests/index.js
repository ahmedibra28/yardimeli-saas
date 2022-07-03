import nc from 'next-connect'
import db from '../../../../../../config/db'
import Investigation from '../../../../../../models/Investigation'
import Patient from '../../../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../../../utils/auth'

const schemaName = Investigation

const handler = nc()
handler.use(isAuth)

handler.post(async (req, res) => {
  await db()
  try {
    const patientId = req.body

    const patient = await Patient.findOne({
      patientId: patientId.toUpperCase(),
    })

    if (!patient) return res.status(400).json({ error: `Patient not found` })

    const object = await schemaName
      .find({
        patient: patient._id,
        investigationType: 'laboratory',
      })
      .populate('patient', ['patientId', 'name'])
      .populate('createdBy', ['name'])
      .populate('labTests.labTest')
      .sort({ createdAt: -1 })

    if (object.length === 0)
      return res
        .status(400)
        .json({ error: `No pending investigations for that patient` })

    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
