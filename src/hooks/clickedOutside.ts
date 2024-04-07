import { RefObject, useEffect, useState } from 'react'

function useOutsideAlerter<T extends HTMLElement>(ref: RefObject<T>) {
  const [clickedOutside, setClickedOutside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setClickedOutside((state) => !state)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return { clickedOutside }
}

export { useOutsideAlerter }
