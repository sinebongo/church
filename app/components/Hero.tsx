import React from 'react'
import { Header } from './Header'

export const Hero = () => {
    return (
        <div className="relative h-[100vh] w-full overflow-x-hidden overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
                src="/video.mp4"
            />
            <div className="absolute top-0 left-0 w-full h-full z-[2] bg-gradient-to-b from-[#2f3a82b3] to-[#2f3a84] opacity-80" />
            <Header />
        </div>
    )
}
