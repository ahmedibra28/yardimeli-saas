import mongoose from 'mongoose'
import Employee from './Employee'
import User from './User'

const resourceScheme = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Employee,
      required: true,
    },
    description: { type: String, required: true },
    files: [
      {
        file: { type: String, required: true },
      },
    ],

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

const Resource =
  mongoose.models.Resource || mongoose.model('Resource', resourceScheme)
export default Resource
