'use client'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export default function FormTextarea({ label, error, className = '', ...props }: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={props.id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      <textarea
        {...props}
        className={`${className} text-sm placeholder:text-gray-500`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}
