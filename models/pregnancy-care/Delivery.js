import mongoose from 'mongoose'
import User from '../User'
import Patient from './Patient'

const deliveryScheme = mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: Patient },
    preDelivery: {
      date: { type: Date, required: true },
      gravida: { type: String, required: true },
      para: { type: String, required: true },
      prevCS: { type: Boolean, required: true },
      cervicalDilation: { type: String, required: true },
      descending: { type: String, required: true },
      lie: { type: String, required: true },
      presentation: { type: String, required: true },
      position: { type: String, required: true },
      membrance: {
        type: String,
        required: true,
        enum: ['Rupture', 'Meconium', 'Blood', 'Clear'],
      },
      contraction: { type: String, required: true },
      fetalHeart: { type: String, required: true },
      vitalSign: { type: String, required: true },
      pulse: { type: String, required: true },
      temperature: { type: String, required: true },
    },
    postDelivery: {
      postDate: { type: Date, required: true },
      type: { type: String, required: true, enum: ['CS', 'SVD'] },
      mode: {
        type: String,
        required: true,
        enum: ['Induction', 'Spontaneous'],
      },
      episiotomy: { type: Boolean, required: true },
      repair: { type: Boolean, required: true },
      placenta: {
        type: String,
        required: true,
        enum: ['Complete', 'Incomplete'],
      },
      perinealTear: { type: Boolean, required: true },
      perinealRepair: { type: Boolean, required: true },
      postVitalSign: { type: String, required: true },
      postPulse: { type: String, required: true },
      postTemperature: { type: String, required: true },
    },
    baby: {
      childPatientId: { type: String, required: true },
      doctor: { type: String, required: true },
      gestationalAge: { type: String, required: true },
      gender: { type: String, required: true },
      noOfBabies: { type: String, required: true },
      childStatus: {
        type: String,
        required: true,
        enum: ['Alive', 'Death'],
      },
      apgarScore: { type: String, required: true },
      weight: { type: String, required: true },
      breastSucking: { type: Boolean, required: true },
    },

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

const Delivery =
  mongoose.models.Delivery || mongoose.model('Delivery', deliveryScheme)
export default Delivery
