import { Outlet } from "react-router-dom";
import Header from "../src/Header";
import SearchModal from "../src/components/modals/SearchModal";
const Layout = ({ setPlacesSearch }) => {
  return (
    <div>
      <Header />
      <SearchModal setPlacesSearch={setPlacesSearch} />
      <Outlet />
    </div>
  );
};

export default Layout;