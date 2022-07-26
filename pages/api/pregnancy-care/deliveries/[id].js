import nc from 'next-connect'
import db from '../../../../config/db'
import Delivery from '../../../../models/pregnancy-care/Delivery'
import Patient from '../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../utils/auth'

const schemaName = Delivery
const schemaNameString = 'Delivery'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
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

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    const patients = await Patient.findOne({ _id: patient, isActive: true })
    if (!patients) return res.status(404).json({ error: 'Patient not found' })

    object.patient = patient
    object.preDelivery = preDelivery
    object.postDelivery = postDelivery
    object.isActive = isActive
    object.updatedBy = req.user._id

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
