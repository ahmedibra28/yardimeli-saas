import nc from 'next-connect'
import db from '../../../../config/db'
import Leave from '../../../../models/Leave'
import { isAuth } from '../../../../utils/auth'

const schemaName = Leave
const schemaNameString = 'Leave'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const { endDate, startDate, employee, type, description } = req.body

    let object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    if (endDate < startDate)
      return res
        .status(400)
        .json({ error: 'End date must be after start date' })

    object.endDate = endDate
    object.startDate = startDate
    object.employee = employee
    object.description = description
    object.type = type
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
