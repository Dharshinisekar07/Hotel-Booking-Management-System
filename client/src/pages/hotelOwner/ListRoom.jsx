import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { fetchAllRooms } from '../../services/api'
import axios from 'axios'
import toast from 'react-hot-toast'

const ListRoom = () => {
  const [rooms, setRooms]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllRooms()
      .then(res => setRooms(res.data))
      .catch(() => toast.error('Failed to load rooms'))
      .finally(() => setLoading(false))
  }, [])

  const toggleAvailability = async (index) => {
    const room    = rooms[index]
    const updated = { ...room, available: !room.available }
    try {
      await axios.post(`http://localhost:8080/api/rooms`, updated)
      const copy   = [...rooms]
      copy[index]  = updated
      setRooms(copy)
      toast.success(`Room marked as ${updated.available ? 'Available' : 'Unavailable'}`)
    } catch {
      toast.error('Failed to update room')
    }
  }

  return (
    <div>
      <Title align='left' font='outfit' title='Room Listings'
        subTitle='View, edit, or manage all listed rooms. Keep information up-to-date.' />
      <p className='text-gray-500 mt-8'>All Rooms</p>

      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Description</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Price/night</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Available</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {loading && (
              <tr><td colSpan={4} className='py-4 px-4 text-gray-400'>Loading...</td></tr>
            )}
            {rooms.map((item, index) => (
              <tr key={item.id}>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  Room {item.roomNumber} — {item.type}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                  {item.description}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  ₹{item.price}
                </td>
                <td className='py-3 px-4 border-t border-gray-300 text-center'>
                  <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input type="checkbox" className='sr-only peer'
                      checked={item.available}
                      onChange={() => toggleAvailability(index)} />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full
                      transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom