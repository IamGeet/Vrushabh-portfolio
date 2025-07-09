"use client"

import { useState, useEffect } from "react"
import ErrorBoundary from "@/components/error-boundary"
import Hero from "@/components/hero"
import About from "@/components/about"
import Education from "@/components/education"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import WelcomeScreen from "@/components/welcome-screen"
import { portfolioData } from "@/lib/portfolio-data"

// Dynamically import all animation components with no SSR
import dynamic from "next/dynamic"

// Updated to use the new ASIC circuit background
const AnimatedBackground = dynamic(() => import("@/components/animated-background"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />,
})

const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => null,
})

export default function PortfolioClient() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    setTimeout(() => setIsLoaded(true), 500)
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Portfolio...</p>
        </div>
      </div>
    )
  }

  if (showWelcome) {
    return (
      <ErrorBoundary>
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative">
        {/* Animated Background - Client Side Only */}
        {isMounted && <AnimatedBackground />}

        {/* Three.js Scene - Client Side Only */}
        {isMounted && <ThreeScene />}

        <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <Navigation />
          <Hero data={portfolioData.personal} />
          <About data={portfolioData.about} />
          <Education data={portfolioData.education} />
          <Skills data={portfolioData.skills} />
          <Experience data={portfolioData.experience} />
          <Projects data={portfolioData.projects} />
          <Contact data={portfolioData.contact} />
        </div>
      </div>
    </ErrorBoundary>
  )
}
