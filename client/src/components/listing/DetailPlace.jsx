import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import Container from '../Container';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';
import { categories } from "../../components/navbar/Categories";
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
import ListingReservations from './ListingReservations';



const DetailPlace = ({ reservations = [], listing }) => {
  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  const [category, setcategory] = useState([]);


  useMemo(() => {
    axios
      .post('/my-places-detail', { idPlace: id })
      .then(({ data }) => {
        setPlace(data[0]);
        const getCategory = categories.filter((item) => item.label === place.category);
        setcategory(getCategory);
        // toast.success('Listing Check');
      })
      .catch(() => {
        toast.error('Load Listing fail');
      })
      .finally(() => {
      });
  }, [id, place?.category]);

  // tinh tien
  const disableDates = useMemo(() => {
    let dates = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    })
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(place.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!user) {
      return navigate('/login');
    }
    setIsLoading(true);
    axios
      .post('/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: id,
        title: place.title,
        location: place.location.label
      })
      .then(() => {
        setDateRange(initialDateRange);
        navigate(0);
        toast.success('Booking successfully!');
      })
      .catch(() => {
        toast.error('Booking fail');
      })
  }, [totalPrice, dateRange, user, id]);



  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount = differenceInCalendarDays(dateRange.startDate, dateRange.endDate);
      if (dateCount && place.price) {
        setTotalPrice((dateCount * -1) * place.price);
      } else {
        setTotalPrice(place.price);
      }
    }
  }, [dateRange, place.price]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className="flex flex-col gap-6">
          <ListingHead
            data={place}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              bathroomCount={place.bathroomCount}
              category={category}
              createdAt={place.createdAt}
              guestCount={place.guestCount}
              price={place.price}
              roomCount={place.roomCount}
              user={place.owner}
              localtionValue={place.location}
              description={place.description}
            />
            <div className="
              order-first
              mb-10
              md:order-last
              md:col-span-3
            ">
              <ListingReservations
                price={place.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                disabled={isLoading}
                disableDates={disableDates}
                onSubmit={onCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailPlace;