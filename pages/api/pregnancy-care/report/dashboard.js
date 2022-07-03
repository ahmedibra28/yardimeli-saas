import nc from 'next-connect'
import db from '../../../../config/db'
import Patient from '../../../../models/pregnancy-care/Patient'
// import { isAuth } from '../../../../utils/auth'

const handler = nc()
// handler.use(isAuth)
handler.get(async (req, res) => {
  await db()
  try {
    const patients = await Patient.find({})

    const districts = {}
    patients.map(
      (d) => (districts[d.district] = (districts[d.district] || 0) + 1)
    )

    const data = {
      patients: patients.length,
      dropoutPatients: patients.filter((patient) => patient.isActive)?.length,
      birthMothers: 0,
      normalDelivery: 0,
      cesareanDelivery: 0,
      deceasedChild: 0,
      birthChildren: [{ Male: 0, Female: 0 }],
      monthlyDelivery: [
        {
          January: 0,
          February: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0,
        },
      ],
      district: districts,
    }

    return res.status(200).send(data)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

export default handler
