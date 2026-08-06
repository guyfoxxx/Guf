import { Phone, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const emergency = process.env.NEXT_PUBLIC_PHONE_EMERGENCY ?? "09198814970";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? "989198814970";

  return (
    <div className="fixed bottom-5 left-5 z-30 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ارتباط از طریق واتساپ"
        className="flex size-12 items-center justify-center rounded-full bg-success text-white shadow-soft hover:scale-105 transition-transform"
      >
        <MessageCircle className="size-6" />
      </a>
      <a
        href={`tel:${emergency}`}
        aria-label="تماس اضطراری"
        className="flex size-12 items-center justify-center rounded-full bg-emergency text-white shadow-soft hover:scale-105 transition-transform animate-pulse"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
