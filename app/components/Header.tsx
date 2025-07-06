'use client'
import React, { useEffect, useState } from 'react'

const NEXT_STREAM_DATE = new Date('2025-07-07T10:00:00+02:00') // Set your next stream date/time here

function getTimeRemaining(target: Date) {
    const total = target.getTime() - new Date().getTime()
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    return { total, days, hours, minutes, seconds }
}

export const Header = () => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(NEXT_STREAM_DATE))
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        // Set isClient to true once the component has mounted on the client
        setIsClient(true)
        
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(NEXT_STREAM_DATE))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative z-[3] h-full flex flex-col justify-center items-center text-white text-center px-4 w-full overflow-x-hidden">
            <h1
                className="text-4xl md:text-6xl font-bold drop-shadow-lg md:w-2/3 animate-fade-in"
                style={{ animation: 'fadeInDown 1s ease' }}
            >
                Evangelical Lutheran Church in South Africa
                <br />
            </h1>
            <p
                className="mt-4 text-lg md:text-2xl animate-fade-in"
                style={{ animation: 'fadeInUp 1.5s ease' }}
            >
                Central diocese Prayer Youth League
            </p>
            <div
                className="mt-6 animate-fade-in"
                style={{ animation: 'fadeIn 1.8s ease' }}
            >
                {!isClient ? (
                    // Show a placeholder during SSR to prevent hydration mismatch
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4">
                        <span className="text-xl md:text-2xl font-bold">Loading countdown...</span>
                    </div>
                ) : timeLeft.total > 0 ? (
                    <>
                        <p className="text-lg md:text-xl font-medium mb-4">Next stream starts in</p>
                        <div className="flex flex-wrap justify-center gap-2  md:gap-4">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 min-w-[70px] text-center">
                                <div className="text-2xl md:text-3xl font-bold">{timeLeft.days}</div>
                                <div className="text-xs md:text-sm uppercase tracking-wide opacity-80">Days</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 min-w-[70px] text-center">
                                <div className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</div>
                                <div className="text-xs md:text-sm uppercase tracking-wide opacity-80">Hours</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 min-w-[70px] text-center">
                                <div className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</div>
                                <div className="text-xs md:text-sm uppercase tracking-wide opacity-80">Minutes</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 min-w-[70px] text-center">
                                <div className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</div>
                                <div className="text-xs md:text-sm uppercase tracking-wide opacity-80">Seconds</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-lg px-6 py-4">
                        <span className="text-xl md:text-2xl font-bold text-green-100">The stream is live or starting soon!</span>
                    </div>
                )}
            </div>
            <a
                href="/stream"
                className="mt-8 px-6 py-2 bg-gradient-to-r from-[#2f3a82] to-[#e1c575] text-white font-semibold rounded-full shadow-md transition-transform duration-200 hover:scale-105 hover:from-[#e1c575] hover:to-[#2f3a82] border border-white/20 animate-fade-in inline-block text-center"
                style={{
                    animation: 'fadeIn 2s ease',
                }}
            >
                Stream Now
            </a>
            <style jsx>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                .animate-fade-in {
                    animation-fill-mode: both;
                }
            `}</style>
        </div>
    )
}
