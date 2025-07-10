"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const welcomeMessages = [
  { text: "Hello", lang: "English" },
  { text: "வணக்கம்", lang: "Tamil" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "Hallo", lang: "German" },
  { text: "Ciao", lang: "Italian" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
  { text: "Привет", lang: "Russian" },
  { text: "مرحبا", lang: "Arabic" },
  { text: "Olá", lang: "Portuguese" },
  { text: "Hej", lang: "Swedish" },
  { text: "Hei", lang: "Norwegian" },
  { text: "Hej", lang: "Danish" },
  { text: "Hallo", lang: "Dutch" },
  { text: "Γεια σας", lang: "Greek" },
  { text: "Merhaba", lang: "Turkish" },
  { text: "שלום", lang: "Hebrew" },
]

interface WelcomeScreenProps {
  onComplete?: () => void
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Handle user interaction (keyboard or mouse)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!userInteracted) {
        setUserInteracted(true)
        setShowFinal(true)
        // Small delay before calling onComplete to show the final screen briefly
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    }

    const handleMouseClick = (event: MouseEvent) => {
      if (!userInteracted) {
        setUserInteracted(true)
        setShowFinal(true)
        // Small delay before calling onComplete to show the final screen briefly
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (!userInteracted) {
        setUserInteracted(true)
        setShowFinal(true)
        // Small delay before calling onComplete to show the final screen briefly
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    }

    // Add event listeners
    document.addEventListener("keydown", handleKeyPress)
    document.addEventListener("click", handleMouseClick)
    document.addEventListener("touchstart", handleTouchStart)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("click", handleMouseClick)
      document.removeEventListener("touchstart", handleTouchStart)
    }
  }, [userInteracted, onComplete])

  // Auto-progression through messages (only if user hasn't interacted)
  useEffect(() => {
    if (userInteracted) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < welcomeMessages.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            if (!userInteracted) {
              setShowFinal(true)
              // Auto-complete after showing all messages
              setTimeout(() => {
                onComplete?.()
              }, 2000)
            }
          }, 500)
          return prev
        }
      })
    }, 300)

    return () => clearInterval(interval)
  }, [userInteracted, onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center cursor-pointer">
      {/* Simple animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Skip instruction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        
      </motion.div>

      <div className="text-center relative z-10">
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-medium text-white tracking-normal font-system">
                {welcomeMessages[currentIndex]?.text}
              </h1>
              <p className="text-lg text-gray-400 font-normal tracking-normal font-system">
                {welcomeMessages[currentIndex]?.lang}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-white tracking-normal font-system"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Vrushabh Vakhare
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 font-normal tracking-normal font-system"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                ASIC Physical Design Portfolio
              </motion.p>
              <motion.div
                className="w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1 }}
              />

              {/* Loading indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex items-center justify-center space-x-2 mt-8"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

     
    </div>
  )
}
