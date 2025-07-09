"use client"

import { useInView } from "react-intersection-observer"
import { Brain, MessageCircle, Users, Clock, Lightbulb, Shield } from "lucide-react"
import SectionAnimations from "@/components/section-animations"

interface SkillsProps {
  data: {
    technical: string[]
    soft: string[]
    languages: string[]
    certifications: string[]
  }
}

const softSkillIcons = {
  Creativity: Lightbulb,
  Communication: MessageCircle,
  Teamwork: Users,
  "Meeting deadlines": Clock,
  "Critical thinking": Brain,
  Resilience: Shield,
}

export default function Skills({ data }: SkillsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <SectionAnimations sectionId="skills">
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Skills</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Technical Skills */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 text-center">ASIC Design Tools</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">Synopsys ICC2</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">Fusion Compiler</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">Prime Time</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">Calibre</span>
                  </div>
                </div>
              </div>

              {/* Technology Nodes */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Technology Nodes</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">TSMC 5nm</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">TSMC 7nm</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">90nm Technology</span>
                  </div>
                </div>
              </div>

              {/* Scripting & OS */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Scripting & OS</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">TCL</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">Shell</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">Perl</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 p-3 rounded-lg text-center">
                    <span className="text-gray-300 font-medium">Linux/Windows</span>
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Professional Skills</h3>
                <div className="space-y-3">
                  {data.soft.map((skill, index) => {
                    const IconComponent = softSkillIcons[skill as keyof typeof softSkillIcons] || Brain
                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-pink-500/20 to-red-600/20 p-3 rounded-lg flex items-center space-x-2"
                      >
                        <IconComponent size={16} className="text-pink-400" />
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionAnimations>
  )
}
