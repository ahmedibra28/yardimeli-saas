import Navigation from './Navigation'
import Head from 'next/head'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>SaaS</title>
        <meta property='og:title' content='SaaS' key='title' />
      </Head>
      <Navigation />
      <main className='container py-2'>{children}</main>
      <Footer />
    </>
  )
}
