"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import {
  Bot,
  Shield,
  BarChart3,
  Code,
  ExternalLink,
  Clock,
  Cpu,
  Layers,
  Settings,
  CheckCircle,
  Users,
  Zap,
  Target,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import SectionAnimations from "@/components/section-animations"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectsProps {
  data: Array<{
    name: string
    description: string
    technologies: string[]
    features: string[]
    demoUrl?: string
    resumeData?: {
      technology?: string
      role?: string
      complexity?: string
      maxFreq?: string
      tools?: string
      responsibilities?: string[]
      challenges?: string[]
      achievements?: Array<{ metric: string; label: string }>
    }
  }>
}

// Update project icons for ASIC engineering projects
const projectIcons = {
  "Networking Chip (DPU) - 7nm TSMC": Shield,
  "Networking Chip (DPU) - 5nm TSMC": Shield,
  "ASIC Physical Design Training Projects": Code,
  "Power Analysis Research - 7nm Technology": BarChart3,
}

export default function Projects({ data }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Helper function to check if a field has meaningful data
  const hasData = (value: any) => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === "string") return value !== "—" && value.trim() !== ""
    return value != null
  }

  const handleProjectClick = (index: number) => {
    setSelectedProject(selectedProject === index ? null : index)
  }

  return (
    <SectionAnimations sectionId="projects">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
      `}</style>
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
            </h2>

            <div className="space-y-8">
              {data.map((project, index) => {
                const IconComponent = projectIcons[project.name as keyof typeof projectIcons] || Bot
                const isSelected = selectedProject === index
                const resumeData = project.resumeData || {}

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="group relative"
                  >
                    {/* Background glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                      {/* Project Card Header */}
                      <div
                        className="p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer"
                        onClick={() => handleProjectClick(index)}
                      >
                        {/* Header with icon and title */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                              <IconComponent className="text-white" size={28} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                                {project.name}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                              {isSelected ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-white mb-6 leading-relaxed text-base">{project.description}</p>

                        {/* Key Features - Only show if features exist */}
                        {project.features && project.features.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                              <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                              Key Features
                            </h4>
                            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                              {project.features.slice(0, 5).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-start group/feature">
                                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover/feature:bg-cyan-300 transition-colors"></div>
                                  <span className="text-sm text-gray-300 group-hover/feature:text-gray-200 transition-colors">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                              {project.features.length > 5 && (
                                <div className="text-sm text-gray-500 italic pl-6">
                                  +{project.features.length - 5} more advanced features...
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Technologies - Only show if technologies exist */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 6).map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-400/30 hover:border-purple-400/50 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 6 && (
                                <span className="text-xs text-gray-500 px-3 py-1.5 bg-gray-700/30 rounded-lg border border-gray-600/30">
                                  +{project.technologies.length - 6}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <button className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                            <ExternalLink size={16} className="mr-2" />
                            {isSelected ? "Hide Details" : "View Details"}
                          </button>
                          <div className="flex items-center text-xs text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            Click to {isSelected ? "collapse" : "expand"}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Project Details */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="border-t border-white/10 bg-white/5"
                          >
                            <div className="p-8 space-y-8">
                              {/* Project Overview - Only show if we have meaningful data */}
                              {(hasData(resumeData.technology) ||
                                hasData(resumeData.role) ||
                                hasData(resumeData.complexity) ||
                                hasData(resumeData.maxFreq) ||
                                hasData(resumeData.tools)) && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <Target className="text-blue-400 mr-3" size={20} />
                                    Project Overview
                                  </h3>

                                  <div className="grid md:grid-cols-2 gap-6">
                                    {/* Technical Specifications */}
                                    <div className="space-y-4">
                                      {hasData(resumeData.technology) && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center">
                                            <Cpu className="mr-2" size={16} />
                                            Technology
                                          </h4>
                                          <p className="text-gray-300">{resumeData.technology}</p>
                                        </div>
                                      )}

                                      {hasData(resumeData.role) && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                                            <Users className="mr-2" size={16} />
                                            Role
                                          </h4>
                                          <p className="text-gray-300">{resumeData.role}</p>
                                        </div>
                                      )}

                                      {hasData(resumeData.complexity) && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center">
                                            <Layers className="mr-2" size={16} />
                                            Design Complexity
                                          </h4>
                                          <p className="text-gray-300">{resumeData.complexity}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="space-y-4">
                                      {hasData(resumeData.maxFreq) && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-orange-400 mb-2 flex items-center">
                                            <Clock className="mr-2" size={16} />
                                            Max Clock Freq.
                                          </h4>
                                          <p className="text-gray-300 font-mono">{resumeData.maxFreq}</p>
                                        </div>
                                      )}

                                      {hasData(resumeData.tools) && (
                                        <div>
                                          <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center">
                                            <Settings className="mr-2" size={16} />
                                            Tools
                                          </h4>
                                          <p className="text-gray-300">{resumeData.tools}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Responsibilities - Only show if we have data */}
                              {hasData(resumeData.responsibilities) && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <CheckCircle className="text-green-400 mr-3" size={20} />
                                    Key Responsibilities
                                  </h3>

                                  <div className="space-y-3">
                                    {resumeData.responsibilities?.map((responsibility: string, respIndex: number) => (
                                      <div key={respIndex} className="flex items-start">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <p className="text-white leading-relaxed text-sm">{responsibility}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Challenges - Only show if we have data */}
                              {hasData(resumeData.challenges) && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Zap className="text-yellow-400 mr-3" size={20} />
                                    Challenges Faced and Resolved
                                  </h3>

                                  <div className="space-y-4">
                                    {resumeData.challenges?.map((challenge: string, challengeIndex: number) => (
                                      <div key={challengeIndex} className="flex items-start">
                                        <div className="w-6 h-6 bg-yellow-500/20 border border-yellow-400/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                          <span className="text-yellow-400 font-bold text-xs">
                                            {challengeIndex + 1}
                                          </span>
                                        </div>
                                        <p className="text-white leading-relaxed text-sm">{challenge}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Key Achievements - Only show if we have data */}
                              {hasData(resumeData.achievements) && (
                                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6">
                                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <AlertTriangle className="text-blue-400 mr-3" size={20} />
                                    Key Achievements
                                  </h3>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {resumeData.achievements?.map((achievement: any, achIndex: number) => (
                                      <div key={achIndex} className="text-center p-4 bg-white/5 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-400 mb-1">
                                          {achievement.metric}
                                        </div>
                                        <div className="text-xs text-gray-400">{achievement.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </SectionAnimations>
  )
}
