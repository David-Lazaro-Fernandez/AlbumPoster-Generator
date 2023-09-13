import Image from 'next/image'
import Card from './components/Card'
import FramingBox from './components/FramingBox'
import { AlbumData } from "@/app/interfaces/albumData"
import { formatDate } from './services/formatDate'
import { getToken } from "@/app/services/getToken"

async function getAlbum() {
  const ID = '4Uv86qWpGTxf7fU7lG5X6F'
  const ENDPOINT = 'https://api.spotify.com/v1/albums/'
  const TOKEN = await getToken()
  try {
    const data = await fetch('https://api.spotify.com/v1/albums/58ufpQsJ1DS5kq4hhzQDiI', {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TOKEN}`
      },
    })
    const album = await data.json()
    return album
  }
  catch (error) {
    console.log(error)
  }

}

export default async function Home() {
  const album = await getAlbum()
  const albumData: AlbumData = {
    name: album.name,
    artist: album.artists[0].name,
    ref: album.href,
    image: album.images[0].url,
    tracks: album.tracks.items,
    totalTracks: album.tracks.total,
    releaseDate: formatDate(album.release_date),
    uri: album.uri,
  }

  return (
    <main className='bg-white flex flex-row justify-center p-8'>
      <FramingBox>
        <Card albumData={albumData}/>
      </FramingBox>
    </main>
  )
}
