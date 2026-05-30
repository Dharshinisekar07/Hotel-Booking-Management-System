import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { fetchAllRooms } from '../services/api'
import toast from 'react-hot-toast'

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
    <span className='font-light select-none'>{label}</span>
  </label>
)

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input type="radio" name="sortOption" checked={selected} onChange={() => onChange(label)} />
    <span className='font-light select-none'>{label}</span>
  </label>
)

const AllRooms = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [openFilters, setOpenFilters]     = useState(false)
  const [allRooms, setAllRooms]           = useState([])   // ← stores ALL rooms from API
  const [filtered, setFiltered]           = useState([])   // ← what gets displayed
  const [loading, setLoading]             = useState(true)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedRanges, setSelectedRanges] = useState([])
  const [sortOption, setSortOption]       = useState('')

  const roomTypes   = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite']
  const PriceRange  = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000']
  const sortOptions = ['Price Low to High', 'Price High to Low', 'Newest First']

  const typeMap = {
    'Single Bed'  : 'SINGLE',
    'Double Bed'  : 'DOUBLE',
    'Luxury Room' : 'SUITE',
    'Family Suite': 'SUITE',
  }

  // Step 1: fetch all rooms once
  useEffect(() => {
    fetchAllRooms()
      .then(res => {
        setAllRooms(res.data)
      })
      .catch(() => toast.error('Failed to load rooms'))
      .finally(() => setLoading(false))
  }, [])

  // Step 2: apply city filter + other filters whenever rooms or URL changes
  useEffect(() => {
    if (allRooms.length === 0) return

    const params = new URLSearchParams(location.search)
    const city   = params.get('city')?.toLowerCase().trim()

    let result = [...allRooms]

    // City filter from search bar
    if (city) {
      result = result.filter(r =>
        r.city?.toLowerCase().includes(city) ||
        r.description?.toLowerCase().includes(city) ||
        r.type?.toLowerCase().includes(city)
      )
    }

    // Room type filter
    if (selectedTypes.length > 0) {
      const backendTypes = selectedTypes.map(t => typeMap[t])
      result = result.filter(r => backendTypes.includes(r.type))
    }

    // Price range filter
    if (selectedRanges.length > 0) {
      result = result.filter(r =>
        selectedRanges.some(range => {
          const nums = range.replace(/\$/g, '').trim().split('to').map(n => parseInt(n.trim()))
          return r.price >= nums[0] && r.price <= nums[1]
        })
      )
    }

    // Sort
    if (sortOption === 'Price Low to High') result.sort((a, b) => a.price - b.price)
    if (sortOption === 'Price High to Low') result.sort((a, b) => b.price - a.price)
    if (sortOption === 'Newest First')      result.sort((a, b) => b.id - a.id)

    setFiltered(result)
  }, [allRooms, location.search, selectedTypes, selectedRanges, sortOption])

  const handleTypeFilter = (checked, label) => {
    setSelectedTypes(prev => checked ? [...prev, label] : prev.filter(t => t !== label))
  }

  const handleRangeFilter = (checked, label) => {
    setSelectedRanges(prev => checked ? [...prev, label] : prev.filter(r => r !== label))
  }

  // Get city name from URL to show in heading
  const cityParam = new URLSearchParams(location.search).get('city')

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>

      {/* Room List */}
      <div>
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>
            {cityParam ? `Hotels in ${cityParam}` : 'Hotel Rooms'}
          </h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
            Take advantage of our limited-time offers and special packages to enhance your stay.
          </p>
        </div>

        {loading && (
          <div className='mt-10 text-gray-400'>Loading rooms...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div className='mt-10 text-gray-500'>
            <p>No rooms found{cityParam ? ` in "${cityParam}"` : ''}.</p>
            <button onClick={() => navigate('/rooms')}
              className='mt-3 text-sm underline text-blue-500'>
              Clear search and show all rooms
            </button>
          </div>
        )}

        {filtered.map((room) => (
          <div key={room.id} className='flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:pb-30 last:border-0'>
            <img
              onClick={() => { navigate(`/rooms/${room.id}`); window.scrollTo(0, 0) }}
              src={room.imageUrl} alt="hotel-img" title='View Room Details'
              className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
            />
            <div className='md:w-1/2 flex flex-col gap-1'>
              <p className='text-gray-500'>{room.city || room.type}</p>
              <p onClick={() => { navigate(`/rooms/${room.id}`); window.scrollTo(0, 0) }}
                className='text-gray-800 text-3xl font-playfair cursor-pointer'>
                Room {room.roomNumber}
              </p>
              <div className='flex items-center'>
                <StarRating />
                <p className='ml-2'>200+ reviews</p>
              </div>
              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.city || 'India'} · Capacity: {room.capacity} guests</span>
              </div>
              <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                  <p className='text-xs'>{room.description}</p>
                </div>
              </div>
              <p className='text-xl font-medium text-gray-700'>₹{room.price} /night</p>
              <span className={`text-sm font-medium mt-1 ${room.available ? 'text-green-500' : 'text-red-500'}`}>
                {room.available ? '✅ Available' : '❌ Booked'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
        <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && 'border-b'}`}>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer'>
            <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
              {openFilters ? 'HIDE' : 'SHOW'}
            </span>
            <span onClick={() => { setSelectedTypes([]); setSelectedRanges([]); setSortOption('') }}
              className='hidden lg:block cursor-pointer'>CLEAR</span>
          </div>
        </div>
        <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room}
                selected={selectedTypes.includes(room)}
                onChange={handleTypeFilter} />
            ))}
          </div>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {PriceRange.map((range, index) => (
              <CheckBox key={index} label={`$ ${range}`}
                selected={selectedRanges.includes(`$ ${range}`)}
                onChange={handleRangeFilter} />
            ))}
          </div>
          <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sort by</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option}
                selected={sortOption === option}
                onChange={setSortOption} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms