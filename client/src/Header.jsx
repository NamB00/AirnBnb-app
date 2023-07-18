import logo from '../public/images/logo.png';
import { Link } from "react-router-dom";
import UserInfo from './components/users/UserInfo';
import Categories from './components/navbar/Categories';
import Container from './components/Container';
import Search from './components/navbar/Search';

const Header = () => {
  return (
    <div>
      <>
        <div className="w-full bg-white z-10 shadow-sm">
          <div className="py-4 border-b-[1px]">
            {/* container */}
            {/* <div
              className="
              max-w-[2520px] 
              mx-auto 
              xl:px-20
              md:px-10
              sm:px-2
              px-4
              "
              > */}
            <Container>
              {/* children */}
              <div
                className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
              >
                {/* logo */}
                <Link to={'/'}>
                  <img src={logo}
                    alt="logo"
                    className="hidden md:block cursor-pointer"
                    height="100"
                    width="100" />
                </Link>
                {/* searc */}
                <Search />
                {/* user info */}
                <UserInfo />
              </div>
            </Container>
            {/* </div> */}
          </div>
          <Categories label={'aaaa'} selected />
        </div>
      </>
    </div>
  );
};

export default Header;