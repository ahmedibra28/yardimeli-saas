import nc from 'next-connect'
import db from '../../../../config/db'
import Employee from '../../../../models/human-resource/Employee'
import Leave from '../../../../models/human-resource/Leave'
import Resign from '../../../../models/human-resource/Resign'
import WriteUp from '../../../../models/human-resource/WriteUp'
import Department from '../../../../models/human-resource/Department'
import Position from '../../../../models/human-resource/Position'
import moment from 'moment'
import { isAuth } from '../../../../utils/auth'

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
    const employees = await Employee.find({ status: 'active' }).lean()
    const resigns = await Resign.find({}).lean()
    const writeups = await WriteUp.find({}).lean()
    const departments = await Department.find({}).lean()
    const positions = await Position.find({}).lean()
    let leaves = await Leave.find({})
      .lean()
      .populate({
        path: 'employee',
        populate: {
          path: 'department',
        },
      })
      .sort({ startDate: -1 })

    leaves = dateFormat(leaves)

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
