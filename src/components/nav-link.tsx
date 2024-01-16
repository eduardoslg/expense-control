'use client'

import { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { twMerge } from 'tailwind-merge'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  const location = useLocation()

  const isActive = location.pathname === props.to

  return (
    <Link
      data-active={isActive}
      className={twMerge(
        'text-sm font-bold text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary',
        props.className,
      )}
      {...props}
    />
  )
}
