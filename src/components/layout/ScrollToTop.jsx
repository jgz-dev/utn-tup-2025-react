import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top when pathname changes
export default function ScrollToTop({ behavior = 'auto' }) {
  const { pathname } = useLocation()
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior })
    } catch {
      window.scrollTo(0, 0)
    }
  }, [pathname, behavior])
  return null
}
