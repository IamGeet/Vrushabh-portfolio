"use client"

import { useEffect, useState, useCallback, useRef } from "react"

const isFiniteNumber = (n: number) => Number.isFinite(n)

export default function AsicCircuitBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 })
  const [currentSection, setCurrentSection] = useState("home")
  const [animationTime, setAnimationTime] = useState(0)

  const lastSectionUpdate = useRef(0)
  const lastMouseUpdate = useRef(0)
  const animationRef = useRef<number>()

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setAnimationTime((prev) => prev + 0.016) // ~60fps
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Window size detection
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
    if (now - lastMouseUpdate.current > 16) {
      setMousePosition({ x: e.clientX, y: e.clientY })
      lastMouseUpdate.current = now
    }
  }, [])

  // Scroll tracking
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

  // Generate central processor
  const generateCentralProcessor = () => {
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2
    const size = 80

    return {
      x: centerX,
      y: centerY,
      size,
      pulseIntensity: 0.8 + Math.sin(animationTime * 2) * 0.2,
    }
  }

  // Generate radial circuit traces
  const generateCircuitTraces = () => {
    const traces = []
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2
    const numTraces = 24

    for (let i = 0; i < numTraces; i++) {
      const angle = (i / numTraces) * Math.PI * 2
      const length = Math.min(windowSize.width, windowSize.height) * 0.6
      const segments = []

      // Create segmented traces with gaps
      for (let j = 0; j < 8; j++) {
        const startDist = (j * length) / 8 + 40
        const endDist = startDist + length / 12

        if (endDist <= length) {
          const startX = centerX + Math.cos(angle) * startDist
          const startY = centerY + Math.sin(angle) * startDist
          const endX = centerX + Math.cos(angle) * endDist
          const endY = centerY + Math.sin(angle) * endDist

          // Add some organic curves
          const midX = (startX + endX) / 2 + Math.sin(animationTime + i * 0.5) * 5
          const midY = (startY + endY) / 2 + Math.cos(animationTime + i * 0.3) * 5

          segments.push({
            path: `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`,
            opacity: 0.6 + Math.sin(animationTime * 1.5 + i * 0.2) * 0.3,
            strokeWidth: 1.5 + Math.sin(animationTime + i) * 0.5,
          })
        }
      }

      traces.push({
        segments,
        id: `trace-${i}`,
        angle,
      })
    }

    return traces
  }

  // Generate connection nodes
  const generateConnectionNodes = () => {
    const nodes = []
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    // Radial nodes
    for (let ring = 1; ring <= 4; ring++) {
      const radius = ring * 120
      const nodeCount = ring * 8

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (x > 0 && x < windowSize.width && y > 0 && y < windowSize.height) {
          nodes.push({
            x,
            y,
            size: 2 + Math.sin(animationTime * 2 + i * 0.1) * 1,
            opacity: 0.7 + Math.sin(animationTime * 1.5 + i * 0.2) * 0.3,
            id: `node-${ring}-${i}`,
            pulseDelay: i * 0.1,
          })
        }
      }
    }

    // Random scattered nodes
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: 1 + Math.random() * 2,
        opacity: 0.4 + Math.sin(animationTime + i * 0.3) * 0.2,
        id: `random-node-${i}`,
        pulseDelay: i * 0.05,
      })
    }

    return nodes
  }

  // Generate data flow animations
  const generateDataFlows = () => {
    const flows = []
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const progress = ((animationTime * 0.5 + i * 0.2) % 2) / 2
      const distance = progress * Math.min(windowSize.width, windowSize.height) * 0.5

      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      flows.push({
        x,
        y,
        size: 3 + Math.sin(progress * Math.PI) * 2,
        opacity: Math.sin(progress * Math.PI) * 0.8,
        id: `flow-${i}`,
        trail: Array.from({ length: 5 }).map((_, j) => {
          const trailProgress = Math.max(0, progress - j * 0.05)
          const trailDistance = trailProgress * Math.min(windowSize.width, windowSize.height) * 0.5
          return {
            x: centerX + Math.cos(angle) * trailDistance,
            y: centerY + Math.sin(angle) * trailDistance,
            opacity: Math.sin(trailProgress * Math.PI) * 0.3 * (1 - j * 0.2),
            size: (3 + Math.sin(trailProgress * Math.PI) * 2) * (1 - j * 0.15),
          }
        }),
      })
    }

    return flows
  }

  // Generate circuit components (resistors, capacitors, etc.)
  const generateCircuitComponents = () => {
    const components = []
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    // Main components around the processor
    const componentPositions = [
      { x: centerX - 150, y: centerY - 100, type: "resistor" },
      { x: centerX + 150, y: centerY - 100, type: "capacitor" },
      { x: centerX - 150, y: centerY + 100, type: "chip" },
      { x: centerX + 150, y: centerY + 100, type: "inductor" },
      { x: centerX, y: centerY - 180, type: "memory" },
      { x: centerX, y: centerY + 180, type: "io" },
    ]

    componentPositions.forEach((pos, i) => {
      components.push({
        ...pos,
        id: `component-${i}`,
        opacity: 0.6 + Math.sin(animationTime * 0.8 + i * 0.5) * 0.2,
        scale: 1 + Math.sin(animationTime * 1.2 + i * 0.3) * 0.1,
      })
    })

    return components
  }

  // Get section-specific theme
  const getSectionTheme = () => {
    const themes = {
      home: {
        primary: "rgba(59, 130, 246, 0.8)",
        secondary: "rgba(147, 197, 253, 0.6)",
        accent: "rgba(219, 234, 254, 0.4)",
      },
      about: {
        primary: "rgba(16, 185, 129, 0.8)",
        secondary: "rgba(110, 231, 183, 0.6)",
        accent: "rgba(167, 243, 208, 0.4)",
      },
      education: {
        primary: "rgba(139, 92, 246, 0.8)",
        secondary: "rgba(196, 181, 253, 0.6)",
        accent: "rgba(221, 214, 254, 0.4)",
      },
      skills: {
        primary: "rgba(251, 146, 60, 0.8)",
        secondary: "rgba(253, 186, 116, 0.6)",
        accent: "rgba(254, 215, 170, 0.4)",
      },
      experience: {
        primary: "rgba(239, 68, 68, 0.8)",
        secondary: "rgba(252, 165, 165, 0.6)",
        accent: "rgba(254, 202, 202, 0.4)",
      },
      projects: {
        primary: "rgba(59, 130, 246, 0.8)",
        secondary: "rgba(147, 197, 253, 0.6)",
        accent: "rgba(219, 234, 254, 0.4)",
      },
      contact: {
        primary: "rgba(236, 72, 153, 0.8)",
        secondary: "rgba(251, 207, 232, 0.6)",
        accent: "rgba(252, 231, 243, 0.4)",
      },
    }
    return themes[currentSection as keyof typeof themes] || themes.home
  }

  const processor = generateCentralProcessor()
  const circuitTraces = generateCircuitTraces()
  const connectionNodes = generateConnectionNodes()
  const dataFlows = generateDataFlows()
  const components = generateCircuitComponents()
  const theme = getSectionTheme()

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          {/* Glowing effects */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <radialGradient id="processorGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.primary} />
            <stop offset="70%" stopColor={theme.secondary} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={theme.primary} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Circuit patterns */}
          <pattern id="circuitGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="transparent" />
            <circle cx="20" cy="20" r="0.5" fill={theme.accent} opacity="0.3" />
            <line x1="0" y1="20" x2="40" y2="20" stroke={theme.accent} strokeWidth="0.2" opacity="0.2" />
            <line x1="20" y1="0" x2="20" y2="40" stroke={theme.accent} strokeWidth="0.2" opacity="0.2" />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#circuitGrid)" opacity="0.4" />

        {/* Central processor */}
        {isFiniteNumber(processor.x) && isFiniteNumber(processor.y) && (
          <g>
            {/* Processor glow */}
            <circle
              cx={processor.x}
              cy={processor.y}
              r={processor.size * 1.5 * processor.pulseIntensity}
              fill="url(#processorGradient)"
              opacity="0.3"
              filter="url(#strongGlow)"
            />

            {/* Processor body */}
            <rect
              x={processor.x - processor.size / 2}
              y={processor.y - processor.size / 2}
              width={processor.size}
              height={processor.size}
              fill="none"
              stroke={theme.primary}
              strokeWidth="2"
              rx="8"
              opacity="0.9"
              filter="url(#glow)"
            />

            {/* Processor pins */}
            {Array.from({ length: 16 }).map((_, i) => {
              const side = Math.floor(i / 4)
              const pos = i % 4
              let x, y

              switch (side) {
                case 0: // top
                  x = processor.x - processor.size / 2 + (pos + 1) * (processor.size / 5)
                  y = processor.y - processor.size / 2 - 5
                  break
                case 1: // right
                  x = processor.x + processor.size / 2 + 5
                  y = processor.y - processor.size / 2 + (pos + 1) * (processor.size / 5)
                  break
                case 2: // bottom
                  x = processor.x - processor.size / 2 + (pos + 1) * (processor.size / 5)
                  y = processor.y + processor.size / 2 + 5
                  break
                case 3: // left
                  x = processor.x - processor.size / 2 - 5
                  y = processor.y - processor.size / 2 + (pos + 1) * (processor.size / 5)
                  break
                default:
                  x = processor.x
                  y = processor.y
              }

              return <rect key={i} x={x - 1} y={y - 1} width="2" height="2" fill={theme.secondary} opacity="0.8" />
            })}

            {/* Processor core */}
            <rect
              x={processor.x - processor.size / 4}
              y={processor.y - processor.size / 4}
              width={processor.size / 2}
              height={processor.size / 2}
              fill={theme.primary}
              opacity={0.6 * processor.pulseIntensity}
              rx="4"
            />
          </g>
        )}

        {/* Circuit traces */}
        {circuitTraces.map((trace) =>
          trace.segments.map((segment, segIndex) => (
            <path
              key={`${trace.id}-${segIndex}`}
              d={segment.path}
              stroke={theme.primary}
              strokeWidth={segment.strokeWidth}
              fill="none"
              opacity={segment.opacity}
              filter="url(#glow)"
            />
          )),
        )}

        {/* Connection nodes */}
        {connectionNodes
          .filter((node) => isFiniteNumber(node.x) && isFiniteNumber(node.y))
          .map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={theme.secondary}
              opacity={node.opacity}
              filter="url(#glow)"
            />
          ))}

        {/* Data flows */}
        {dataFlows
          .filter((flow) => isFiniteNumber(flow.x) && isFiniteNumber(flow.y))
          .map((flow) => (
            <g key={flow.id}>
              {/* Trail */}
              {flow.trail
                .filter((t) => isFiniteNumber(t.x) && isFiniteNumber(t.y))
                .map((trail, i) => (
                  <circle
                    key={i}
                    cx={trail.x}
                    cy={trail.y}
                    r={trail.size}
                    fill={theme.accent}
                    opacity={trail.opacity}
                  />
                ))}
              {/* Main flow */}
              <circle
                cx={flow.x}
                cy={flow.y}
                r={flow.size}
                fill={theme.primary}
                opacity={flow.opacity}
                filter="url(#glow)"
              />
            </g>
          ))}

        {/* Circuit components */}
        {components
          .filter((comp) => isFiniteNumber(comp.x) && isFiniteNumber(comp.y))
          .map((comp) => (
            <g key={comp.id} transform={`translate(${comp.x}, ${comp.y}) scale(${comp.scale})`}>
              {comp.type === "resistor" && (
                <rect
                  x="-8"
                  y="-3"
                  width="16"
                  height="6"
                  fill="none"
                  stroke={theme.secondary}
                  strokeWidth="1"
                  opacity={comp.opacity}
                />
              )}
              {comp.type === "capacitor" && (
                <g>
                  <line
                    x1="-6"
                    y1="-6"
                    x2="-6"
                    y2="6"
                    stroke={theme.secondary}
                    strokeWidth="2"
                    opacity={comp.opacity}
                  />
                  <line x1="6" y1="-6" x2="6" y2="6" stroke={theme.secondary} strokeWidth="2" opacity={comp.opacity} />
                </g>
              )}
              {comp.type === "chip" && (
                <rect
                  x="-10"
                  y="-6"
                  width="20"
                  height="12"
                  fill="none"
                  stroke={theme.secondary}
                  strokeWidth="1"
                  opacity={comp.opacity}
                  rx="2"
                />
              )}
              {comp.type === "memory" && (
                <g>
                  <rect
                    x="-12"
                    y="-8"
                    width="24"
                    height="16"
                    fill="none"
                    stroke={theme.secondary}
                    strokeWidth="1"
                    opacity={comp.opacity}
                    rx="2"
                  />
                  <line
                    x1="-8"
                    y1="-4"
                    x2="8"
                    y2="-4"
                    stroke={theme.secondary}
                    strokeWidth="0.5"
                    opacity={comp.opacity}
                  />
                  <line
                    x1="-8"
                    y1="0"
                    x2="8"
                    y2="0"
                    stroke={theme.secondary}
                    strokeWidth="0.5"
                    opacity={comp.opacity}
                  />
                  <line
                    x1="-8"
                    y1="4"
                    x2="8"
                    y2="4"
                    stroke={theme.secondary}
                    strokeWidth="0.5"
                    opacity={comp.opacity}
                  />
                </g>
              )}
            </g>
          ))}

        {/* Mouse interaction effect */}
        {isHovered && isFiniteNumber(mousePosition.x) && isFiniteNumber(mousePosition.y) && (
          <g>
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r="60"
              fill="none"
              stroke={theme.primary}
              strokeWidth="1"
              opacity="0.4"
              filter="url(#glow)"
            />
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r="30"
              fill="none"
              stroke={theme.secondary}
              strokeWidth="2"
              opacity="0.6"
            />
          </g>
        )}

        {/* Central bright glow */}
        {isFiniteNumber(windowSize.width / 2) && isFiniteNumber(windowSize.height / 2) && (
          <circle
            cx={windowSize.width / 2}
            cy={windowSize.height / 2}
            r="200"
            fill="url(#processorGradient)"
            opacity="0.1"
          />
        )}
      </svg>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.primary}08 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}
