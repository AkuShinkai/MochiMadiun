import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Searchbar = () => {
  return (
    <form className='flex w-[220px] relative'>
      <div className='relative'>
        <button className='absolute right-1 p-4 top-1/2 -translate-y-1/2 rounded-full'>
            <AiOutlineSearch className='text-gray-400' />
        </button>
        <input
        type='search'
        placeholder='search here' 
        className='w-full p-4 rounded-full text-sm focus:outline-none active:outline-none border border-gray-300 h-10 pl-11 pr-4 focus:border-[#FF9843]'/>
      </div>
    </form>
  )
}

export default Searchbar
