import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'
import toast from "react-hot-toast";


const ImageUpload = ({ onChange, value }) => {
  const handleUpload = useCallback(async (result) => {
    console.log(result);
    const data = new FormData();
    data.append('file', result);
    data.append('upload_preset', 'AirBnb');
    data.append('cloud_name', 'dtgacggdn');

    // axios
    //   // .post('https://api.cloudinary.com/v1_1/dtgacggdn/image/upload', data)
    //   .post('/upload', data)
    //   .then((res) => {
    //     console.log(res);
    //     toast.success('Logout successfully');
    //     // navigate("/");
    //   })
    //   .catch(() => {
    //     toast.error('Something wrong!');
    //   });

    const response = await fetch("https://api.cloudinary.com/v1_1/dtgacggdn/image/upload", {
      method: "POST",
      body: data
    });
    await response.json()
      .then((res) => {
        const { url } = res;
        onChange(url);
        toast.success('Upload successfully');
      }).catch(() => {
        toast.error('Something wrong!');
      });
  }, [onChange]);
  console.log(value);
  return (
    <>
      {value ? (
        <>
          <img
            src={value} alt=""
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-transparent
            "/>
        </>
      ) :
        <>
          <input
            onChange={(e) => handleUpload(e.target.files[0])}
            type="file"
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-transparent
            "/>
          <TbPhotoPlus className="absolute top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2" size={50} />
        </>
      }
    </>
  );
};

export default ImageUpload;