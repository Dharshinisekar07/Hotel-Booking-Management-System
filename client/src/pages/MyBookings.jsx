import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { fetchMyBookings, cancelBooking } from '../services/api'
import { useAppContext } from '../context/AddContext'
import toast from 'react-hot-toast'

const MyBookings = () => {
  const { user, currency } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) { setLoading(false); return }

    fetchMyBookings(email)
      .then(res => setBookings(res.data))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [user])

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id)
      toast.success('Booking cancelled')
      setBookings(prev => prev.map(b =>
        b.id === id ? { ...b, status: 'CANCELLED' } : b
      ))
    } catch {
      toast.error('Failed to cancel booking')
    }
  }

  return (
    <div className='py-28 md:pb-35 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title title='My Bookings' align='left'
        subTitle='Easily manage your past, current, and upcoming hotel reservations in one place.' />

      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full
          border-b border-gray-300 font-medium text-base py-3'>
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Status</div>
        </div>

        {loading && <p className='text-gray-400 mt-6'>Loading bookings...</p>}
        {!loading && bookings.length === 0 && (
          <p className='text-gray-400 mt-6'>No bookings found.</p>
        )}

        {bookings.map((booking) => (
          <div key={booking.id}
            className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>

            {/* Hotel Details */}
            <div className='flex flex-col md:flex-row'>
              <img src={booking.room?.imageUrl} alt="hotel-img"
                className='w-44 h-28 rounded shadow object-cover' />
              <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                <p className='font-playfair text-2xl'>
                  Room {booking.room?.roomNumber}
                  <span className='font-inter text-sm'> ({booking.room?.type})</span>
                </p>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>Capacity: {booking.room?.capacity} guests</span>
                </div>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.guestsIcon} alt="guests-icon" />
                  <span>Guest: {booking.guestName}</span>
                </div>
                <p className='text-base'>Total: {currency}{booking.totalPrice}</p>
              </div>
            </div>

            {/* Dates */}
            <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
              <div>
                <p>Check-In:</p>
                <p className='text-gray-500 text-sm'>
                  {new Date(booking.checkIn).toDateString()}
                </p>
              </div>
              <div>
                <p>Check-Out:</p>
                <p className='text-gray-500 text-sm'>
                  {new Date(booking.checkOut).toDateString()}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className='flex flex-col items-start justify-center pt-3'>
              <div className='flex items-center gap-2'>
                <div className={`h-3 w-3 rounded-full ${booking.status === 'CONFIRMED' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <p className={`text-sm ${booking.status === 'CONFIRMED' ? 'text-green-500' : 'text-red-500'}`}>
                  {booking.status}
                </p>
              </div>
              {booking.status === 'CONFIRMED' && (
                <button onClick={() => handleCancel(booking.id)}
                  className='w-fit px-3 py-1 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings