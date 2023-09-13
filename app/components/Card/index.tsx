"use client"
import './svg.css'
import { useEffect, useState } from "react"
import Image from "next/image"
import { Track } from "@/app/interfaces/albumData"
import ColorPalette from '../ColorPalette'
import { CardProps } from "@/app/interfaces/Card"
import { getBottomCenterPixelColor } from "@/app/services/extractColors"
import { calculateLuminosity, hexToRgb } from "@/app/services/sortColors"

export default function Card({albumData}:CardProps) {
    

    const [bottomColor, setBottomColor] = useState<number[]>([]);
    const [darkText, setDarkText] = useState<number>(0);
    const [spotifyCode, setSpotifyCode] = useState<string>('');
    useEffect(() => {
        async function fetchColor() {
            try {
                const color = await getBottomCenterPixelColor(albumData.image);
                setBottomColor(color);
            } catch (error) {
                console.error('Error fetching the color:', error);
            }
        }

        fetchColor();
    }, [albumData.image]);
    
    useEffect(() => {
        setDarkText(calculateLuminosity(bottomColor))
        console.log('darktext',calculateLuminosity(bottomColor))        
    }, [bottomColor])

    useEffect(() => {
        async function fetchSpotifyCode(){
            const url = `https://scannables.scdn.co/uri/plain/svg/ffffff/${darkText > 0.5 ? 'black' : 'white'}/640/${albumData.uri}`
            console.log(url)
            const res = await fetch(url)
            const svg = await res.text()
            setSpotifyCode(svg)
        }

        fetchSpotifyCode()

    }, [darkText])


    const third = Math.ceil(albumData.totalTracks / 3);
    let totalDuration = 0
    return (
        <section className="flex flex-col text-gray-900 gap-10 p-10 shadow-inner" 
        style={
            {
                backgroundColor:`rgba(${bottomColor[0]},${bottomColor[1]},${bottomColor[2]},${bottomColor[3]})`, 
                color:`${darkText > 0.5 ? 'black' : 'white'}`}}
        >
            <article className="flex justify-center">
                <Image width={400} height={400} src={albumData.image} alt="NextJS" />
            </article>
            <article className="max-w-2xl">
                <h1 className="text-7xl font-bold">{albumData.name}</h1>
                <h1 className="text-3xl font-medium">{albumData.artist}</h1>
            </article>
            <article >
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col flex-1 leading-8 text-xl">
                        {albumData.tracks.slice(0, third).map((track: Track, index: number) => {
                            totalDuration += track.duration_ms
                            return (
                                <div key={index + 1} className="flex flex-row">
                                    <p>{`${index + 1}  ${track.name}`}</p>

                                </div>
                            )
                        })}
                    </div>

                    <div className="flex flex-col flex-1 leading-8 text-xl">
                        {albumData.tracks.slice(third, third * 2).map((track: Track, index: number) => {
                            totalDuration += track.duration_ms
                            return (
                                <div key={index + 1} className="flex flex-row">
                                    <p>{`${index + third + 1}  ${track.name}`}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex flex-col flex-1 leading-8 text-xl">
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
                <div className="flex-1 text-2xl font-bold" style={{marginLeft:'-10px'}}>
                    <div dangerouslySetInnerHTML={{ __html: spotifyCode }}/>
                </div>
                <div className="flex-1 flex items-center flex-col text-left">
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
