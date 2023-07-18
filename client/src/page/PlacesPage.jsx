import { useParams, useNavigate } from "react-router-dom";
import Modals from "../components/modals/Modals";
import { useMemo, useState } from "react";
import Heading from "../components/modals/Heading";
import { categories } from "../components/navbar/Categories";
import CategoryInput from "../components/inputs/CategoryInput";
import { useForm } from 'react-hook-form';
import CountrySelect from "../components/inputs/CountrySelect";
import Map from "../components/Map";
import Counter from "../components/inputs/Counter";
import ImageUpload from "../components/inputs/ImageUpload";
import Input from "../components/inputs/Input";
import toast from "react-hot-toast";
import axios from 'axios';
import useRentModal from '../hooks/useRentModal';

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5
};
const PlacesPage = () => {
  const rentModal = useRentModal();

  const navigate = useNavigate();
  const { action } = useParams();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      category: '',
      title: '',
      description: '',
      imageSrc: '',
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      locationValue: null,
      price: 1
    },
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }
  const onNext = () => {
    setStep((value) => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={'Which of these best describes your place?'}
        subtitle={'Pick a category'}
      />
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 max-h-[50wh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          // disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          // disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          // disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }




  const onSubmit = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }


    await axios
      .post('/places', data)
      .then(() => {
        toast.success('Listing Created');
        navigate('/account/places');
        setStep(STEPS.CATEGORY);
        reset();
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Listing fail');
      })
      .finally(() => {
      });
  }

  const handleOpenModal = () => {
    navigate('/account/places/new');
    rentModal.onOpen();
  }
  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <button onClick={handleOpenModal} className="inline-flex items-center gap-1 bg-rose-500 text-white py-2 px-6 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </button>
        </div>
      )}
      {action === 'new' && (
        <>
          {/* 2;20 / */}
          <Modals
            onSubmit={handleSubmit(onSubmit)}
            link={'/account/places'}
            title={'Air your home!'}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
            onClose={rentModal.onClose}
            isOpen={rentModal.isOpen}
          />
        </>
      )}
    </div>
  );
};

export default PlacesPage;