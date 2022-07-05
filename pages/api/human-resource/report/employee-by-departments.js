import nc from 'next-connect'
import db from '../../../../config/db'
import Employee from '../../../../models/human-resource/Employee'
// import { isAuth } from '../../../../utils/auth'

const handler = nc()
// handler.use(isAuth)
handler.post(async (req, res) => {
  await db()

  try {
    const { department } = req.body

    if (!department)
      return res.status(404).json({ error: 'Department is required' })

    const employees = await Employee.find({ department })
      .lean()
      .sort({ status: -1 })
      .populate('department', ['name'])
      .populate('position', ['name'])

    return res.status(200).send(employees)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
