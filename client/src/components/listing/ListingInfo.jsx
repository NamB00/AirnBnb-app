import React from 'react';
import Map from '../Map';
import ListingCategory from './ListingCategory';

const ListingInfo = ({
  bathroomCount,
  category,
  createdAt,
  guestCount,
  price,
  roomCount,
  user,
  localtionValue,
  description,
}) => {
  if (category.length == 0) return;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by userName</div>
          {/* <Avatar src={user?.image} /> */}
          <div>avatar</div>
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category[0]?.icon}
          label={category[0]?.label}
          description={category[0]?.description}
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={localtionValue?.latlng} />
    </div>
  );
};

export default ListingInfo;