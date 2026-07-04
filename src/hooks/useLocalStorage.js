import { useEffect, useState } from 'react'

// Generic localStorage hook — works for any key/value, not tied to quiz data.
// Returns [value, setValue] just like useState, but the value is persisted
// to localStorage and restored on the next page load.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore write errors (storage full, disabled, private mode, etc.)
    }
  }, [key, value])

  return [value, setValue]
}
