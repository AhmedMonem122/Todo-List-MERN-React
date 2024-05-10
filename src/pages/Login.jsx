import { useForm } from 'react-hook-form'
import '../App.css'
import axios from 'axios'
import { useState } from 'react'
const Login = () => {
  const {handleSubmit , register} = useForm()
  const [formData , setFormData]=useState({
name:'',
password:'',
  })

const bodyFormData = new FormData()
bodyFormData.append('name', formData.name)
bodyFormData.append('password', formData.password)
const onSubmit = async () => {
  const storage = sessionStorage.getItem("login");
  try {
    const res = await axios.post(
      "",
      bodyFormData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storage}`,
        },
      }
    );

    if (res === "success") {
      alert("تم");
    } else {
      alert("خطأ");
    }
  } catch (error) {
    console.error("Error occurred during API request:", error);
    alert("حدث خطأ أثناء محاولة الاتصال بالخادم.");
  }
};
console.log(formData);
  return (
    <div className='page__Login'>
<h3 className='text-3xl font-bold underline bg-red-500'> ggggg</h3>
<div>
<form onSubmit={handleSubmit(onSubmit)}>
<input type="text" name='name' value={formData.name} onChange={(e)=>setFormData(e.target.value)} />
<input type="password" name='password'  value={formData.password} onChange={(e)=>setFormData(e.target.value)}/>
<input type="submit" />

</form>
</div>


    </div>
  )
}

export default Login