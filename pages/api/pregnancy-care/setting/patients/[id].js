import nc from 'next-connect'
import db from '../../../../../config/db'
import Patient from '../../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../../utils/auth'

const schemaName = Patient
const schemaNameString = 'Patient'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const {
      patientId,
      patientType,
      reference,
      name,
      dateOfBirth,
      mobile,
      district,
      status,
      trimester,
      isActive,
      date,
    } = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    if (patientType === 'Child') {
      const check = await schemaName.findOne({
        patientId: reference.toUpperCase(),
        patientType: 'Parent',
      })
      if (!check)
        return res.status(404).json({ error: 'Parent does not exist' })
    }

    object.patientType = patientType
    object.patientId = patientId
    object.name = name
    object.dateOfBirth = dateOfBirth
    object.mobile = mobile
    object.district = district
    object.status = status
    object.isActive = isActive
    object.updatedBy = req.user._id
    object.createdBy = req.user._id
    object.date = date
    object.trimester = patientType === 'Child' ? undefined : trimester
    object.reference = patientType === 'Child' ? reference : undefined

    await object.save()
    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.delete(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
