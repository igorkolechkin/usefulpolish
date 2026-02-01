import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import clsx from 'clsx'

export default forwardRef(function TextInput({
  type = 'text',
  className = '',
  isFocused = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }, ref) {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [isFocused])

  return (
    <input
      { ...props }
      type={ type }
      className={ clsx(
        'rounded-md border-gray-300 shadow-sm active:border-indigo-500 active:ring-indigo-500',
        className
      ) }
      ref={ localRef }
    />
  )
})
