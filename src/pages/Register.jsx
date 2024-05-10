import { useForm } from 'react-hook-form'
import '../App.css'
import axios from 'axios'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
const Register = () => {
  const {handleSubmit , register} = useForm()
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));


  };
  const bodyFormData = new FormData();
  bodyFormData.append('firstName', formData.firstName)
bodyFormData.append('lastName', formData.lastName)
bodyFormData.append('email', formData.email)
bodyFormData.append('password', formData.password)
const onSubmit = async () => {
  // const storage = sessionStorage.getItem("login");
  try {
    const res = await axios.post(
      "https://ahmed-monem-todolist-node.onrender.com/api/v1/users/signup",
      bodyFormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 201) {
      toast.success('Successfully created!');

      // window.location.href = "/login";
    } else {
      toast.error('error created!');

    }
  } catch (error) {
    toast.error('error created!');
  }
};
  return (
    <div className='page__Login '>
<div>
  <h3 className='text-center font-semibold  text-3xl mb-10 text-white'> Registration  </h3>
<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col   w-96  gap-4'>
<input type='text' name='firstName' placeholder='firstName ' className='rounded-2xl  p-4 outline-none text-lg font-medium' value={formData.firstName} onChange={handleChange} />
<input type='text' name='lastName' placeholder='lastName ' className='rounded-2xl  p-4 outline-none text-lg font-medium' value={formData.lastName} onChange={handleChange} />
<input type='email' name='email' placeholder='email ' className='rounded-2xl  p-4 outline-none text-lg font-medium' value={formData.email} onChange={handleChange} />
<input type="password" placeholder='Password ' name='password'  className='rounded-2xl  outline-none p-4 text-lg font-medium' value={formData.password} onChange={handleChange}/>
<input type="submit" className='rounded-2xl bg-violet-600 text-white p-4 text-lg font-medium' value=" Login" />


</form>
</div>


    </div>
  )
}

export default Register