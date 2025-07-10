"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { useState } from "react"
import SectionAnimations from "@/components/section-animations"

interface ContactProps {
  data: {
    email: string
    phone: string
    location: string
  }
}

export default function Contact({ data }: ContactProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <SectionAnimations sectionId="contact">
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-black/20"
      >
        <div className="w-full flex justify-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center">
            <div className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
              Let's Connect
            </div>
            <p className="text-gray-200 text-lg leading-relaxed mb-8 text-center">
            I'm always open to discussing innovative VLSI projects, physical design challenges, or collaborating on ASIC implementation and chip design. Feel free to reach out to connect about technology, engineering, or new opportunities!
            </p>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-lg flex-shrink-0">
                  <Mail className="text-white" size={28} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white font-semibold break-all">Vrushabhvakhare22@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full shadow-lg flex-shrink-0">
                  <Phone className="text-white" size={28} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <p className="text-white font-semibold">+91 7383975075</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-full shadow-lg flex-shrink-0">
                  <MapPin className="text-white" size={28} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Location</p>
                  <p className="text-white font-semibold">Surat, Gujarat, India 394210</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-6 pt-8 justify-center">
              <button
                onClick={() => window.open("https://www.linkedin.com/in/vrushabh-vakhare-79081a18b/", "_blank")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Linkedin className="text-white" size={24} />
              </button>
              <button
                onClick={() => window.open("/Vrushabh-Vakhare-Resume.pdf", "_blank")}
                className="bg-gradient-to-r from-green-500 to-cyan-600 p-4 rounded-full hover:from-green-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
                title="View Resume"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white" width={24} height={24}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75v2.25A2.25 2.25 0 0114.25 8.25h-4.5A2.25 2.25 0 017.5 6V3.75M12 12v6m0 0l-2.25-2.25M12 18l2.25-2.25" />
                  <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="2.25" />
                </svg>
              </button>
              {/* <button className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <Github className="text-white" size={24} />
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-white/10 text-center">
        <p className="text-gray-400">© 2025 Vrushabh Vakhare.</p>
      </div>
    </SectionAnimations>
  )
}

