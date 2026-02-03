import clsx from 'clsx'

type PropsType = {
  message: string;
  type?: 'success' | 'notice' | 'error';
}

export default function FloatPrompt({ message, type = 'success' }: PropsType) {
  return (
    <div className={ clsx(
      'absolute top-5 left-1/2 -translate-x-1/2 w-[350] z-20 px-5 py-4 bg-white rounded-md shadow-lg border',
      type === 'success' && 'border-green-500 text-green-700',
      type === 'notice' && 'border-gray-200',
      type === 'error' && 'border-red-500'
    ) }>
      <span className="text-sm">
        { message }
      </span>
    </div>
  )
}