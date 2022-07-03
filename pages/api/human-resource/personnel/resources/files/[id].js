import nc from 'next-connect'
import db from '../../../../../../config/db'
import Resource from '../../../../../../models/human-resource/Resource'
import { isAuth } from '../../../../../../utils/auth'

const schemaName = Resource
const schemaNameString = 'Resource'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()

  try {
    const { id } = req.query
    const { path } = req.body.obj

    const resource = await schemaName.findById(id)
    if (!resource)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    if (resource.files.length === 1) {
      await resource.remove()
    } else {
      resource.files = resource.files.filter((file) => file.path !== path)
      await resource.save()
    }

    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
