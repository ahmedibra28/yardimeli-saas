import nc from 'next-connect'
import db from '../../../../../../config/db'
import Investigation from '../../../../../../models/pregnancy-care/Investigation'
import { isAuth } from '../../../../../../utils/auth'

const schemaName = Investigation
const schemaNameString = 'Investigation'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const { data } = req.body

    if (!data) return res.status(400).json({ error: 'Result is required' })

    const objData = Object.keys(data).map((key) => {
      return {
        labTest: key,
        result: data[key],
        user: req.user._id,
      }
    })

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.labTests = objData
    object.status = 'completed'
    object.updatedBy = req.user._id

    await object.save()
    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
