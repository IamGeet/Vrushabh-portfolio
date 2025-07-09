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
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
              <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    I'm always open to discussing new opportunities, collaborations, or just having a chat about
                    technology and AI. Feel free to reach out!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">{data.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">{data.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">{data.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={() => window.open("https://www.linkedin.com/in/vrushabh-vakhare-79081a18b/", "_blank")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
                  >
                    <Linkedin className="text-white" size={20} />
                  </button>
                  <button className="bg-gradient-to-r from-gray-700 to-gray-800 p-3 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-110">
                    <Github className="text-white" size={20} />
                  </button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 resize-none"
                      placeholder="Your message..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">© 2024 Vrushabh Vakhare. Built with Next.js and Three.js</p>
        </div>
      </section>
    </SectionAnimations>
  )
}
