import mongoose from 'mongoose'
import User from '../User'
import Image from './Image'
import LabTest from './LabTest'
import Vaccination from './Vaccination'
import Patient from './Patient'

const investigationScheme = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Patient,
      required: true,
    },
    status: { type: String, default: 'pending' },
    investigationType: { type: String, required: true },
    images: [
      {
        image: { type: mongoose.Schema.Types.ObjectId, ref: Image },
        result: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: User },
      },
    ],
    vaccinations: [
      {
        vaccination: { type: mongoose.Schema.Types.ObjectId, ref: Vaccination },
        result: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: User },
      },
    ],
    labTests: [
      {
        labTest: { type: mongoose.Schema.Types.ObjectId, ref: LabTest },
        result: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: User },
      },
    ],
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

const Investigation =
  mongoose.models.Investigation ||
  mongoose.model('Investigation', investigationScheme)
export default Investigation
