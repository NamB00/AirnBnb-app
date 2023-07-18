import Modals from './Modals';
import useSearchModal from "../../hooks/useSearchModal";

import qs from 'query-string';
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useParams, useNavigate } from "react-router-dom";
import CountrySelect from '../inputs/CountrySelect';
import Map from '../Map';
import Heading from './Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import CardItem from '../listing/CardItem';
import Button from '../buttons/Button';




const STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();

  const navigate = useNavigate();
  const { action } = useParams();
  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const onBack = () => {
    setStep((value) => value - 1);
  }
  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    // if (params) {
    //   currentQuery = qs.parse(params.toString())
    // }

    const updatedQuery = {
      ...currentQuery,
      locationLabel: location?.label,
      region: location?.region,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    // seacrh api

    await axios
      .post('/search-places', updatedQuery)
      .then(({ data }) => {
        // console.log(data);
        // router to cate gory
        toast.success('search Created');
        // navigate('/account/places');
      })
      .catch(() => {
        toast.error('search fail');
      })
      .finally(() => {
      });

    setStep(STEPS.LOCATION);
    searchModal.onClose();

  }, [step,
    searchModal,
    location,
    guestCount,
    roomCount,
    dateRange,
    bathroomCount,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) =>
          setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    )
  }

  return (
    <>
      <Modals
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title={'Filters'}
        actionLabel={actionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
        secondaryActionLabel={secondaryActionLabel}
      />
    </>
  );
};

export default SearchModal;


