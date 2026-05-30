import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { fetchRoomById, createBooking } from '../services/api'
import { useAppContext } from '../context/AddContext'
import toast from 'react-hot-toast'

const RoomDetails = () => {
  const { id } = useParams()
  const { user, currency, navigate } = useAppContext()
  const [room, setRoom]           = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const [checkIn, setCheckIn]     = useState('')
  const [checkOut, setCheckOut]   = useState('')
  const [guests, setGuests]       = useState(1)
  const [loading, setLoading]     = useState(false)

  useEffect(() => {
    fetchRoomById(id)
      .then(res => {
        setRoom(res.data)
        setMainImage(res.data.imageUrl)
      })
      .catch(() => toast.error('Room not found'))
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!user) { toast.error('Please login to book'); return }
    if (!checkIn || !checkOut) { toast.error('Select check-in and check-out dates'); return }
    if (checkOut <= checkIn) { toast.error('Check-out must be after check-in'); return }

    setLoading(true)
    try {
      await createBooking({
        guestName  : user.fullName || user.firstName,
        guestEmail : user.primaryEmailAddress?.emailAddress,
        guestPhone : '',
        room       : { id: Number(id) },
        checkIn,
        checkOut,
      })
      toast.success('🎉 Booking confirmed!')
      navigate('/my-bookings')
    } catch {
      toast.error('Booking failed. Room may already be booked.')
    } finally {
      setLoading(false)
    }
  }

  if (!room) return <p className='py-28 px-32 text-gray-400'>Loading...</p>

  return (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair'>
          Room {room.roomNumber}
          <span className='font-inter text-sm'> ({room.type})</span>
        </h1>
        <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
          Best Price
        </p>
      </div>

      <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ reviews</p>
      </div>

      <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt="location-icon" />
        <span>Capacity: {room.capacity} guests</span>
      </div>

      {/* Images */}
      <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img src={mainImage} alt="Room" className='w-full rounded-xl shadow-lg object-cover' />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          <img src={room.imageUrl} alt="Room"
            onClick={() => setMainImage(room.imageUrl)}
            className={`w-full rounded-xl shadow-md object-cover cursor-pointer
              ${mainImage === room.imageUrl && 'outline-3 outline-orange-500'}`} />
        </div>
      </div>

      {/* Highlights */}
      <div className='flex flex-col md:flex-row md:justify-between mt-10'>
        <div className='flex flex-col'>
          <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
          <p className='text-gray-500 mt-3 max-w-lg'>{room.description}</p>
          <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
            <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
              <p className='text-xs'>👥 {room.capacity} Guests</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${room.available ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`text-xs ${room.available ? 'text-green-600' : 'text-red-600'}`}>
                {room.available ? '✅ Available' : '❌ Not Available'}
              </p>
            </div>
          </div>
        </div>
        <p className='text-2xl font-medium'>{currency}{room.price}/night</p>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleBooking}
        className='flex flex-col md:flex-row items-start md:items-center justify-between
        bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
        <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
          <div className='flex flex-col'>
            <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
            <input type="date" id='checkInDate' value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setCheckIn(e.target.value)}
              className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
          </div>
        </div>
        <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
        <div className='flex flex-col'>
          <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
          <input type="date" id='checkOutDate' value={checkOut}
            min={checkIn || new Date().toISOString().split('T')[0]}
            onChange={e => setCheckOut(e.target.value)}
            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
        </div>
        <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
        <div className='flex flex-col'>
          <label htmlFor="Guests" className='font-medium'>Guests</label>
          <input type="number" id='Guests' value={guests} min={1} max={room.capacity}
            onChange={e => setGuests(e.target.value)}
            className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
        </div>
        <button type='submit' disabled={loading || !room.available}
          className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white
          rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed'>
          {loading ? 'Booking...' : !room.available ? 'Not Available' : 'Book Now'}
        </button>
      </form>

      {/* Common Specs */}
      <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec, index) => (
          <div key={index} className='flex items-start gap-2'>
            <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
            <div>
              <p className='text-base'>{spec.title}</p>
              <p className='text-gray-500'>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
        <p>Guest will be allocated on the ground floor according to availability.
          You get a comfortable room with a true city feeling.</p>
      </div>
    </div>
  )
}

export default RoomDetails