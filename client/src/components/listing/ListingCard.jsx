import axios from 'axios';
import Container from "../Container";
import EmptyState from "../EmptyState";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import CardItem from './CardItem';

const ListingCard = ({ onAction, actionLabel }) => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get('/my-places')
      .then((res) => {
        setPlaces(res.data);
        // toast.success('Logout successfully');
      })
      .catch(() => {
        toast.error('Something wrong!');
      });
  }, []);

  if (places && places.length === 0 || places === null) {
    return (
      <EmptyState showReset />
    )
  }
  return (
    <Container>
      <div className="
        pt-8
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        {
          places && places.map((listing) => (
            <CardItem
              key={listing._id}
              data={listing}
              actionLabel={actionLabel}
              onAction={onAction}
            />
          ))
        }
      </div>
    </Container>
  );
};

export default ListingCard;