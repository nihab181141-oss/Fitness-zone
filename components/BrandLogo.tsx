import React from 'react'
import Image from 'next/image'

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'modal' | 'hero' | 'compact'
  className?: string
  showText?: boolean
  linkToTop?: boolean
}

export default function BrandLogo({
  variant = 'header',
  className = '',
  showText = true,
  linkToTop = true,
}: BrandLogoProps) {
  // Dimension settings per variant for the centered transparent emblem
  const sizeMap = {
    header: { width: 70, height: 36, imgClass: 'brand-logo-img-header' },
    footer: { width: 84, height: 43, imgClass: 'brand-logo-img-footer' },
    modal: { width: 64, height: 33, imgClass: 'brand-logo-img-modal' },
    hero: { width: 96, height: 49, imgClass: 'brand-logo-img-hero' },
    compact: { width: 48, height: 25, imgClass: 'brand-logo-img-compact' },
  }

  const { width, height, imgClass } = sizeMap[variant] || sizeMap.header

  const content = (
    <div className={`brand-identity-wrap brand-${variant} ${className}`}>
      <div className={`brand-logo-frame ${imgClass}-frame`}>
        <Image
          src="/images/fitness-zone-logo.png"
          alt="Fitness Zone Rajshahi Official Logo"
          width={width}
          height={height}
          priority={variant === 'header'}
          className={`brand-logo-img ${imgClass}`}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {showText && (
        <div className="brand-text-block">
          <div className="brand-name-title">
            <span>FITNESS</span> ZONE<span className="dot">.</span>
          </div>
          <span className="brand-sub-badge">Rajshahi · Dual Branch</span>
        </div>
      )}
    </div>
  )

  if (linkToTop) {
    return (
      <a
        href="#top"
        className="brand-logo-link"
        aria-label="Fitness Zone Rajshahi Home"
      >
        {content}
      </a>
    )
  }

  return content
}
