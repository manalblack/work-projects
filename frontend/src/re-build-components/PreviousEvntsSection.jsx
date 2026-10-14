import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Award, ExternalLink, X, ArrowRight, ArrowLeft, Tag } from 'lucide-react';


/* 
  TODO: 
  
  1- Create the event description modal 
  2-change the text in the array below
  3- change the hero image in rhe founder page


*/

// Sample Past Events Data
const PAST_EVENTS = [
  {
    id: 'past-1',
    year: '2025',
    title: {
      en: 'Black Light 1',
      ar: 'فعالية الأضواء السوداء'
    },
    category: {
      en: 'Entertainment',
      ar: 'ترفيه'
    },
    date: {
      en: 'FEB , 2025',
      ar: '2025 فبراير'
    },
    location: {
      en: 'Kano, Nigeria',
      ar: 'كانو، نيجيريا'
    },
    attendees: '1,500+',
    // speakersCount: '45',
    image: '/black-lights-event1.jpeg',
    summary: {
      en: 'Step into a night where everything glows. Enjoy neon colors, glow-in-the-dark art, live music, and dancing under black lights, with great company and a lively atmosphere.',
      ar: 'ادخل إلى ليلة يتوهج فيها كل شيء. استمتع بالألوان النيون، والفن المضيء في الظلام، والموسيقى الحية، والرقص تحت الأضواء السوداء، في أجواء مليئة بالحيوية والمرح.'
    },
    keyTakeaways: {
      en: ['One night. Neon colors. Music and dancing under the black lights.'],
      ar: ['ليلة واحدة. ألوان نيون. موسيقى ورقص تحت الأضواء السوداء.']
    }
  },
  {
    id: 'past-2',
    year: '2025',
    title: {
      en: 'Black Light 2',
      ar:  'الأضواء السوداء 2'
    },
    category: {
      en: 'Entertainment',
      ar: 'ترفيه'
    },
    date: {
      en: 'Aug 2025',
      ar: 'اغسطس 2025'
    },
    location: {
      en: 'Kano, Nigeria',
      ar: 'كانو، نيجيريا'
    },
    attendees: '800+',
    speakersCount: '28',
    image: '/black-lights-event2.png',
    summary: {
      en: 'The night everyone loved is back, bigger and brighter. Enjoy more neon colors, glowing decorations, live music, and dancing under the black lights, with new surprises along the way.',
      ar: 'الليلة التي أحبها الجميع تعود من جديد، بشكل أكبر وأكثر إشراقًا. استمتع بمزيد من الألوان النيون، والديكورات المضيئة، والموسيقى الحية، والرقص تحت الأضواء السوداء، مع مفاجآت جديدة في انتظارك.'
    },
    keyTakeaways: {
      en: ["Back for round two. More glow, more music, more fun."],
      ar: ['نعود لجولة ثانية. توهج أكبر، وموسيقى أكثر، ومتعة أكثر.']
    }
  },
  {
    id: 'past-3',
    year: '2024',
    title: {
      en: 'Horror Zone',
      ar: 'منطقة الرعب'
    },
    category: {
      en: 'Entertainment',
      ar: 'ترفيه'
    },
    date: {
      en: 'MAY, 2024',
      ar: 'مايو 2024'
    },
    location: {
      en: 'Kano, Nigeria',
      ar: 'كانو، نيجيريا'
    },
    attendees: '650+',
    speakersCount: '20',
    image: '/horror-zone-event.png',
    summary: {
      en: 'Step into a night of fear and fun. Walk through dark rooms, meet scary characters, and enjoy spooky decorations, eerie music, and surprises around every corner, with friends who will scream with you.',
      ar: 'ادخل إلى ليلة من الخوف والمرح. امشِ عبر غرف مظلمة، وقابل شخصيات مرعبة، واستمتع بالديكورات المخيفة والموسيقى الغامضة والمفاجآت في كل زاوية، برفقة أصدقاء يصرخون معك.'
    },
    keyTakeaways: {
      en: ['Dark rooms. Scary surprises. A night you will not forget.'],
      ar: ['غرف مظلمة. مفاجآت مرعبة. ليلة لن تنساها']
    }
  },
   {
    id: 'past-4',
    year: '2026',
    title: {
      en: 'Above the cloud',
      ar: 'فوق السحاب'
    },
    category: {
      en: 'Entertainment',
      ar: 'ترفيه'
    },
    date: {
      en: 'JUN 2026',
      ar: 'يناير 2026'
    },
    location: {
      en: 'Kano, Nigeria',
      ar: 'كانو، نيجيريا'
    },
    attendees: '650+',
    speakersCount: '20',
    image: 'above-cloud-event.png',
    summary: {
      en: 'Step into a room that feels like the sky. Dress in white and light blue, and enjoy soft cloud decorations, good music, and a calm, elegant atmosphere with friends.',
      ar: 'ادخل إلى قاعة تشبه السماء. ارتدِ الأبيض والأزرق الفاتح، واستمتع بديكورات السحب الناعمة، والموسيقى الجميلة، وأجواء هادئة وأنيقة برفقة أصدقائك.'
    },
    keyTakeaways: {
      en: ['White and light blue dress code. Cloud decorations. One dreamy night.'],
      ar: ['الزي: أبيض وأزرق فاتح. ديكورات السحب. ليلة حالمة.']
    }
  },
   {
    id: 'past-5',
    year: '2024',
    title: {
      en: 'Epic Day Event',
      ar: 'يوم أسطوري'
    },
    category: {
      en: 'Entertainment',
      ar: 'ترفيه'
    },
    date: {
      en: 'JUN, 2024',
      ar: 'جون 2024'
    },
    location: {
      en: 'Kano, Nigeria',
      ar: 'كانو، نيجيريا'
    },
    attendees: '650+',
    speakersCount: '20',
    image: '/epic-day-event.png',
    summary: {
      en: 'A full day of laughter and fun. Enjoy live stand-up comedy, exciting games, and friendly competitions, all in a lively atmosphere where everyone can relax, laugh, and make great memories.',
      ar: 'يوم كامل من الضحك والمتعة. استمتع بعروض الكوميديا الحية، وألعاب مشوقة، ومسابقات ودية، في أجواء مليئة بالحيوية يمكن للجميع فيها الاسترخاء والضحك وصنع ذكريات رائعة.'
    },
    keyTakeaways: {
      en: ['Stand-up comedy. Fun and games. One epic day.',],
      ar: ['ستاند اب كوميدي. مرح وألعاب. يوم أسطوري واحد.']
    }
  },
  {
    id: 'past-6',
    year: '2024',
    title: {
      en: 'Space Day',
      ar: 'يوم الفضاء'
    },
    category: {
      en: 'Entertainment',
      ar: 'مالية'
    },
    date: {
      en: 'MAY, 2024',
      ar: '10 ديسمبر 2024'
    },
    location: {
      en: 'Kano, Nigeria',
      ar: 'أبوجا، نيجيريا'
    },
    attendees: '650+',
    speakersCount: '20',
    image: '/space-event.png',
    summary: {
      en: 'Travel to another world without leaving the room. Enjoy a space-themed setting with glowing stars, planets, and galaxy lights, along with great music, fun activities, and a night that feels out of this world.',
      ar: 'سافر إلى عالم آخر دون أن تغادر القاعة. استمتع بأجواء الفضاء مع النجوم المضيئة والكواكب وأضواء المجرات، إلى جانب الموسيقى الرائعة والأنشطة الممتعة وليلة تشبه عالمًا آخر.'
    },
    keyTakeaways: {
      en: ['Stars, planets, and galaxy lights. One night out of this world.'],
      ar: ['نجوم وكواكب وأضواء مجرات. ليلة من عالم آخر.']
    }
  }
];


export default function PreviousEventsSection({ isRtl = false }) {
  const [selectedYear, setSelectedYear] = useState('All');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const years = ['All', '2025', '2024'];

  const filteredEvents = selectedYear === 'All' 
    ? PAST_EVENTS 
    : PAST_EVENTS.filter(event => event.year === selectedYear);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forestGreen border border-white text-white text-xs font-semibold uppercase tracking-wider mb-3"
            >
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>{isRtl ? 'الفعاليات السابقة' : 'Previous events'}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-gold"
            >
              {isRtl ? 'الفعاليات السابقة' : 'Previous Events & Highlights'}
            </motion.h2>
          </div>

          {/* Year Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-neutral-200 shadow-xs self-start md:self-auto"
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-forestGreen text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {year === 'All' ? (isRtl ? 'الكل' : 'All') : year}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Events Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative md:h-70 h-120 overflow-hidden bg-neutral-200">
                  <img
                    src={event.image}
                    alt={event.title[isRtl ? 'ar' : 'en']}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-forestGreen text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {event.category[isRtl ? 'ar' : 'en']}
                  </span>

                  {/* Year Tag */}
                  <span className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {event.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Event Meta */}
                    <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{event.date[isRtl ? 'ar' : 'en']}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        <span>{event.location[isRtl ? 'ar' : 'en']}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-forestGreen group-hover:text-gold line-clamp-2 mb-3 transition-all duration-300 ease-in-out">
                      {event.title[isRtl ? 'ar' : 'en']}
                    </h3>

                    <p className="text-sm text-neutral-600 line-clamp-3 mb-6 leading-relaxed">
                      {event.summary[isRtl ? 'ar' : 'en']}
                    </p>
                  </div>

                  {/* Footer Stats & Button */}
                  <div>
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mb-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1 font-semibold text-neutral-700">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        {event.attendees} {isRtl ? 'حاضر' : 'Attendees'}
                      </span>
                      {/* <span>
                        {event.speakersCount} {isRtl ? 'متحدث' : 'Speakers'}
                      </span> */}
                    </div>

                    <button
                      onClick={() => setActiveModalEvent(event)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-forestGreen bg-forestGreen hover:bg-white shadow-md hover:text-forestGreen text-white text-xs font-bold transition-all group-hover:bg-white group-hover:text-forestGreen"
                    >
                      <span>{isRtl ? 'عرض الملخص والنتائج' : 'View Summary & Highlights'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Detailed View */}
        <AnimatePresence>
          {activeModalEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalEvent(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
              >
                {/* Modal Header Image */}
                <div className="relative h-95 md:h-95 bg-neutral-900">
                  <img
                    src={activeModalEvent.image}
                    alt={activeModalEvent.title[isRtl ? 'ar' : 'en']}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <button
                    onClick={() => setActiveModalEvent(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-md transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold mb-2">
                      {activeModalEvent.category[isRtl ? 'ar' : 'en']} • {activeModalEvent.year}
                    </span>
                    <h3 className="text-2xl font-bold">
                      {activeModalEvent.title[isRtl ? 'ar' : 'en']}
                    </h3>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                  {/* Meta Details */}
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-neutral-600 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>{activeModalEvent.date[isRtl ? 'ar' : 'en']}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span>{activeModalEvent.location[isRtl ? 'ar' : 'en']}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold" />
                      <span>{activeModalEvent.attendees} {isRtl ? 'مشارك' : 'Participants'}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      {isRtl ? 'عن الفعالية' : 'Event Overview'}
                    </h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {activeModalEvent.summary[isRtl ? 'ar' : 'en']}
                    </p>
                  </div>

                  {/* Highlights Bullet Points */}
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
                      {isRtl ? 'أبرز الإنجازات والنتائج' : 'Key Highlights & Outcomes'}
                    </h4>
                    <ul className="space-y-2">
                      {activeModalEvent.keyTakeaways[isRtl ? 'ar' : 'en'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-neutral-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-forestGreen mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Close Action */}
                  <div className="pt-4 border-t border-neutral-100 flex justify-end">
                    <button
                      onClick={() => setActiveModalEvent(null)}
                      className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                    >
                      {isRtl ? 'إغلاق' : 'Close'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}