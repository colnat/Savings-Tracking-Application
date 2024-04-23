import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState(''); //set a error message
    const navigateToRegister = useNavigate(); 
    const navigate = useNavigate();

    function handleClick(){
        navigateToRegister("/register") //navigate to register if they dont have an account
    }

    
    const [formData, setFormData] = useState({
        email: '', //data that will be filled out and submmited
        password: ''

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           //send login credentials to backend to check if there valid
            const response = await axios.post('http://localhost:8080/api/login', 
        formData, 
        {
        withCredentials: true,
        headers: {
                    
                'Content-Type': 'application/json' 
            }
                }
            );
            console.log('Login successful:', response.data);
            navigate('/savings')//if its succesful take user to savings page
        
        } catch (error) { //if there is an error display error
            console.error('Login failed:', error.response.data);
                setErrorMessage("Incorrect Email or password")
           }
};

return(
<div  className='m-auto h-screen bg-gradient-to-r from-emerald-500 to-emerald-900 py-28'>
<h1 className="text-4xl font-bold text-center font-serif p-4 text-white">Login</h1>
<div className='flex justify-center items-center'>
<div className='p-4 m-auto md:w-[650px] rounded-lg shadow-xl shadow-white text-bold text-2xl'>
<form onSubmit={handleSubmit}>

<div className="flex flex-col py-2">
            <label className="uppercase text-sm py-2 text-white">username</label>
            <input className='border-1 rounded-lg p-1 flex border-gray-400' type="text" name='email' value={formData.email} onChange={handleChange}/>
 </div>

 <div className="flex flex-col py-2">
            <label className="uppercase text-sm py-2 text-white">Password</label>
            <input className='border-1 rounded-lg p-1 flex border-gray-400' type="password" name='password' value={formData.password} onChange={handleChange}/>
</div>
<button type="submit" className='bg-black text-gray-100 mt-4 w-full p-3 rounded-lg'>Login</button>
{errorMessage && <div className="error flex text-center justify-center bg-red-800 mt-4 w-full rounded-lg text-white"> {errorMessage} </div>}
</form>
<button onClick={handleClick} className='text-white bg-black mt-4 w-full rounded-lg'>Make an account</button>

</div>

</div>
</div>
   
 )

}

export default Login