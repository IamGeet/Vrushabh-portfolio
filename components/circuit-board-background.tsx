"use client"

import { useEffect, useState, useCallback, useRef } from "react"

const isFiniteNumber = (n: number) => Number.isFinite(n)

export default function CircuitBoardBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 })
  const [currentSection, setCurrentSection] = useState("home")

  const lastSectionUpdate = useRef(0)
  const lastMouseUpdate = useRef(0)

  // Safe window size detection
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMouseUpdate.current > 32) {
      setMousePosition({ x: e.clientX, y: e.clientY })
      lastMouseUpdate.current = now
    }
  }, [])

  // Scroll tracking and section detection
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    setScrollY(scrollPosition)

    const now = Date.now()
    if (now - lastSectionUpdate.current > 200) {
      const sections = ["home", "about", "education", "skills", "experience", "projects", "contact"]
      const viewportHeight = window.innerHeight

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.2) {
            setCurrentSection(sectionId)
            lastSectionUpdate.current = now
            break
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleMouseMove, handleScroll])

  // Generate main circuit pathways
  const generateCircuitPaths = () => {
    const paths = []
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    // Main horizontal pathways
    for (let i = 0; i < 8; i++) {
      const y = (windowSize.height / 8) * i + windowSize.height / 16
      const segments = []

      // Create segmented paths with gaps (like real circuit traces)
      for (let x = 0; x < windowSize.width; x += 120) {
        const segmentEnd = Math.min(x + 80, windowSize.width)
        segments.push({
          x1: x,
          y1: y + Math.sin(x * 0.01 + scrollY * 0.001) * 3,
          x2: segmentEnd,
          y2: y + Math.sin(segmentEnd * 0.01 + scrollY * 0.001) * 3,
        })
      }

      paths.push({
        segments,
        id: `h-path-${i}`,
        opacity: 0.08,
        strokeWidth: i % 2 === 0 ? 1 : 0.5,
      })
    }

    // Main vertical pathways
    for (let i = 0; i < 12; i++) {
      const x = (windowSize.width / 12) * i + windowSize.width / 24
      const segments = []

      for (let y = 0; y < windowSize.height; y += 100) {
        const segmentEnd = Math.min(y + 70, windowSize.height)
        segments.push({
          x1: x + Math.cos(y * 0.01 + scrollY * 0.001) * 2,
          y1: y,
          x2: x + Math.cos(segmentEnd * 0.01 + scrollY * 0.001) * 2,
          y2: segmentEnd,
        })
      }

      paths.push({
        segments,
        id: `v-path-${i}`,
        opacity: 0.06,
        strokeWidth: 0.5,
      })
    }

    // Radial pathways from center (like CPU traces)
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const length = Math.min(windowSize.width, windowSize.height) * 0.4

      paths.push({
        segments: [
          {
            x1: centerX,
            y1: centerY,
            x2: centerX + Math.cos(angle) * length,
            y2: centerY + Math.sin(angle) * length,
          },
        ],
        id: `radial-${i}`,
        opacity: 0.04,
        strokeWidth: 0.5,
      })
    }

    return paths
  }

  // Generate circuit components (chips, resistors, etc.)
  const generateCircuitComponents = () => {
    const components = []

    // Central processor (main chip)
    components.push({
      type: "processor",
      x: windowSize.width / 2,
      y: windowSize.height / 2,
      width: 40,
      height: 40,
      id: "main-cpu",
      opacity: 0.12,
    })

    // Smaller chips distributed around
    const chipPositions = [
      { x: windowSize.width * 0.2, y: windowSize.height * 0.3 },
      { x: windowSize.width * 0.8, y: windowSize.height * 0.3 },
      { x: windowSize.width * 0.2, y: windowSize.height * 0.7 },
      { x: windowSize.width * 0.8, y: windowSize.height * 0.7 },
      { x: windowSize.width * 0.5, y: windowSize.height * 0.15 },
      { x: windowSize.width * 0.5, y: windowSize.height * 0.85 },
    ]

    chipPositions.forEach((pos, i) => {
      components.push({
        type: "chip",
        x: pos.x,
        y: pos.y,
        width: 20 + Math.random() * 10,
        height: 15 + Math.random() * 8,
        id: `chip-${i}`,
        opacity: 0.08,
      })
    })

    // Small components (resistors, capacitors)
    for (let i = 0; i < 25; i++) {
      components.push({
        type: "component",
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        width: 4 + Math.random() * 6,
        height: 2 + Math.random() * 4,
        id: `comp-${i}`,
        opacity: 0.05,
      })
    }

    return components
  }

  // Generate connection nodes
  const generateConnectionNodes = () => {
    const nodes = []

    // Intersection points where paths meet
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        radius: 1 + Math.random() * 2,
        id: `node-${i}`,
        opacity: 0.1,
      })
    }

    return nodes
  }

  // Generate glowing traces (animated)
  const generateGlowingTraces = () => {
    const traces = []
    const time = scrollY * 0.01

    // Animated flowing traces
    for (let i = 0; i < 5; i++) {
      const progress = ((time + i * 0.5) % 4) / 4
      const startX = windowSize.width * 0.1
      const endX = windowSize.width * 0.9
      const y = windowSize.height * (0.2 + i * 0.15)

      const currentX = startX + (endX - startX) * progress

      traces.push({
        x: currentX,
        y: y,
        length: 60,
        id: `glow-${i}`,
        opacity: 0.15 * Math.sin(progress * Math.PI),
      })
    }

    return traces
  }

  const circuitPaths = generateCircuitPaths()
  const components = generateCircuitComponents()
  const nodes = generateConnectionNodes()
  const glowingTraces = generateGlowingTraces()

  // Section-specific subtle color themes
  const getSectionTheme = () => {
    const themes = {
      home: { primary: "rgba(59, 130, 246, 0.12)", secondary: "rgba(147, 197, 253, 0.08)" },
      about: { primary: "rgba(16, 185, 129, 0.10)", secondary: "rgba(110, 231, 183, 0.06)" },
      education: { primary: "rgba(139, 92, 246, 0.11)", secondary: "rgba(196, 181, 253, 0.07)" },
      skills: { primary: "rgba(251, 146, 60, 0.10)", secondary: "rgba(253, 186, 116, 0.06)" },
      experience: { primary: "rgba(239, 68, 68, 0.09)", secondary: "rgba(252, 165, 165, 0.05)" },
      projects: { primary: "rgba(59, 130, 246, 0.12)", secondary: "rgba(147, 197, 253, 0.08)" },
      contact: { primary: "rgba(236, 72, 153, 0.10)", secondary: "rgba(251, 207, 232, 0.06)" },
    }
    return themes[currentSection as keyof typeof themes] || themes.home
  }

  const theme = getSectionTheme()

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          {/* Subtle glow filter */}
          <filter id="circuitGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Circuit pattern */}
          <pattern id="circuitPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="transparent" />
            <circle cx="30" cy="30" r="0.5" fill={theme.primary} opacity="0.3" />
            <line x1="0" y1="30" x2="60" y2="30" stroke={theme.primary} strokeWidth="0.3" opacity="0.2" />
            <line x1="30" y1="0" x2="30" y2="60" stroke={theme.primary} strokeWidth="0.3" opacity="0.2" />
          </pattern>

          {/* Gradient for glowing effects */}
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={theme.primary} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Subtle grid pattern background */}
        <rect width="100%" height="100%" fill="url(#circuitPattern)" opacity="0.3" />

        {/* Main circuit pathways */}
        {circuitPaths.map((path) =>
          path.segments
            .filter(
              (segment) =>
                isFiniteNumber(segment.x1) &&
                isFiniteNumber(segment.y1) &&
                isFiniteNumber(segment.x2) &&
                isFiniteNumber(segment.y2),
            )
            .map((segment, segIndex) => (
              <line
                key={`${path.id}-${segIndex}`}
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={theme.primary}
                strokeWidth={path.strokeWidth}
                opacity={path.opacity}
              />
            )),
        )}

        {/* Circuit components */}
        {components
          .filter((comp) => isFiniteNumber(comp.x) && isFiniteNumber(comp.y))
          .map((comp) => {
            if (comp.type === "processor") {
              return (
                <g key={comp.id}>
                  <rect
                    x={comp.x - comp.width / 2}
                    y={comp.y - comp.height / 2}
                    width={comp.width}
                    height={comp.height}
                    fill="none"
                    stroke={theme.primary}
                    strokeWidth="1"
                    opacity={comp.opacity}
                    rx="2"
                  />
                  <rect
                    x={comp.x - comp.width / 4}
                    y={comp.y - comp.height / 4}
                    width={comp.width / 2}
                    height={comp.height / 2}
                    fill={theme.primary}
                    opacity={comp.opacity * 0.5}
                    rx="1"
                  />
                </g>
              )
            } else if (comp.type === "chip") {
              return (
                <rect
                  key={comp.id}
                  x={comp.x - comp.width / 2}
                  y={comp.y - comp.height / 2}
                  width={comp.width}
                  height={comp.height}
                  fill="none"
                  stroke={theme.secondary}
                  strokeWidth="0.5"
                  opacity={comp.opacity}
                  rx="1"
                />
              )
            } else {
              return (
                <circle
                  key={comp.id}
                  cx={comp.x}
                  cy={comp.y}
                  r={comp.width / 2}
                  fill={theme.secondary}
                  opacity={comp.opacity}
                />
              )
            }
          })}

        {/* Connection nodes */}
        {nodes
          .filter((node) => isFiniteNumber(node.x) && isFiniteNumber(node.y))
          .map((node) => (
            <circle key={node.id} cx={node.x} cy={node.y} r={node.radius} fill={theme.primary} opacity={node.opacity} />
          ))}

        {/* Animated glowing traces */}
        {glowingTraces
          .filter((trace) => isFiniteNumber(trace.x) && isFiniteNumber(trace.y))
          .map((trace) => (
            <line
              key={trace.id}
              x1={trace.x - trace.length / 2}
              y1={trace.y}
              x2={trace.x + trace.length / 2}
              y2={trace.y}
              stroke="url(#glowGradient)"
              strokeWidth="2"
              opacity={trace.opacity}
              filter="url(#circuitGlow)"
            />
          ))}

        {/* Mouse interaction effect */}
        {isHovered && isFiniteNumber(mousePosition.x) && isFiniteNumber(mousePosition.y) && (
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="100"
            fill="none"
            stroke={theme.primary}
            strokeWidth="1"
            opacity="0.1"
          />
        )}
      </svg>

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/3 to-black/8 pointer-events-none" />

      {/* Section-specific subtle overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-2000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.primary} 0%, transparent 60%)`,
        }}
      />

      {/* Text readability overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  )
}
