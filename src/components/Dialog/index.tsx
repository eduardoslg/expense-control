import { cn } from '@/lib/utils'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

type DialogProps = {
  open: boolean
  onOpenChange: () => void
  onAction: () => void
  title?: string
  description: string
  actionText: string
  cancelText?: string
  type: 'danger' | 'normal'
}

export function Dialog({
  open,
  onOpenChange,
  onAction,
  title,
  description,
  actionText,
  cancelText,
  type,
}: DialogProps) {
  function checkTypes() {
    if (type === 'danger') {
      return 'bg-destructive hover:bg-destructive-hover'
    }

    return ''
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || 'Você tem certeza?'}</AlertDialogTitle>
          <AlertDialogDescription>{description || ''}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel>{cancelText ?? 'Cancelar'}</AlertDialogCancel>
          )}

          <AlertDialogAction
            className={cn(checkTypes(), 'dark:text-white')}
            onClick={onAction}
          >
            {actionText || 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
