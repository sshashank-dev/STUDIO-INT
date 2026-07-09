import Lenis from 'lenis'
import { useEffect } from 'react'

export const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            wheelMultiplier: 1.1,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Sync with any CSS-based scroll animations
        lenis.on('scroll', () => {
            document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
        })

        return () => {
            lenis.destroy()
        }
    }, [])
}