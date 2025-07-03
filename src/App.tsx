import { Routes, Route, useLocation } from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./pages/Home"
import Skills from "./pages/Skills"
import Projects from "./pages/Projects"
import Blogs from "./pages/Blogs"
import Contact from "./pages/Contact"
import BlogDetail from "./pages/BlogDetail"
import React, { useRef, useLayoutEffect } from "react"
import gsap from "gsap"



export default function App() {
  const location = useLocation()
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      )
    }
  }, [location])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div ref={contentRef} className="relative">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}