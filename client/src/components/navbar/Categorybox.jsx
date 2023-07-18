import qs from 'query-string';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import { useCallback } from "react";
// import { IconType } from "react-icons";
//
const Categorybox = ({ description, label, selected, icon: Icon }) => {
  const router = useNavigate();

  const params = useParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params.categoty) {
      currentQuery = qs.parse(params.categoty.toString())
    }

    const updatedQuery = {
      ...currentQuery,
      category: label
    }

    if (params?.categoty === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router(url);
  }, [label, router, params.categoty]);
  return (
    <Link to={'/category/' + label}>
      <div
        onClick={handleClick}
        className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${ selected ? 'border-b-neutral-800' : 'border-transparent' }
        ${ selected ? 'text-neutral-800' : 'text-neutral-500' }
      `}
      >
        <Icon size={26} />
        <div className="font-medium text-sm">
          {label}
        </div>
      </div>
    </Link>
  );
};

export default Categorybox;