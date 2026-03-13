interface AdBannerProps {
  slot?: string;
  className?: string;
}

const AdBanner = ({ slot = 'default', className = '' }: AdBannerProps) => {
  return (
    <div className={`w-full rounded-xl overflow-hidden border border-border/30 ${className}`}>
      {/* Replace this div with actual ad code (Google AdSense, custom HTML banners, etc.) */}
      <div 
        className="w-full min-h-[90px] md:min-h-[120px] flex items-center justify-center text-muted-foreground/30 text-xs"
        style={{ background: 'hsla(243, 28%, 18%, 0.4)' }}
        data-ad-slot={slot}
      >
        {/* Ad Space - {slot} */}
      </div>
    </div>
  );
};

export default AdBanner;
