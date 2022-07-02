import mongoose from 'mongoose'
import Employee from './Employee'
import User from './User'

const writeUpScheme = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Employee,
      required: true,
    },
    offenseCommitted: { type: String, required: true },
    actionPlan: { type: String, required: true },
    date: { type: Date, required: true },

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

const WriteUp =
  mongoose.models.WriteUp || mongoose.model('WriteUp', writeUpScheme)
export default WriteUp
