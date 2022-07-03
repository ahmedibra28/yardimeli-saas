import {
  FaUsers,
  FaBaby,
  FaBabyCarriage,
  FaThermometer,
  FaSkullCrossbones,
} from 'react-icons/fa'

import useReportsHook from '../utils/api/pregnancy-care/reports'

import { Pie, Bar } from 'react-chartjs-2'
import { Message, Spinner } from '../components'

const PDashboard = () => {
  const { getDashboard } = useReportsHook()
  const { isLoading, isError, error, data: patientData } = getDashboard

  const data = {
    patients: 105,
    dropoutPatients: 5,
    birthMothers: 8,
    normalDelivery: 19,
    cesareanDelivery: 4,
    deceasedChild: 6,
    monthlyDelivery: {
      labels: patientData && Object.keys(patientData?.monthlyDelivery[0]),
      datasets: [
        {
          label: 'Birth Children',
          data: patientData && Object.values(patientData?.monthlyDelivery[0]),
          backgroundColor: '#93ADCF',
          borderWidth: 0,
        },
      ],
    },
    birthChildren: {
      labels: patientData?.birthChildren.map((gender) =>
        Object.keys(gender)
      )[0],
      datasets: [
        {
          label: 'Birth Children',
          data: patientData?.birthChildren.map((gender) =>
            Object.values(gender)
          )[0],
          backgroundColor: ['#585B80', '#93ADCF'],
          borderWidth: 0,
        },
      ],
    },
    district: {
      labels: patientData && Object.keys(patientData?.district),
      datasets: [
        {
          label: 'Districts',
          data: patientData && Object.values(patientData?.district),
          backgroundColor: '#93ADCF',
          borderWidth: 0,
        },
      ],
    },
  }

  const options = {
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Birth Children Gender',
      },
    },
    responsive: true,
  }
  const districtOptions = {
    scales: {
      y: {
        display: true,
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Patient Districts',
      },
    },
    responsive: true,
  }

  const monthlyOptions = {
    scales: {
      y: {
        display: true,
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Birth',
      },
    },
    responsive: true,
  }

  return (
    <div className='container'>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='row gy-3 bg-light p-3 mt-2'>
            <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
              <div className='card border-0 shadow'>
                <div className='card-body text-center fw-bold'>
                  <FaUsers className='card-img-top mb-2' />
                  <h6 className='card-title'>All Patients</h6>
                  <p className='card-text'>{patientData?.patients}</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
              <div className='card border-0 shadow'>
                <div className='card-body text-center fw-bold'>
                  <FaUsers className='card-img-top mb-2' />
                  <h6 className='card-title'>Dropout Patients</h6>
                  <p className='card-text'>{patientData?.dropoutPatients}</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
              <div className='card border-0 shadow'>
                <div className='card-body text-center fw-bold'>
                  <FaBaby className='card-img-top mb-2' />
                  <h6 className='card-title'>Birth Mothers</h6>
                  <p className='card-text'>{patientData?.birthMothers}</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
              <div className='card border-0 shadow'>
                <div className='card-body text-center fw-bold'>
                  <FaBabyCarriage className='card-img-top mb-2' />
                  <h6 className='card-title'>Normal Delivery</h6>
                  <p className='card-text'>{patientData?.normalDelivery}</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
              <div className='card border-0 shadow'>
                <div className='card-body text-center fw-bold'>
                  <FaThermometer className='card-img-top mb-2' />
                  <h6 className='card-title'>Cesarean</h6>
                  <p className='card-text'>{patientData?.cesareanDelivery}</p>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-sm-4 col-6'>
              <div className='card border-0 shadow'>
                <div className='card-body text-center fw-bold'>
                  <FaSkullCrossbones className='card-img-top mb-2' />
                  <h6 className='card-title'>Deceased Child</h6>
                  <p className='card-text'>{patientData?.deceasedChild}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='row gy-3 mt-4 bg-light'>
            <div className='col-12'>
              <Bar data={data.district} options={districtOptions} />
            </div>
            <div className='col-md-4 col-12'>
              <Pie data={data.birthChildren} options={options} />
            </div>
            <div className='col-md-8 col-12'>
              <Bar data={data.monthlyDelivery} options={monthlyOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PDashboard
