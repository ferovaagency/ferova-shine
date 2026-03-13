interface AdBannerProps {
  slot?: string;
  className?: string;
}

const ads = {
  'sidebar': {
    href: 'https://www.hostgator.la/7531-6-1-1592.html',
    src: 'https://latam-files.hostgator.com/es/afiliados/webhosting/160x600.png',
    width: 160,
    height: 600,
    alt: 'HostGator Web Hosting',
  },
  'horizontal-hg': {
    href: 'https://www.hostgator.la/7531-6-1-1598.html',
    src: 'https://latam-files.hostgator.com/es/afiliados/webhosting/970x90.png',
    width: 970,
    height: 90,
    alt: 'HostGator Web Hosting',
  },
  'horizontal-divi': {
    href: 'https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=81483_5_1_20',
    src: 'https://www.elegantthemes.com/affiliates/media/banners/divi_728x90.jpg',
    width: 728,
    height: 90,
    alt: 'Divi WordPress Theme',
  },
};

const horizontalKeys = ['horizontal-hg', 'horizontal-divi'] as const;

const AdBanner = ({ slot = 'default', className = '' }: AdBannerProps) => {
  // Pick ad based on slot
  let ad;
  if (slot === 'sidebar') {
    ad = ads['sidebar'];
  } else {
    // Rotate between horizontal ads based on slot name hash
    const idx = slot.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % horizontalKeys.length;
    ad = ads[horizontalKeys[idx]];
  }

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-border/30 ${className}`} data-ad-slot={slot}>
      <a href={ad.href} target="_blank" rel="nofollow noopener noreferrer" className="block w-full">
        <img
          src={ad.src}
          width={ad.width}
          height={ad.height}
          alt={ad.alt}
          loading="lazy"
          className="mx-auto max-w-full h-auto"
          style={{ border: 0 }}
        />
      </a>
    </div>
  );
};

export default AdBanner;
