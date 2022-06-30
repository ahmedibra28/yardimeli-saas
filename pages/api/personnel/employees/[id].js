import nc from 'next-connect'
import db from '../../../../config/db'
import Employee from '../../../../models/Employee'
import { isAuth } from '../../../../utils/auth'

const schemaName = Employee
const schemaNameString = 'Employee'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const {
      employeeId,
      name,
      gender,
      mobile,
      contract,
      email,
      hiredDate,
      nationality,
      dob,
      position,
      department,
      bankName,
      bankAccount,
      active,
    } = req.body

    if (employeeId.toString().substring(0, 5) !== 'YH-A0')
      return res.status(400).json({ error: 'Invalid ID format' })

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    const exist = await schemaName.findOne({
      employeeId: {
        $regex: `^${req.body?.employeeId?.trim()}$`,
        $options: 'i',
      },
      _id: { $ne: id },
    })

    if (exist)
      return res.status(400).json({ error: 'Duplicate value detected' })

    object.employeeId = employeeId
    object.name = name
    object.gender = gender
    object.mobile = mobile
    object.contract = contract
    object.email = email
    object.hiredDate = hiredDate
    object.nationality = nationality
    object.dob = dob
    object.position = position
    object.department = department
    object.bankName = bankName
    object.bankAccount = bankAccount
    object.active = active

    object.updatedBy = req.user.id
    await object.save()
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
