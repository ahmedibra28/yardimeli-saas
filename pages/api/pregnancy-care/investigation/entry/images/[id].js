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
    const { image, result } = req.body

    if (!image || !result)
      return res.status(400).json({ error: 'Result is required' })

    const images = [
      {
        image: image._id,
        result: result,
        user: req.user._id,
      },
    ]

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.images = images
    object.status = 'completed'
    object.updatedBy = req.user._id

    await object.save()
    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
