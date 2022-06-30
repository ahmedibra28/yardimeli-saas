import mongoose from 'mongoose'
import Employee from './Employee'
import User from './User'

const leaveScheme = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Employee,
      required: true,
    },
    type: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },

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

const Leave = mongoose.models.Leave || mongoose.model('Leave', leaveScheme)
export default Leave
