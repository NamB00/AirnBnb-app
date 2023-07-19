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
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import useRentModal from '../hooks/useRentModal';


const LoginPage = () => {
  const rentModal = useRentModal();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const userInfo = await axios
        .post('/login', data)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          toast.success('Login successfully');
          navigate("/");
          navigate(0);
        })
        .catch(() => {
          toast.error('Login fail');
        })
        .finally(() => {
          setIsLoading(false);
        });
      await setUser(userInfo);
    } catch (error) {
      toast.error('Login fail');
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome to Airbnb" subtitle="Login an account" />
      <Input id="email" label="Email" formatPrice register={register} required errors={errors} />
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
            Register
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Modals
        link={'/'}
        disabled={isLoading}
        title={'Register'}
        actionLabel={'Login'}
        onSubmit={handleSubmit(onSubmit)}
        secondaryAction
        // secondaryActionLabel={'Close'}
        isOpen={true}
        body={bodyContent}
        footer={footerContent}
        onClose={rentModal.onClose}
      />
    </div>
  );
};

export default LoginPage;