import axios from 'axios';
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Modals from "../components/modals/Modals";
import Input from "../components/inputs/Input";
import Button from "../components/buttons/Button";
import Heading from '../components/modals/Heading';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    console.log("data");
    console.log(data);

    await axios
      .post('/register', data)
      .then(() => {
        // registerModal.onClose();
        toast.success('Register successfully');
        navigate("/login");
      })
      .catch(() => {
        toast.error('Register fail');
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome to Airbnb" subtitle="Create an account" />
      <Input id="email" label="Email" formatPrice register={register} required errors={errors} />
      <Input id="name" label="Name" formatPrice register={register} required errors={errors} />
      <Input id="password" label="Password" type="password" formatPrice register={register} required errors={errors} />
    </div>

  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Countinue with Google" icon={FcGoogle} onClick={() => { }} />
      <Button outline label="Countinue with Github" icon={AiFillGithub} onClick={() => { }} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account</div>
          <div
            className="
              text-neutral-800 
              cursor-pointer 
              hover:underline
            "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Modals
        link={'/'}
        // disabled={isLoading}
        title={'Register'}
        actionLabel={'Continue'}
        // onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        isOpen
        secondaryAction
        secondaryActionLabel={'Close'}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterPage;