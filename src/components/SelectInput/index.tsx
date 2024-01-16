import { HTMLInputTypeAttribute } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface SelectInputProps {
  name: string
  label?: string
  placeholder?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  type?: HTMLInputTypeAttribute
  options: {
    value: number | string
    label: string
  }[]
}

export function SelectInput({
  name,
  label,
  placeholder,
  onChange,
  disabled,
  options,
}: SelectInputProps) {
  const { control } = useFormContext()

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <>{!!label && <FormLabel>{label}</FormLabel>}</>

            <Select
              onValueChange={(value) => {
                field.onChange(value)

                if (onChange) {
                  onChange(value)
                }
              }}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl className="flex ">
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="flex overflow-auto h-72">
                {options?.map((item: any) => {
                  return (
                    <SelectItem key={item.label} value={String(item.value)}>
                      {item.label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
