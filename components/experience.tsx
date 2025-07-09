"use client"

import { useInView } from "react-intersection-observer"
import { Briefcase, Trophy, Calendar } from "lucide-react"
import SectionAnimations from "@/components/section-animations"

interface ExperienceProps {
  data: {
    internships: Array<{
      title: string
      company: string
      duration: string
    }>
    hackathons: string[]
  }
}

export default function Experience({ data }: ExperienceProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <SectionAnimations sectionId="experience">
      <section id="experience" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Internships */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Briefcase className="mr-3 text-blue-400" size={24} />
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  {data.internships.map((internship, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                    >
                      <h4 className="text-xl font-semibold text-white mb-2">{internship.title}</h4>
                      <p className="text-blue-400 mb-2">{internship.company}</p>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-400">{internship.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hackathons */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Trophy className="mr-3 text-yellow-400" size={24} />
                  Awards & Publications
                </h3>
                <div className="space-y-4">
                  {data.hackathons.map((hackathon, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                        <span className="text-gray-300 font-medium">{hackathon}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionAnimations>
  )
}
