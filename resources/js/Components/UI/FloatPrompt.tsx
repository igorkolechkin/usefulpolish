import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { PropsMessageType } from '@/types/ui'

export default function FloatPrompt({ text, type }: PropsMessageType) {
  const [ isOpen, setIsOpen ] = useState(true)

  useEffect(() => {
    setIsOpen(true)

    const timer = setTimeout(() => {
      setIsOpen(false)
    }, 5 * 1000)

    return () => clearTimeout(timer)
  }, [text])

  if (!text) return null

  return (
    <>
      <Transition
        appear={ true }
        show={isOpen}
        enter="transition transform duration-500 ease-out"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition transform duration-500 ease-out"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className={ clsx(
          'absolute top-5 left-1/2 -translate-x-1/2 max-w-[350px] z-20 px-5 py-4 bg-white rounded-md border',
          type === 'success' && 'border-green-500 text-green-700 shadow-md shadow-green-300',
          type === 'notice' && 'border-gray-400 text-gray-500',
          type === 'error' && 'border-red-700 text-red-700 shadow-md shadow-red-300'
        ) }>
          <span className="text-sm">
            { text }
          </span>

          <XMarkIcon
            onClick={ () => setIsOpen(false) }
            className="size-5 absolute top-1 right-1 text-gray-500 cursor-pointer transition-opacity hover:opacity-70"
          />
        </div>
      </Transition>
    </>
  )
}