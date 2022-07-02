import nc from 'next-connect'
import db from '../../../../config/db'
import WriteUp from '../../../../models/WriteUp'
import { isAuth } from '../../../../utils/auth'

const schemaName = WriteUp
const schemaNameString = 'Write Up'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { offenseCommitted, employee, actionPlan, date } = req.body
    const { id } = req.query

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.offenseCommitted = offenseCommitted
    object.employee = employee
    object.actionPlan = actionPlan
    object.date = date
    object.updatedBy = req.user.id
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
