import React, { useState, useRef, useLayoutEffect } from "react"
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react"
import gsap from "gsap"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const formRef = useRef(null)
  const successMessageRef = useRef(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)

    // GSAP animation for success
    const tl = gsap.timeline()
    tl.to(formRef.current, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
      setShowSuccessMessage(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } })
      .fromTo(successMessageRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      )
      .to(successMessageRef.current, { opacity: 0, y: 20, duration: 0.5, delay: 2, onComplete: () => setShowSuccessMessage(false) })
    
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600">Let's discuss opportunities and collaborate on exciting projects</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:saphalchudal29@gmail.com" className="text-gray-600 hover:text-blue-600">
                    saphalchudal29@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <a href="tel:+9779823661805" className="text-gray-600 hover:text-green-600">
                    +977 9823661805
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">Biratchowk, Nepal</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with me</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/saphalchudal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/saphal29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Quick Response Promise</h3>
              <p className="text-gray-600 text-sm">
                I typically respond to messages within 24 hours. For urgent matters, feel free to call me directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {showSuccessMessage && (
              <div ref={successMessageRef} className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg text-center flex items-center justify-center gap-2">
                <Send size={20} />
                Message Sent Successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}