import mongoose from 'mongoose'
import User from '../User'
import Patient from './Patient'

const followUpScheme = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Patient,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
)

const FollowUp =
  mongoose.models.FollowUp || mongoose.model('FollowUp', followUpScheme)
export default FollowUp
