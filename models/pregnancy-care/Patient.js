import mongoose from 'mongoose'
import User from '../User'

const patientScheme = mongoose.Schema(
  {
    patientId: { type: String, required: true, uppercase: true, unique: true },
    patientType: { type: String, default: 'Parent' },
    reference: {
      type: String,
      uppercase: true,
    },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    mobile: { type: Number, required: true },
    district: { type: String, required: true },
    status: { type: String },
    trimester: { type: Number },
    isActive: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
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
