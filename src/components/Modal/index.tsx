import { ReactNode } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

type ModalProps = {
  open: boolean
  onOpenChange: () => void
  title?: string
  children: ReactNode
}

export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}
