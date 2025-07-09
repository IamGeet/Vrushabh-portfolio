"use client"

import { useInView } from "react-intersection-observer"
import { GraduationCap, Calendar } from "lucide-react"

interface EducationProps {
  data: {
    degree: string
    institution: string
    percentage: string
    duration: string
    secondary: {
      institution: string
      percentage: string
      duration: string
    }
  }
}

export default function Education({ data }: EducationProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="education" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Education</span>
          </h2>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Undergraduate Degree</h3>
                  <p className="text-xl text-gray-400 mb-2">{data.degree}</p>
                  <p className="text-lg text-gray-300 mb-3">{data.institution}</p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-400">{data.duration}</span>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {data.percentage}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Higher Secondary Certificate</h3>
                  <p className="text-xl text-gray-400 mb-2">{data.secondary.degree}</p>
                  <p className="text-lg text-gray-300 mb-3">{data.secondary.institution}</p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-400">{data.secondary.duration}</span>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {data.secondary.percentage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
