import { useState, useEffect, useRef } from 'react'
import banner from '../../../src/assets/images/banner-2mb.jpeg'
import banner2 from '../../../src/assets/images/empty-cart.jpeg'

const Banner = () => {
  const images = [banner, banner2]
  const cloned = [images[images.length - 1], ...images, images[0]]

  const [current, setCurrent] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const startX = useRef(null)
  const containerRef = useRef(null)

  // Auto-slide
  useEffect(() => {
    if (isDragging) return
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setCurrent(prev => prev + 1)
    }, 3000)
    return () => clearInterval(timer)
  }, [isDragging])

  // Infinite loop jump
  useEffect(() => {
    if (current === cloned.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrent(1)
      }, 500)
    }
    if (current === 0) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrent(images.length)
      }, 500)
    }
  }, [current])

  const activeDot =
    current === cloned.length - 1 ? 0
    : current === 0 ? images.length - 1
    : current - 1

  // --- Touch handlers ---
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
    setIsDragging(true)
    setIsTransitioning(false)
  }

  const handleTouchMove = (e) => {
    if (startX.current === null) return
    const diff = e.touches[0].clientX - startX.current
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    finishDrag()
  }

  // --- Mouse handlers ---
  const handleMouseDown = (e) => {
    startX.current = e.clientX
    setIsDragging(true)
    setIsTransitioning(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || startX.current === null) return
    const diff = e.clientX - startX.current
    setDragOffset(diff)
  }

  const handleMouseUp = () => {
    finishDrag()
  }

  // --- Shared finish logic ---
  const finishDrag = () => {
    const threshold = 50 // min px to count as a swipe
    setIsTransitioning(true)
    if (dragOffset < -threshold) {
      setCurrent(prev => prev + 1) // swipe left → next
    } else if (dragOffset > threshold) {
      setCurrent(prev => prev - 1) // swipe right → prev
    }
    setDragOffset(0)
    setIsDragging(false)
    startX.current = null
  }

  const containerWidth = containerRef.current?.offsetWidth || 0

  return (
    <div className="flex flex-col items-center shrink-0 px-4 sm:px-6 md:px-8 py-6 md:py-8">

      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // cancel if mouse leaves
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
            transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
          }}
        >
          {cloned.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i}`}
              draggable={false} // prevent browser default image drag
              className="w-full h-auto object-fill max-h-125 md:max-h-150 shrink-0"
              style={{ minWidth: '100%' }}
            />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsTransitioning(true)
              setCurrent(i + 1)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeDot === i ? 'w-5 bg-black' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

    </div>
  )
}

export default Banner