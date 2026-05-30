import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const experiences = [
  {
    category: 'Dining',
    icon: '🍽️',
    title: 'World-Class Dining',
    desc: 'Indulge in curated culinary journeys crafted by award-winning chefs. From rooftop fine dining to intimate candlelit dinners.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    highlights: ['In-room dining 24/7', 'Rooftop restaurants', 'Live cooking stations', 'Vegan & dietary menus'],
  },
  {
    category: 'Wellness',
    icon: '🧘',
    title: 'Spa & Wellness',
    desc: 'Reconnect with yourself in our serene wellness sanctuaries. Experience ancient healing therapies and modern relaxation.',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
    highlights: ['Full-body massages', 'Aromatherapy', 'Yoga & meditation', 'Infinity pools'],
  },
  {
    category: 'Adventure',
    icon: '🏄',
    title: 'Curated Adventures',
    desc: 'From sunrise mountain treks to sunset boat cruises, every adventure is tailored to create unforgettable memories.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    highlights: ['Guided city tours', 'Water sports', 'Mountain trekking', 'Cultural experiences'],
  },
  {
    category: 'Events',
    icon: '🎊',
    title: 'Private Events',
    desc: 'Host intimate celebrations or grand events in our exquisite venues designed for the most memorable occasions.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    highlights: ['Wedding packages', 'Corporate events', 'Birthday celebrations', 'Private rooftop parties'],
  },
]

const amenities = [
  { icon: '🛎️', name: 'Concierge Service' },
  { icon: '🚗', name: 'Valet Parking' },
  { icon: '✈️', name: 'Airport Transfer' },
  { icon: '🏊', name: 'Infinity Pool' },
  { icon: '💪', name: 'Fitness Center' },
  { icon: '📶', name: 'High-Speed WiFi' },
  { icon: '🧺', name: 'Laundry Service' },
  { icon: '🔒', name: '24/7 Security' },
]

const testimonials = [
  {
    name: 'Ananya R.',     city: 'Mumbai',
    text: 'The spa experience was absolutely transcendent. I have never felt so rejuvenated in my life. QuickStay exceeded every expectation.',
    rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
  },
  {
    name: 'Vikram S.',     city: 'Delhi',
    text: 'From the rooftop dining to the adventure excursions, every moment was perfectly curated. Will definitely be back!',
    rating: 5, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
  },
  {
    name: 'Meera P.',     city: 'Bangalore',
    text: 'Our wedding at QuickStay was a dream come true. The event team handled everything flawlessly. Pure magic.',
    rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
]

const Experience = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className='pt-20 text-gray-800'>

      {/* Hero */}
      <div className='relative h-80 md:h-[420px]
        bg-[url("https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400")]
        bg-cover bg-center flex items-center justify-center'>
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative text-center text-white px-4'>
          <p className='bg-[#49B9FF]/50 px-4 py-1 rounded-full text-sm inline-block mb-4'>Beyond a Room</p>
          <h1 className='font-playfair text-4xl md:text-6xl font-bold'>The QuickStay Experience</h1>
          <p className='mt-4 text-gray-300 max-w-xl mx-auto text-sm md:text-base'>
            Every stay is a story. Let us write an unforgettable one for you.
          </p>
        </div>
      </div>

      {/* Tabbed Experiences */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-20'>
        <div className='text-center mb-10'>
          <p className='text-[#49B9FF] font-medium uppercase tracking-widest text-sm'>What We Offer</p>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold mt-2'>Curated Experiences</h2>
        </div>

        {/* Tab Buttons */}
        <div className='flex flex-wrap justify-center gap-3 mb-10'>
          {experiences.map((exp, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${activeTab === i ? 'bg-black text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
              {exp.icon} {exp.category}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className='flex flex-col lg:flex-row gap-10 items-center'>
          <div className='lg:w-1/2'>
            <img src={experiences[activeTab].img} alt={experiences[activeTab].title}
              className='rounded-2xl shadow-xl w-full h-80 object-cover' />
          </div>
          <div className='lg:w-1/2'>
            <p className='text-[#49B9FF] text-sm uppercase tracking-widest'>{experiences[activeTab].category}</p>
            <h3 className='font-playfair text-3xl font-bold mt-2'>{experiences[activeTab].title}</h3>
            <p className='text-gray-500 mt-4 leading-relaxed'>{experiences[activeTab].desc}</p>
            <ul className='mt-6 space-y-3'>
              {experiences[activeTab].highlights.map((h, i) => (
                <li key={i} className='flex items-center gap-3 text-sm text-gray-700'>
                  <span className='h-2 w-2 rounded-full bg-[#49B9FF] inline-block' />
                  {h}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/rooms')}
              className='mt-8 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all'>
              Book This Experience
            </button>
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className='bg-black text-white px-6 md:px-16 lg:px-24 xl:px-32 py-20'>
        <div className='text-center mb-12'>
          <p className='text-[#49B9FF] font-medium uppercase tracking-widest text-sm'>Everything Included</p>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold mt-2'>World-Class Amenities</h2>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6'>
          {amenities.map((a, i) => (
            <div key={i} className='border border-gray-700 rounded-2xl p-6 text-center
              hover:border-[#49B9FF] hover:bg-gray-900 transition-all duration-300'>
              <p className='text-4xl mb-3'>{a.icon}</p>
              <p className='text-sm font-medium text-gray-300'>{a.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-20 bg-gray-50'>
        <div className='text-center mb-12'>
          <p className='text-[#49B9FF] font-medium uppercase tracking-widest text-sm'>Guest Stories</p>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold mt-2'>What Our Guests Say</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((t, i) => (
            <div key={i} className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all'>
              <div className='flex items-center gap-3 mb-4'>
                <img src={t.img} alt={t.name}
                  className='h-12 w-12 rounded-full object-cover' />
                <div>
                  <p className='font-semibold text-sm'>{t.name}</p>
                  <p className='text-gray-400 text-xs'>{t.city}</p>
                </div>
              </div>
              <div className='flex gap-1 mb-3'>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className='text-yellow-400 text-sm'>★</span>
                ))}
              </div>
              <p className='text-gray-500 text-sm leading-relaxed italic'>"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-20 text-center'>
        <h2 className='font-playfair text-3xl md:text-5xl font-bold'>
          Start Your <span className='text-[#49B9FF]'>QuickStay</span> Journey
        </h2>
        <p className='text-gray-500 mt-4 max-w-lg mx-auto'>
          Thousands of travellers have discovered their perfect stay. Your unforgettable experience is just one click away.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
          <button onClick={() => navigate('/rooms')}
            className='bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800 transition-all'>
            Browse Rooms
          </button>
          <button onClick={() => navigate('/about')}
            className='border border-black text-black px-10 py-3 rounded-full hover:bg-gray-50 transition-all'>
            Learn About Us
          </button>
        </div>
      </div>

    </div>
  )
}

export default Experience