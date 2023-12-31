import { useCallback, useMemo } from "react";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import useCountries from '../../hooks/useCountries';
import HeartButton from "../HeartButton";

const CardItem = ({ data, reservation, onAction, actionLabel, actionId, disabled, currentUser }) => {
  // () => router.push()
  const navigate = useNavigate();

  const { getByValue } = useCountries();
  // const location = getByValue(data.location.value);

  const handleCancel = useCallback((e) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(data._id);
    // onAction?.(actionId);
  }, [onAction, actionId, disabled]);


  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);


  const reservationDate = useMemo(() => {
    if (!reservation) {
      return;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${ format(start, 'PP') } - ${ format(end, 'PP') }`;
  }, []);

  return (
    <div
      onClick={() => navigate(`/places/${ data._id }`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
          aspect-square 
          w-full 
          relative 
          overflow-hidden 
          rounded-xl
        "
        >
          <img
            className="
            object-cover 
            h-full 
            w-full 
            group-hover:scale-110 
            transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
          absolute
          top-3
          right-3
        ">
            {/* <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            /> */}
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.location?.region}, {data.location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {data.price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default CardItem;