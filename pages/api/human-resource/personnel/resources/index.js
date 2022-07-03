import nc from 'next-connect'
import db from '../../../../../config/db'
import Employee from '../../../../../models/human-resource/Employee'
import Resource from '../../../../../models/human-resource/Resource'
import { isAuth } from '../../../../../utils/auth'

const schemaName = Resource

const handler = nc()
handler.use(isAuth)
handler.get(async (req, res) => {
  await db()
  try {
    const q = req.query && req.query.q

    const employee = await Employee.findOne(
      q ? { employeeId: q.toUpperCase() } : null
    )

    let query = schemaName.find(q && employee ? { employee: employee._id } : {})

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      q && employee ? { employee: employee._id } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
      .populate('employee', ['employeeId', 'name'])

    const result = await query

    res.status(200).json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.post(async (req, res) => {
  await db()
  try {
    const { description, files } = req.body

    const employee = await Employee.findOne({
      employee: req.body.employee,
      status: 'active',
    })
    if (!employee)
      return res.status(404).json({ error: 'Employee is not active' })

    const resource = await schemaName.findOne({ employee: req.body.employee })

    if (resource) {
      resource.files = [
        ...resource.files,
        {
          name: files[0].name,
          path: files[0].path,
          description: description,
        },
      ]

      await resource.save()
    } else {
      await schemaName.create({
        employee: req.body.employee,
        files: [
          {
            name: files[0].name,
            path: files[0].path,
            description: description,
          },
        ],
        createdBy: req.user.id,
      })
    }

    res.status(200).send(resource)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
