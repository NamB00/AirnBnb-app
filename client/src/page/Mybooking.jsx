import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/modals/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/listing/ListingCard";
import CardBooking from "../components/listing/CardBooking";

const Mybooking = () => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState('');
  const [reservations, setReservations] = useState([]);

  // get list trips

  useEffect(() => {
    axios.get('/reservations')
      .then(({ data }) => {
        // toast.success('get succsess');
        setReservations(data);
      })
      .catch((error) => {
        toast.error('db error')
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [deletingId]);

  const onCancel = useCallback((id) => {
    setDeletingId(id);
    axios.delete(`/delete-reservations/${ id }`)
      .then((res) => {
        console.log(res);
        toast.success('Reservation cancelled');
        // navigate(0);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [navigate]);

  return (
    <>
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going"
        />
        {/* <ListingCard
          // key={reservation.id}
          // data={reservation.listing}
          // reservation={reservation}
          // actionId={reservation.id}
          onAction={onCancel}
          // disabled={deletingId === reservation.id}
          actionLabel="Cancel reservation"
          places={reservations}
        /> */}
        <div>
          <CardBooking
            onAction={onCancel}
            places={reservations}
          />
        </div>
      </Container>
    </>
  );
};

export default Mybooking;