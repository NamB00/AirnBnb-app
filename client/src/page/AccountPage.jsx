
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import PlacesPage from './PlacesPage';
import Mybooking from './Mybooking';

const AccountPage = () => {
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);
  const { subpage } = useParams();
  if (!ready) {
    return 'Loading....';
  }
  if (ready && !user) {
    return <Navigate to={'/login'} />
  }
  function linkClass(type = null) {
    let classes = 'py-2 px-6 rounded-full transition-all inline-flex items-center gap-2 ';
    if (type === subpage || (subpage === undefined && type === 'profile')) {
      classes += 'bg-rose-500 text-white'
    } else {
      classes += 'bg-gray-200 '
    }
    return classes;
  }
  async function logout() {
    await axios
      .post('/logout')
      .then(() => {
        // registerModal.onClose();
        navigate("/");
        setUser(null);
        toast.success('Logout successfully');
      })
      .catch(() => {
        toast.error('Something wrong!');
      });
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <Link className={linkClass('profile')} to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          My Profile
        </Link>
        <Link className={linkClass('bookings')} to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          My bookings
        </Link>
        <Link className={linkClass('places')} to={'/account/places'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          My accommodations
        </Link>
      </nav>
      {subpage === undefined && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className='bg-rose-500 w-full py-3 mt-8 rounded-lg text-white max-w-sm'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <>
          <PlacesPage />
        </>
      )}
      {subpage === 'bookings' && (
        <>
          <Mybooking />
        </>
      )}
    </div>
  );
};

export default AccountPage;