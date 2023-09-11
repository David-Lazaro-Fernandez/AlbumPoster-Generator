import Image from "next/image"
import { formatDate } from "@/app/services/formatDate"
import { AlbumData, Track } from "@/app/interfaces/albumData"
import { getToken } from "@/app/services/getToken"
import ColorPalette from '../ColorPalette'

async function getAlbum() {
    const ID = '4Uv86qWpGTxf7fU7lG5X6F'
    const ENDPOINT = 'https://api.spotify.com/v1/albums/'
    const TOKEN = await getToken()
    try {
        const data = await fetch('https://api.spotify.com/v1/albums/3D9NENGfg4DFmYJrEaxRHd', {
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

export default async function Card() {
    const album = await getAlbum()
    console.log(album)
    const albumData: AlbumData = {
        name: album.name,
        artist: album.artists[0].name,
        ref: album.href,
        image: album.images[0].url,
        tracks: album.tracks.items,
        totalTracks: album.tracks.total,
        releaseDate: formatDate(album.release_date),
        uri: album.uri
    }
    const third = Math.ceil(albumData.totalTracks / 3);
    let totalDuration = 0
    return (
        <section className="flex flex-col text-gray-900 gap-5 m-10">
            <article className="flex justify-center">
                <Image width={400} height={400} src={albumData.image} alt="NextJS" />
            </article>
            <article>
                <h1 className=" text-6xl font-bold">{albumData.name}</h1>
                <h1 className=" text-3xl font-medium">{albumData.artist}</h1>
            </article>
            <article >
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col flex-1 leading-8 text-sm">
                        {albumData.tracks.slice(0, third).map((track: Track, index: number) => {
                            totalDuration += track.duration_ms
                            return (
                                <div key={index + 1} className="flex flex-row">
                                    <p>{`${index + 1}  ${track.name}`}</p>

                                </div>
                            )
                        })}
                    </div>

                    <div className="flex flex-col flex-1 leading-8 text-sm">
                        {albumData.tracks.slice(third, third * 2).map((track: Track, index: number) => {
                            totalDuration += track.duration_ms
                            return (
                                <div key={index + 1} className="flex flex-row">
                                    <p>{`${index + third + 1}  ${track.name}`}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex flex-col flex-1 leading-8 text-sm">
                        {albumData.tracks.slice(third * 2).map((track: Track, index: number) => {
                            totalDuration += track.duration_ms
                            return (
                                <div key={index + third * 2 + 1} className="flex flex-row">
                                    <p>{`${index + third * 2 + 1}  ${track.name}`}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </article>
            <article className="flex flex-row">
                <div className="flex-1 text-2xl font-bold">
                    <Image width={360} height={90} src={`https://scannables.scdn.co/uri/plain/png/ffffff/black/640/${albumData.uri}`} alt="Spotify Code" />
                </div>
                <div className="flex-1 flex-col text-left">
                    <h1 className='text-2xl font-bold'>Run Time:</h1>
                    <p>{`${albumData.totalTracks} songs ${Math.floor(totalDuration / 60000)} min`}</p>
                </div>
                <div className="flex-1 flex-col text-right">
                    <h1 className='text-2xl font-bold'>Release Date:</h1>
                    <p>{albumData.releaseDate}</p>
                </div>
            </article>
            <ColorPalette imgSrc={albumData.image} />

        </section>
    )
}
