import Image from 'next/image'
import Card from './components/Card'
import FramingBox from './components/FramingBox'
export default function Home() {
  return (
    <main className='bg-white flex flex-row justify-center p-8'>
      <FramingBox>
        <Card />

      </FramingBox>
    </main>
  )
}
