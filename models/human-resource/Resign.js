import mongoose from 'mongoose'
import Employee from './Employee'
import User from '../User'

const resignScheme = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Employee,
      required: true,
    },
    type: { type: String, required: true },
    reason: { type: String, required: true },
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

const Resign = mongoose.models.Resign || mongoose.model('Resign', resignScheme)
export default Resign
