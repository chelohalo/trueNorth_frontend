import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SideBar = () => {

  const {auth} = useAuth()

  return (
    <aside className='md:w-1/3 lg:w-1-5 xl:w-1/6 px-5 py-10'>
        <p className='text-xl font-bold'>Welcome: {auth.name}</p>
        <p className='text-xl font-bold'>Your credit: {auth.credit} points</p>
        <Link 
          to='new-operation'
          className='font-bold block bg-sky-600 rounded-lg text-white p-3 text-center w-full uppercase mt-5'
          >New operation
        </Link>
    </aside> 
  )
}

export default SideBar