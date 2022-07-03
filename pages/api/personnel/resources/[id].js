import nc from 'next-connect'
import db from '../../../../config/db'
import Resource from '../../../../models/Resource'
import { isAuth } from '../../../../utils/auth'

const schemaName = Resource
const schemaNameString = 'Resource'

const handler = nc()
handler.use(isAuth)

handler.get(async (req, res) => {
  await db()
  try {
    const resource = await schemaName
      .findById(req.query.id)
      .populate('employee', ['name', 'employeeId'])
      .lean()

    if (!resource) return res.status(404).json({ error: 'Resource not found' })

    res.status(200).send(resource)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const { employee, files, description } = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.employee = employee
    object.description = description
    object.files = files ? files : object.files
    object.updatedBy = req.user.id
    // await object.save()
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
