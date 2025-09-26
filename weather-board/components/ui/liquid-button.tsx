import React from 'react'
import { cn } from '@/lib/utils'

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  children: React.ReactNode
}

export function LiquidButton({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}: LiquidButtonProps) {
  return (
    <button
      className={cn(
        'liquid-button relative inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white hover:from-blue-500/30 hover:to-purple-500/30 shadow-lg hover:shadow-xl': variant === 'default',
          'bg-gradient-to-r from-white/10 to-white/5 text-white/90 hover:from-white/20 hover:to-white/10': variant === 'secondary',
          'border border-white/20 bg-transparent text-black dark:text-blue-200 hover:bg-white/10': variant === 'outline',
          'hover:bg-white/10 text-black dark:text-blue-200 hover:text-white': variant === 'ghost',
        },
        {
          'h-9 px-3 text-xs': size === 'sm',
          'h-10 px-4 py-2': size === 'default',
          'h-11 px-8 text-base': size === 'lg',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}