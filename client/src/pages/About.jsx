import React from 'react'
import { useNavigate } from 'react-router-dom'

const stats = [
  { number: '10K+', label: 'Happy Guests' },
  { number: '500+', label: 'Premium Rooms' },
  { number: '50+', label: 'Destinations' },
  { number: '15+', label: 'Years of Excellence' },
]

const team = [
  { name: 'Arjun Mehta',    role: 'Founder & CEO',         img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
  { name: 'Priya Sharma',   role: 'Head of Hospitality',   img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
  { name: 'Rohan Verma',    role: 'Operations Director',   img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
  { name: 'Sneha Kapoor',   role: 'Guest Relations Head',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
]

const values = [
  { icon: '🏆', title: 'Excellence',   desc: 'We set the highest standards in hospitality, ensuring every stay exceeds expectations.' },
  { icon: '🤝', title: 'Trust',        desc: 'Transparency and reliability are the foundation of every guest relationship we build.' },
  { icon: '🌿', title: 'Sustainability', desc: 'We are committed to eco-friendly practices that protect our planet for future generations.' },
  { icon: '💡', title: 'Innovation',   desc: 'We embrace technology and creativity to deliver seamless, modern booking experiences.' },
]

const About = () => {
  const navigate = useNavigate()

  return (
    <div className='pt-20 text-gray-800'>

      {/* Hero Banner */}
      <div className='relative h-80 md:h-[420px] bg-[url("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400")]
        bg-cover bg-center flex items-center justify-center'>
        <div className='absolute inset-0 bg-black/55' />
        <div className='relative text-center text-white px-4'>
          <p className='bg-[#49B9FF]/50 px-4 py-1 rounded-full text-sm inline-block mb-4'>Our Story</p>
          <h1 className='font-playfair text-4xl md:text-6xl font-bold'>About QuickStay</h1>
          <p className='mt-4 text-gray-300 max-w-xl mx-auto text-sm md:text-base'>
            Born from a passion for travel and a dream of making luxury accessible to everyone.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-20 flex flex-col lg:flex-row gap-12 items-center'>
        <div className='lg:w-1/2'>
          <p className='text-[#49B9FF] font-medium mb-2 uppercase tracking-widest text-sm'>Who We Are</p>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold leading-snug'>
            Redefining the Art of <br /> Hotel Booking
          </h2>
          <p className='text-gray-500 mt-4 leading-relaxed'>
            QuickStay was founded with a single mission — to make world-class hotel experiences available
            to every traveller, at every budget. We partner with the finest hotels across India and beyond
            to bring you curated stays that combine comfort, luxury, and value.
          </p>
          <p className='text-gray-500 mt-3 leading-relaxed'>
            From a cozy single room for a solo traveller to a grand suite for a family vacation,
            QuickStay has something for everyone. Our platform is built on trust, transparency,
            and an unwavering commitment to your satisfaction.
          </p>
          <button onClick={() => navigate('/rooms')}
            className='mt-8 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all'>
            Explore Our Rooms
          </button>
        </div>
        <div className='lg:w-1/2 grid grid-cols-2 gap-4'>
          <img src='https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
            className='rounded-2xl object-cover h-52 w-full shadow-lg' alt='room' />
          <img src='https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400'
            className='rounded-2xl object-cover h-52 w-full shadow-lg mt-8' alt='room' />
          <img src='https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'
            className='rounded-2xl object-cover h-52 w-full shadow-lg' alt='room' />
          <img src='https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'
            className='rounded-2xl object-cover h-52 w-full shadow-lg mt-8' alt='room' />
        </div>
      </div>

      {/* Stats */}
      <div className='bg-black text-white py-16 px-6 md:px-16 lg:px-24 xl:px-32'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {stats.map((stat, i) => (
            <div key={i}>
              <p className='font-playfair text-4xl md:text-5xl font-bold text-[#49B9FF]'>{stat.number}</p>
              <p className='text-gray-400 mt-2 text-sm'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-20'>
        <div className='text-center mb-12'>
          <p className='text-[#49B9FF] font-medium uppercase tracking-widest text-sm'>What Drives Us</p>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold mt-2'>Our Core Values</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {values.map((v, i) => (
            <div key={i} className='border border-gray-200 rounded-2xl p-6 hover:shadow-lg
              hover:-translate-y-1 transition-all duration-300'>
              <p className='text-4xl mb-4'>{v.icon}</p>
              <h3 className='font-playfair text-xl font-semibold mb-2'>{v.title}</h3>
              <p className='text-gray-500 text-sm leading-relaxed'>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className='bg-gray-50 px-6 md:px-16 lg:px-24 xl:px-32 py-20'>
        <div className='text-center mb-12'>
          <p className='text-[#49B9FF] font-medium uppercase tracking-widest text-sm'>The People Behind</p>
          <h2 className='font-playfair text-3xl md:text-4xl font-bold mt-2'>Meet Our Team</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {team.map((member, i) => (
            <div key={i} className='text-center group'>
              <div className='overflow-hidden rounded-2xl'>
                <img src={member.img} alt={member.name}
                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500' />
              </div>
              <p className='font-semibold mt-3'>{member.name}</p>
              <p className='text-gray-500 text-sm'>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-20 text-center
        bg-[url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400")]
        bg-cover bg-center relative'>
        <div className='absolute inset-0 bg-black/60' />
        <div className='relative text-white'>
          <h2 className='font-playfair text-3xl md:text-5xl font-bold'>Ready to Experience QuickStay?</h2>
          <p className='text-gray-300 mt-4 max-w-lg mx-auto'>
            Join thousands of happy travellers who trust QuickStay for their perfect getaway.
          </p>
          <button onClick={() => navigate('/rooms')}
            className='mt-8 bg-white text-black px-10 py-3 rounded-full font-medium
            hover:bg-gray-100 transition-all'>
            Book Your Stay
          </button>
        </div>
      </div>

    </div>
  )
}

export default About