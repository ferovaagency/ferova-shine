import { useEffect, useRef, useState, type CSSProperties } from "react";

const message = "Tu backlog no necesita otro salario fijo. Necesita la capacidad correcta cuando hay trabajo por entregar.";

export default function AgencyTaglineReveal() {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={rootRef} className={`agency-tagline-copy ${visible ? "is-visible" : ""}`} aria-label={message}>
      {message.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true" style={{ "--word-index": index } as CSSProperties}>{word}{" "}</span>
      ))}
    </p>
  );
}
