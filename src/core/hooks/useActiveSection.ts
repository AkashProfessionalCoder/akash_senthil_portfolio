import { useEffect } from 'react'
import { useUIStore } from '@app/store/uiStore'

export const useActiveSection = (sectionIds: string[], options?: IntersectionObserverInit) => {
  const setActiveSection = useUIStore((state) => state.setActiveSection)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -50% 0px', // Triggers when the section is in the upper half of screen
        ...options,
      }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [sectionIds, setActiveSection, options])
}
