import nc from 'next-connect'
import db from '../../../../config/db'
import { isAuth } from '../../../../utils/auth'
import FollowUp from '../../../../models/pregnancy-care/FollowUp'

const schemaName = FollowUp
const schemaNameString = 'FollowUp'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const { patient, date, description } = req.body

    if (!patient) return res.status(400).json({ error: 'Patient is required' })

    const object = await schemaName.findById(id)

    object.date = date
    object.description = description
    object.patient = patient

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

    if (object.date.toDateString() !== new Date().toDateString())
      return res.status(400).json({
        error: `Patient history can only be deleted ${new Date().toDateString()}`,
      })

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
