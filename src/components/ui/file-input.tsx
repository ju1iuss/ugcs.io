import { forwardRef } from 'react'

interface FileInputProps {
  onFileSelect: (file: File) => void
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput({ onFileSelect }, ref) {
    return (
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onFileSelect(file)
            // Reset input value to allow selecting the same file again
            e.target.value = ''
          }
        }}
      />
    )
  }
)

FileInput.displayName = 'FileInput'

export { FileInput } 