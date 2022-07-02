import nc from 'next-connect'
import db from '../../../../config/db'
import Employee from '../../../../models/Employee'
import Leave from '../../../../models/Leave'
import { isAuth } from '../../../../utils/auth'
import moment from 'moment'

const schemaName = Leave

const dateFormat = (data) => {
  return data.map((d) => {
    return {
      ...d,
      startDate: moment(d.startDate).format('YYYY-MM-DD'),
      endDate: moment(d.endDate).format('YYYY-MM-DD'),
    }
  })
}

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
      .populate('employee', ['name', 'employeeId'])

    const queryData = await query

    const result = dateFormat(queryData)

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
    const employee = await Employee.findOne({
      employee: req.body.employee,
      status: 'active',
    })
    if (!employee)
      return res.status(404).json({ error: 'Employee is not active' })

    if (req.body.endDate < req.body.startDate)
      return res
        .status(400)
        .json({ error: 'End date must be after start date' })

    const object = await schemaName.create({
      ...req.body,
      createdBy: req.user.id,
    })
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
