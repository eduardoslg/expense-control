import { useFormContext } from 'react-hook-form'

import { twMerge } from 'tailwind-merge'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'

interface TextAreaProps {
  name: string
  label?: string
  placeholder?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function TextArea({
  name,
  className,
  disabled,
  label,
  placeholder,
}: TextAreaProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <>{!!label && <FormLabel>{label}</FormLabel>}</>

          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={twMerge(
                'resize-none selection:bg-blue-100',
                className,
              )}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
