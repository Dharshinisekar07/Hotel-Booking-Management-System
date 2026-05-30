import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { addRoom } from '../../services/api'
import toast from 'react-hot-toast'

const AddRoom = () => {
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
  const [inputs, setInputs] = useState({
    roomType    : '',
    priceperNight: 0,
    amenities: {
      'Free Wifi'      : false,
      'Free Breakfast' : false,
      'Room Service'   : false,
      'Mountain View'  : false,
      'Pool Access'    : false,
    }
  })
  const [loading, setLoading] = useState(false)

  // map your frontend types to Spring Boot backend types
  const typeMap = {
    'Single Bed'   : 'SINGLE',
    'Double Bed'   : 'DOUBLE',
    'Luxury Room'  : 'SUITE',
    'Family Suite' : 'SUITE',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputs.roomType) { toast.error('Select a room type'); return }
    if (inputs.priceperNight <= 0) { toast.error('Enter a valid price'); return }

    setLoading(true)
    try {
      const selectedAmenities = Object.keys(inputs.amenities)
        .filter(k => inputs.amenities[k])

      await addRoom({
        roomNumber  : `R${Date.now().toString().slice(-4)}`,  // auto-generate number
        type        : typeMap[inputs.roomType],
        price       : Number(inputs.priceperNight),
        capacity    : inputs.roomType === 'Family Suite' ? 4 : inputs.roomType === 'Double Bed' ? 2 : 1,
        description : selectedAmenities.join(', ') || inputs.roomType,
        available   : true,
        imageUrl    : 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
      })
      toast.success('Room added successfully!')
      // reset form
      setInputs({ roomType: '', priceperNight: 0,
        amenities: { 'Free Wifi': false, 'Free Breakfast': false,
          'Room Service': false, 'Mountain View': false, 'Pool Access': false }
      })
    } catch {
      toast.error('Failed to add room')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Title align='left' font='outfit' title='Add Room'
        subTitle='Fill in the details carefully and accurate room details, pricing, and amenities.' />

      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImages${key}`} key={key}>
            <img className='max-h-13 cursor-pointer opacity-80'
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            <input type="file" accept='image/*' id={`roomImages${key}`} hidden
              onChange={e => setImages({ ...images, [key]: e.target.files[0] })} />
          </label>
        ))}
      </div>

      <div className='w-full flex max-sm:flex-col sm:gap-6 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select value={inputs.roomType}
            onChange={e => setInputs({ ...inputs, roomType: e.target.value })}
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p className='mt-4 text-gray-800'>Price <span className='text-xs'>/night</span></p>
          <input type="number" placeholder='0'
            className='border border-gray-300 mt-1 rounded p-2 w-24'
            value={inputs.priceperNight}
            onChange={e => setInputs({ ...inputs, priceperNight: e.target.value })} />
        </div>
      </div>

      <p className='text-gray-800 mt-4'>Amenities</p>
      <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className='flex items-center gap-2'>
            <input type="checkbox" id={`amenity-${index}`}
              checked={inputs.amenities[amenity]}
              onChange={() => setInputs({ ...inputs,
                amenities: { ...inputs.amenities, [amenity]: !inputs.amenities[amenity] }
              })} />
            <label htmlFor={`amenity-${index}`}>{amenity}</label>
          </div>
        ))}
      </div>

      <button type='submit' disabled={loading}
        className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer disabled:opacity-50'>
        {loading ? 'Adding...' : 'Add Room'}
      </button>
    </form>
  )
}

export default AddRoom