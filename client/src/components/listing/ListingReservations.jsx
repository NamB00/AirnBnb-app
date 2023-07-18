import React from 'react';
import Calendar from '../inputs/Calendar';
import Button from '../buttons/Button';

const ListingReservations = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  disabled,
  disableDates,
  onSubmit
}) => {
  return (
    <div className='
      bg-white
      rounded-xl
      border-[1px]
      border-neutral-200
      overflow-hidden
    '>
      <div className="
        flex 
        flex-grow
        items-center
        gap-1
        p-4
      ">
        <div className="text-2xl font-semibold">
          ${price}
        </div>
        <div className="font-light text-neutral-500">
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disableDates={disableDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label={"Reserve"}
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div className="
        p-4 flex flex-col items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>
          ${totalPrice}
        </div>
      </div>
    </div>
  );
};

export default ListingReservations;