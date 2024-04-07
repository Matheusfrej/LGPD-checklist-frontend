/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

function useOutsideAlerter(ref: any) {
  const [clickedOutside, setClickedOutside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
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
