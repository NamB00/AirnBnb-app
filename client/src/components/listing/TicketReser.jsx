import { useCallback } from "react";
import Button from "../buttons/Button";
import { format } from 'date-fns';

const TicketReser = ({ listing, onAction }) => {

  const getFullDate = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleString();
  }

  const getOnlyDate = (date) => {
    let newDate = new Date(date);
    return newDate.getDate();
  }

  const getNameMonth = (date) => {
    let newDate = new Date(date).toLocaleString('default', { month: 'long' });
    return newDate;
  }

  const handleCancel = useCallback((e) => {
    e.stopPropagation();

    // if (disabled) {
    //   return;
    // }

    onAction?.(listing.listingId);
    // onAction?.(actionId);
  }, [onAction]);
  return (
    <div key={listing._id} className="row mb-5 w-[48%] xl:w-[30%]">
      <article className="card shadow-sm bg-yellow-400">
        <section className="date">
          <time dateTime="23th feb">
            <span>{getOnlyDate(listing.startDate)}</span><span>{getNameMonth(listing.startDate)}</span>
          </time>
        </section>
        <section className="card-cont">
          <small>Trips</small>
          <h3>live in {listing.location}</h3>
          <div className="even-date">
            <i className="fa fa-calendar"></i>
            <time>
              <span>Start Date {getFullDate(listing.startDate)} </span>
              <span>To {getFullDate(listing.endDate)}</span>
            </time>
          </div>
          <div className="even-info">
            <i className="fa fa-map-marker"></i>
            <p>
              nexen square for people {listing.location}
            </p>
          </div>
          <Button
            ticket
            label={'Cancel'}
            onClick={handleCancel}
          />
        </section>
      </article>

    </div>
  );
};

export default TicketReser;