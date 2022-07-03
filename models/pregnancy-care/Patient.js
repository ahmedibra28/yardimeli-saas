import mongoose from 'mongoose'
import User from '../User'

const patientScheme = mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    mobile: { type: Number, required: true },
    district: { type: String, required: true },
    status: { type: String, required: true },
    trimester: { type: Number, required: true },
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

const Patient =
  mongoose.models.Patient || mongoose.model('Patient', patientScheme)
export default Patient
