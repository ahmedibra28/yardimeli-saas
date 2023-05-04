import nc from 'next-connect'
import db from '../../../../../config/db'
import Resign from '../../../../../models/human-resource/Resign'
import Employee from '../../../../../models/human-resource/Employee'
import { isAuth } from '../../../../../utils/auth'

const schemaName = Resign
const schemaNameString = 'Resign'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const { employee, type, reason, date } = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.employee = employee
    object.type = type
    object.reason = reason
    object.date = date
    object.updatedBy = req.user.id
    // await object.save()
    return res.status(400).json({
      error:
        'Editing is not allowed, please delete this employee if you are editing',
    })
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

    const employee = await Employee.findOne({
      _id: object.employee,
    })

    if (!employee) return res.status(404).json({ error: 'Employee not found' })

    employee.status = 'active'
    await employee.save()

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
