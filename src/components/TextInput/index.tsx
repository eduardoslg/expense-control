import { HTMLInputTypeAttribute } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface TextInputProps {
  name: string
  label?: string
  placeholder?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  type?: HTMLInputTypeAttribute
}

export function TextInput({
  name,
  label,
  placeholder,
  onChange,
  disabled,
  className,
  type,
}: TextInputProps) {
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
            <Input
              {...field}
              value={field?.value ?? ''}
              placeholder={placeholder}
              onChange={(value) => {
                field.onChange(value)

                if (onChange) {
                  onChange(value.target.value)
                }
              }}
              disabled={disabled}
              className={className}
              type={type}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
