import moment from 'moment'
import nc from 'next-connect'
import db from '../../../../config/db'
import Investigation from '../../../../models/pregnancy-care/Investigation'
import Patient from '../../../../models/pregnancy-care/Patient'
import { isAuth } from '../../../../utils/auth'

const schemaName = Investigation

const handler = nc()
handler.use(isAuth)
handler.post(async (req, res) => {
  await db()
  try {
    if (!req.body.patient)
      return res.status(404).json({ error: 'patient id is required' })

    const { patient: patientId, startDate, endDate } = req.body

    if (endDate < startDate) {
      return res.status(400).send('End date must be after start date')
    }

    const patient = await Patient.findOne({
      patientId: patientId.toUpperCase(),
    })

    if (!patient) return res.status(400).json({ error: `Patient not found` })

    const start = moment(startDate).clone().startOf('day').format()
    const end = moment(endDate).clone().endOf('day').format()

    // get patient records between startDate and endDate'
    const patientRecords = await Investigation.find({
      patient: patient._id,
      status: 'completed',
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate('createdBy', ['name'])
      .populate('patient', ['name', 'patientId'])
      .populate('labTests.labTest')
      .populate('images.image')
      .populate('vaccinations.vaccination')
      .populate('createdBy', ['name'])
      .lean()
      .sort({ date: -1 })

    // get patient prescriptions between startDate and endDate
    //  const patientPrescriptions = await Prescription.find({
    //   patient: patient._id,
    //   date: {
    //     $gte: start,
    //     $lte: end,
    //   },
    // })
    //   .populate('treatment.treatment')
    //   .populate('createdBy', ['name'])
    //   .populate('patient', ['name', 'patientId'])
    //   .lean()
    //   .sort({ date: -1 })
    const patientPrescriptions = []

    res.status(201).json({ patientRecords, patientPrescriptions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
