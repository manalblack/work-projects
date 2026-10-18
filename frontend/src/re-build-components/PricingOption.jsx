// PriceOption.jsx
import { useLanguage } from '../hooks/LanguageContext';
import { buildWhatsAppLink } from '../whtsapp';

export default function PriceOption({ tourName, price, packageType, currency}) {
  const { lang, isRtl } = useLanguage();
//   const price = option.price.toLocaleString('en-US') || 1700; // Western digits in both languages

  const href = buildWhatsAppLink(lang, {
    // tour: tour.title || 
    tour: tourName,
    // label: option.label ||
    label: packageType,
    price: price,
    // currency: option.currency || 
    currency: currency,
  });

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="price-option bg-forestGreen text-white px-3 py-0.5 text-xs rounded-full border border-forestGreen hover:bg-white hover:text-forestGreen active:scale-85 transition-all duration-300 ease-in-out">
      <span>
        {/* {option.label} */}
        {/* {packageType} */}
      </span>
      <strong>
        {/* {price} {option.currency} */}
        {isRtl ? 'احجز' : 'book'}
    </strong>
    </a>
  );
}