import avatar from '../../../public/images/placeholder.jpg';
import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useContext, useState } from "react";
import { UserContext } from '../../context/UserContext';
import UsersItem from './UsersItem';
import { Link } from "react-router-dom";

const UserInfo = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-grow items-center gap-3">
        <div className="
          hidden 
          md:block 
          text-sm 
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer
        ">
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-2
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
        ">
          <AiOutlineMenu />
          <div className="hidden md:block">
            {/* Avatar */}
            <img
              className='rounded-full'
              height={30}
              width={30}
              alt='Avatar'
              src={avatar} />
          </div>
          {user && (
            <div className='font-medium'>
              {user.name}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl
            shadow-md
            w-[40wv]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              {user && user.name ? (
                <>
                  <Link to={'/account'}>
                    <UsersItem label={'My Account'} />
                  </Link>
                  {/* <Link to={'/logout'}>
                    <UsersItem label={'Logout'} />
                  </Link> */}
                </>
              ) :
                (
                  <>
                    <Link to={'/register'}>
                      <UsersItem label={'SignUp'} />
                    </Link>
                    <Link to={'/login'}>
                      <UsersItem label={'Login'} />
                    </Link>
                  </>
                )
              }
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;