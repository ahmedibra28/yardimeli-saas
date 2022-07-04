import dynamic from 'next/dynamic'
import withAuth from '../HOC/withAuth'
import PDashboard from '../components/PDashboard'
import HRDashboard from '../components/HRDashboard'
import { useState } from 'react'
import { customLocalStorage } from '../utils/customLocalStorage'

const Home = () => {
  const [user, setUser] = useState(customLocalStorage()?.userAccessRoutes?.role)

  const components = [
    {
      _id: 1,
      name: 'HUMAN_RESOURCE',
      image: '/hr.png',
    },
    {
      _id: 2,
      name: 'PREGNANCY_CARE',
      image: '/pregnancy.png',
    },
  ]

  return (
    <div className='container py-5'>
      {customLocalStorage()?.userAccessRoutes?.role === 'SUPER_ADMIN' && (
        <div className='row gy-3'>
          {components.map((component, index) => (
            <div key={index} className='col-md-4 col-12 mx-auto'>
              <div className='card border-0 shadow'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className='card-img-top img-fluid'
                  src={component.image}
                  alt={component.image}
                />

                <div className='card-body text-center'>
                  <button
                    onClick={() => setUser(component.name)}
                    className='btn btn-warning btn-sm-btn w-100'
                  >
                    {component.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {user === 'PREGNANCY_CARE' && <PDashboard />}
      {user === 'HUMAN_RESOURCE' && <HRDashboard />}
    </div>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Home)), { ssr: false })
