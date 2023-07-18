import React from 'react';
import Heading from '../modals/Heading';
import HeartButton from '../HeartButton';

const ListingHead = ({ data }) => {
  return (
    <>
      <Heading
        title={data.title}
        subtitle={data.location?.region, data.location?.label}
      />
      <div className="
        w-full
        h-[60vh]
        overflow-hidden
        rounded-xl
        relative
      ">
        <img
          src={data.imageSrc}
          alt="Img"
          className='object-cover w-full'
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={data._id}
          // currentUser={}
          />
        </div>
      </div>
    </>

  );
};

export default ListingHead;