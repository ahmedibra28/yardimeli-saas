import nc from 'next-connect'
import db from '../../../../../config/db'
import Employee from '../../../../../models/Employee'
import Leave from '../../../../../models/Leave'
import Resign from '../../../../../models/Resign'
import WriteUp from '../../../../../models/WriteUp'
import Department from '../../../../../models/Department'
import Position from '../../../../../models/Position'
import moment from 'moment'

const handler = nc()
handler.get(async (req, res) => {
  await db()
  try {
    const employees = await Employee.find({ status: 'active' }).lean()
    const resigns = await Resign.find({}).lean()
    const writeups = await WriteUp.find({}).lean()
    const departments = await Department.find({}).lean()
    const positions = await Position.find({}).lean()
    const leaves = await Leave.find({})
      .lean()
      .populate({
        path: 'employee',
        populate: {
          path: 'department',
        },
      })

    const onLeave = leaves.filter(
      (leave) =>
        moment(leave.endDate).format('YYYY-MM-DD') >=
        moment(Date.now()).format('YYYY-MM-DD')
    )

    const data = {
      employees: employees?.length,
      resigns: resigns?.length,
      writeups: writeups?.length,
      departments: departments?.length,
      positions: positions?.length,
      totalOnLeave: onLeave?.length,
      leaves: onLeave,
    }

    return res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
