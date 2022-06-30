import mongoose from 'mongoose'
import Department from './Department'
import Position from './Position'
import User from './User'

const employeeScheme = mongoose.Schema(
  {
    employeeId: { type: String, required: true, uppercase: true, unique: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    mobile: { type: Number, required: true },
    contract: { type: String, required: true },
    email: { type: string, default: 'N/A' },
    hiredDate: { type: Date, required: true },
    nationality: { type: String, default: 'Somali' },
    dob: { type: Date, required: true, default: new Date('01/01/1970') },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Department,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Position,
      required: true,
    },
    bankName: { type: String, default: 'Salaam Bank' },
    bankAccount: { type: String, default: '000000' },
    status: { type: String, enum: ['active', 'resigned'], default: 'active' },

    // default properties
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
)

const Employee =
  mongoose.models.Employee || mongoose.model('Employee', employeeScheme)
export default Employee
