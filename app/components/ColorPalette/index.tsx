"use client"
import {Palette} from 'color-thief-react'
import { sortHexColors } from '@/app/services/sortColors'
interface ColorPaletteProps {
  imgSrc: string
}

export default function ColorPalette({ imgSrc }: ColorPaletteProps) {
  return (
    <Palette src={imgSrc} crossOrigin="anonymous" format="hex" colorCount={3}>
      {({ data, loading,}) => {
        if (loading) return <p>...Loading</p>;
        console.log(data?.join(','))
        const sortedColors = sortHexColors(data)
        return (
          data ? 
          <div style={{height:'20px', background:`linear-gradient(to right, ${data.join(", ")})`}}>

          </div>
          :null
          
        );
      }}
    </Palette>
  )
}
