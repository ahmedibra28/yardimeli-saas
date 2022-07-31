import nc from 'next-connect'
import db from '../../../../../config/db'
import History from '../../../../../models/pregnancy-care/History'
import { isAuth } from '../../../../../utils/auth'

const schemaName = History
const schemaNameString = 'History'

const handler = nc()
handler.use(isAuth)
handler.put(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const {
      status,
      complaint,
      hpi,
      pmh,
      fh,
      noOfChildren,
      gravida,
      para,
      abortion,
      stillBirth,
      aliveChildren,
      vacuum,
      caesarean,
      induction,
      ageOfLastBaby,
      bp,
      temperature,
      pulse,
      weight,
      diagnostics,
      patient,
      infantDeath,
      neonatalDeath,
      toddlerDeath,
      date,
    } = req.body

    if (!patient) return res.status(400).json({ error: 'Patient is required' })

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    if (object.date.toDateString() !== new Date().toDateString())
      return res.status(400).json({
        error: `Patient history can only be updated ${new Date().toDateString()}`,
      })

    object.status = status
    object.complaint = complaint
    object.hpi = hpi
    object.pmh = pmh
    object.fh = fh
    object.noOfChildren = noOfChildren
    object.gravida = gravida
    object.para = para
    object.abortion = abortion
    object.stillBirth = stillBirth
    object.aliveChildren = aliveChildren
    object.vacuum = vacuum
    object.caesarean = caesarean
    object.induction = induction
    object.ageOfLastBaby = ageOfLastBaby
    object.bp = bp
    object.temperature = temperature
    object.pulse = pulse
    object.weight = weight
    object.diagnostics = diagnostics
    object.patient = patient
    object.updatedBy = req.user._id
    object.infantDeath = infantDeath
    object.neonatalDeath = neonatalDeath
    object.toddlerDeath = toddlerDeath
    object.date = date

    await object.save()
    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

handler.delete(async (req, res) => {
  await db()
  try {
    const { id } = req.query
    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    if (object.date.toDateString() !== new Date().toDateString())
      return res.status(400).json({
        error: `Patient history can only be deleted ${new Date().toDateString()}`,
      })

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
