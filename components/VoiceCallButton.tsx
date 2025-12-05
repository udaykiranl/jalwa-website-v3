
import React from 'react';
import { Phone } from 'lucide-react';

const VoiceCallButton: React.FC = () => {
  return (
    <a
      href="tel:+15513054339"
      className="fixed bottom-6 left-6 z-50 p-4 bg-jalwa-gold text-black rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group flex items-center justify-center border-2 border-black/10"
      aria-label="Call to Order"
      title="Call for AI Ordering"
    >
      {/* Pulsing Ring Animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-jalwa-gold opacity-75 animate-ping -z-10"></span>
      
      {/* Icon */}
      <div className="relative z-10">
        <Phone size={24} fill="currentColor" />
      </div>
    </a>
  );
};

export default VoiceCallButton;
