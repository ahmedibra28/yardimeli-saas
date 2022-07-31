import mongoose from 'mongoose'
import User from '../User'
import Patient from './Patient'

const historyScheme = mongoose.Schema(
  {
    status: String,
    complaint: String,
    hpi: String,
    pmh: String,
    fh: String,
    noOfChildren: Number,
    gravida: Number,
    para: Number,
    abortion: Number,
    stillBirth: Number,
    aliveChildren: Number,
    infantDeath: Number,
    neonatalDeath: Number,
    toddlerDeath: Number,
    vacuum: Number,
    caesarean: Number,
    induction: Number,
    ageOfLastBaby: String,
    bp: String,
    temperature: Number,
    pulse: Number,
    weight: Number,
    diagnostics: String,
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Patient,
      required: true,
    },
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

const History =
  mongoose.models.History || mongoose.model('History', historyScheme)
export default History
