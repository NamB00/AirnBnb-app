import { BiSearch } from "react-icons/bi";
import useSearchModal from "../../hooks/useSearchModal";

const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px]
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      ">
      <div
        className="
        flex
        flex-row
        items-center
        justify-between
      ">
        <div
          className="
          text-sm
          font-semibold
          px-6
        ">
          Any where
        </div>
        <div
          className="
          hidden
          sm:block
          text-sm
          font-semibold
          px-6
          border-x-[1px]
          flex-1
          text-center
          ">
          Any Week
        </div>
        <div
          className="
          text-sm
          pl-6
          pr-2
          text-gray-600
          flex
          flex-row
          items-center
          gap-3
        ">
          <div className="hidden sm:block">Add Guests</div>
          <div
            className="
            p-2
            bg-rose-500
            text-white
            rounded-full
          ">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;