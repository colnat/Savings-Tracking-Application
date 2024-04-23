import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const Register = () => {
    const [errorMessage, setErrorMessage] = useState(''); //set a error message
    const navigateToLogin = useNavigate();

    function handleClick(){
        navigateToLogin("/login")
    }

    const [formData, setFormData] = useState({ //form data to be filled out and submitted
        email: '',
        firstName:'',
        lastName: '',
        password: '',

    });
   
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    };

    const handleSubmit = async (e) => {e
        
        e.preventDefault();
        try {
           //send form data to backend and check to see if its valid and then save it
            const response = await axios.post('http://localhost:8080/api/register', formData); 
            console.log('Registration successful:', response.data);
           //navigate the user to the login page
            navigate('/login');
           
        } catch (error) { //if theres an error catch it and display an error message
            if (error.response) {
                console.error('Registration failed:', error.response.data);
                setErrorMessage("Fill in all fields, Password must be at least 8 characters and Username must be 5")
                
            } else if (error.request) {
                console.error('Network error:', error.request);
                
            } else {
                console.error('Error:', error.message);
                
            }
        }
    };

   
return(
<div className=" m-auto h-screen bg-gradient-to-r from-emerald-500 to-emerald-900 py-28" >
<h1 className="text-4xl font-bold text-center font-serif p-4 text-white">Register</h1>
<div className="flex justify-center items-center">
<div className="p-4 md:w-[650px] m-auto rounded-lg shadow-xl shadow-white text-bold text-2xl">
    
    <form onSubmit={handleSubmit}>
        
        <div className="flex flex-col py-2">
            <label className="uppercase text-sm py-2 text-white">Username</label>
            <input className='border-1 rounded-lg p-1 flex border-gray-400' type="text" name='email' value={formData.email} onChange={handleChange}/>
        </div>

        <div className="flex flex-col py-2">
            <label className="uppercase text-sm py-2 text-white">First Name</label>
            <input className='border-1 rounded-lg p-1 flex border-gray-400' type="text" name='firstName' value={formData.firstName} onChange={handleChange}/>
        </div>

        <div className="flex flex-col py-2">
            <label className="uppercase text-sm py-2 text-white">Last Name</label>
            <input className='border-1 rounded-lg p-1 flex border-gray-400' type="text" name='lastName' value={formData.lastName} onChange={handleChange}/>
        </div>
        
        <div className="flex flex-col py-2">
            <label className="uppercase text-sm py-2 text-white">Password</label>
            <input className='border-1 rounded-lg p-1 flex border-gray-400' type="password" name='password' value={formData.password} onChange={handleChange}/>
        </div>

        <button type="submit" className='bg-black text-gray-100 mt-4 w-full p-4 rounded-lg'>Register</button>
        {errorMessage && <div className="error flex text-center justify-center bg-red-800 mt-4 w-full rounded-lg text-white"> {errorMessage} </div>}
    </form>

    <button onClick={handleClick} className='text-white bg-black mt-4 w-full rounded-lg'>Already have an Account?</button>
   
    </div>
</div>
    

</div>
)
}

export default Register