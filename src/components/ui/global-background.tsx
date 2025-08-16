'use client'

interface GlobalBackgroundProps {
  gradientColors?: {
    from: string
    to: string
  }
}

export function GlobalBackground({ 
  gradientColors = {
    from: "oklch(0.7 0.15 280)", // Purple
    to: "oklch(0.6 0.2 320)"    // Magenta
  }
}: GlobalBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Continuous gradient pattern that extends the hero's design */}
      
      {/* Top-left gradient cluster */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 transform-gpu overflow-hidden blur-3xl sm:-top-80 sm:-left-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[36.125rem] max-w-none rotate-[30deg] opacity-30 sm:w-[72.1875rem]"
        />
      </div>

      {/* Top-right gradient cluster */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 transform-gpu overflow-hidden blur-3xl sm:-top-80 sm:-right-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[36.125rem] max-w-none -rotate-[30deg] opacity-20 sm:w-[72.1875rem]"
        />
      </div>

      {/* Center-left gradient cluster */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-20 transform-gpu overflow-hidden blur-3xl sm:-left-40"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[36.125rem] max-w-none rotate-[15deg] opacity-25 sm:w-[72.1875rem]"
        />
      </div>

      {/* Center-right gradient cluster */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-20 transform-gpu overflow-hidden blur-3xl sm:-right-40"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[36.125rem] max-w-none -rotate-[15deg] opacity-20 sm:w-[72.1875rem]"
        />
      </div>

      {/* Bottom-left gradient cluster */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-40 transform-gpu overflow-hidden blur-3xl sm:-left-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[36.125rem] max-w-none rotate-[45deg] opacity-30 sm:w-[72.1875rem]"
        />
      </div>

      {/* Bottom-right gradient cluster */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 -right-40 transform-gpu overflow-hidden blur-3xl sm:-right-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[36.125rem] max-w-none -rotate-[45deg] opacity-25 sm:w-[72.1875rem]"
        />
      </div>

      {/* Additional floating gradients for seamless coverage */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[24rem] max-w-none rotate-[60deg] opacity-15 sm:w-[48rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute top-3/4 right-1/4 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative aspect-[1155/678] w-[24rem] max-w-none -rotate-[60deg] opacity-15 sm:w-[48rem]"
        />
      </div>
    </div>
  )
}

export type { GlobalBackgroundProps } 