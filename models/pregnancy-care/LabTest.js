import mongoose from 'mongoose'
import User from '../User'

const labTestScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    reference: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
)

const LabTest =
  mongoose.models.LabTest || mongoose.model('LabTest', labTestScheme)
export default LabTest
