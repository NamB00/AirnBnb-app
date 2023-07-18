import '../../../public/css/ticket.css'
import TicketReser from './TicketReser';
const CardBooking = ({ onAction, places }) => {

  return (
    <section className="container">
      <h1 className='
      uppercase 
      font-black 
      border-l-[10px] 
      border-rose-500
      pl-3
      mb-8
    '>upcomming gigs
      </h1>
      <div className='flex gap-2 flex-wrap'>
        {places && places.map((listing) => (
          <TicketReser
            key={listing._id}
            listing={listing}
            onAction={onAction}
          />
        ))}
      </div>
    </section>
  );
};

export default CardBooking;


{/* <article class="card fl-left">
          <section class="date">
            <time datetime="23th feb">
              <span>23</span><span>feb</span>
            </time>
          </section>
          <section class="card-cont">
            <small>dj music event</small>
            <h3>corner obsest program</h3>
            <div class="even-date">
              <i class="fa fa-calendar"></i>
              <time>
                <span>wednesday 28 december 2014</span>
                <span>08:55pm to 12:00 am</span>
              </time>
            </div>
            <div class="even-info">
              <i class="fa fa-map-marker"></i>
              <p>
                nexen square for people australia, sydney
              </p>
            </div>
            <a href="#">tickets</a>
          </section>
</article> */}

// <div class="row">
// <article class="card fl-left">
//   <section class="date">
//     <time datetime="23th feb">
//       <span>23</span><span>feb</span>
//     </time>
//   </section>
//   <section class="card-cont">
//     <small>dj music event</small>
//     <h3>music kaboom festivel</h3>
//     <div class="even-date">
//       <i class="fa fa-calendar"></i>
//       <time>
//         <span>wednesday 28 december 2014</span>
//         <span>08:55pm to 12:00 am</span>
//       </time>
//     </div>
//     <div class="even-info">
//       <i class="fa fa-map-marker"></i>
//       <p>
//         nexen square for people australia, sydney
//       </p>
//     </div>
//     <a href="#">booked</a>
//   </section>
// </article>
// <article class="card fl-left">
//   <section class="date">
//     <time datetime="23th feb">
//       <span>23</span><span>feb</span>
//     </time>
//   </section>
//   <section class="card-cont">
//     <small>dj music event</small>
//     <h3>hello dubai festivel</h3>
//     <div class="even-date">
//       <i class="fa fa-calendar"></i>
//       <time>
//         <span>wednesday 28 december 2014</span>
//         <span>08:55pm to 12:00 am</span>
//       </time>
//     </div>
//     <div class="even-info">
//       <i class="fa fa-map-marker"></i>
//       <p>
//         nexen square for people australia, sydney
//       </p>
//     </div>
//     <a href="#">cancel</a>
//   </section>
// </article>
// </div>