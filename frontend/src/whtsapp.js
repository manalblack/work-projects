// whatsapp.js
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const FSI = '\u2068'; // First Strong Isolate
const PDI = '\u2069'; // Pop Directional Isolate
const iso = (value) => `${FSI}${value}${PDI}`;

const MESSAGES = {
  en: ({ tour, label, price, currency }) =>
    `Hello Troviesta, I’m interested in the “${tour}” tour (${label}) at ${price} ${currency}. Is it available?`,
  ar: ({ tour, label, price, currency }) =>
    `مرحباً تروفيستا، أرغب في حجز جولة «${iso(tour)}» (${iso(label)}) بسعر ${iso(price)}. هل هي متاحة؟`,
};

export function buildWhatsAppLink(lang, details) {
  const text = (MESSAGES[lang] || MESSAGES.en)(details);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}