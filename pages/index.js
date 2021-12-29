import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className='flex'>
        <Sidebar/>
        <Center/>
      </main>
      <div>
        {/* Player */}
      </div>

      
    </div>
  )
}
//pre render the user so we have the access token before it hits the client
export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props:{
      session
    }
  }
}