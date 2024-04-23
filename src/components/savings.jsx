import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const Savings = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const[succesfulMessage, setSucessfulMessage] = useState('');
    const [savedItems, setSavedItems] = useState([]);
    const[formData, setFormData] = useState({ //data to be submmited and saved
        name:'',
        price:'',
        moNeyTowardsItem:'',
        dateStarted:''


    });

    useEffect(() => { //To display the items right when the user logs in
        fetchSavedItems();
    },[]);

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    };

    const handleSubmit = async (e) => {
        
       e.preventDefault();
       console.log('Form data',formData);
        try {
            
            const itemData = {
                name: formData.name,
                price: formData.price,
                moNeyTowardsItem: formData.moNeyTowardsItem,
                dateStarted: formData.dateStarted
                
            };

            const sessionToken = Cookies.get('session'); //get the session cookie
            console.log('Session Token:', sessionToken); //display it in console to check if working
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
                }
            };
           
            //send data to the backend to save under the user in the database
            const response = await axios.post('http://localhost:8080/api/user/savings', itemData,config);
           
            console.log('Item saved succesfully:', response.data);
             setErrorMessage('');
             setSucessfulMessage('Item was saved succesfully, please refresh page');
            
        } catch (error) { //if there is an error diplay a message
            if (error.response) {
                console.error('Item save failed:', error.response.data);
                setErrorMessage("Fill in all required fields");
                
            } else if (error.request) {
                console.error('Network error:', error.request);
                
            } else {
                console.error('Error:', error.message);
                
            }
        }
    };
    const fetchSavedItems = async () => { 
           try { 
            const sessionToken = Cookies.get('session'); //get the cookie
            const config = {
               withCredentials: true,
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
                }
            };
            //now call backend to get all the users items
            const response = await axios.get('http://localhost:8080/api/display', config); 
            setSavedItems(response.data);
        } catch (error) { //if an error occurs display a message in console
            console.error('Error fetching saved items:', error);
        }
    }; 

    const handleDelete = async (id) => { //take the id of the element wanted to be deleted
        try{                             //then send to backend
          await axios.delete('http://localhost:8080/api/delete/'+ id);
            fetchSavedItems();
        }catch (error){
            console.error('Error deleting item:', error);
            setErrorMessage('Error deleting item');
        }

    };
     
return(
<div className='m-auto h-screen bg-gradient-to-r from-emerald-500 to-emerald-900'>
<h1 className='text-4xl font-bold text-center font-serif p-4 text-white'>Add Item</h1>
<form onSubmit={handleSubmit}>
<div className='grid grid-cols-4 gap-4 w-full px-10 py-2'>

<div className="flex flex-col py-2">
    <label className="uppercase text-sm py-2 text-white">Name*</label>
    <input className='border-1 rounded-lg p-1 flex border-gray-400' type="text" name='name' value={formData.name} onChange={handleChange}/>
</div>

<div className="flex flex-col py-2">
    <label className="uppercase text-sm py-2 text-white">Price*</label>
    <input className='border-1 rounded-lg p-1 flex border-gray-400' type="number" name='price' value={formData.price} onChange={handleChange}/>
</div>

<div className="flex flex-col py-2">
    <label className="uppercase text-sm py-2 text-white">Money Torward Item*</label>
    <input className='border-1 rounded-lg p-1 flex border-gray-400' type="number" name='moNeyTowardsItem' value={formData.moNeyTowardsItem} onChange={handleChange}/>
</div>

<div className="flex flex-col py-2">
    <label className="uppercase text-sm py-2 text-white">Date Started (optional)</label>
    <input className='border-1 rounded-lg p-1 flex border-gray-400' type="text" name='dateStarted' value={formData.dateStarted} onChange={handleChange}/>
</div>
</div>
<div className='flex justify-center'>
<button type="submit" className=' bg-black text-gray-100 mt-4 p-4 rounded-lg'>Add Item</button>
</div>
{errorMessage && <div className="error flex text-center justify-center bg-red-800 mt-4 rounded-lg text-white"> {errorMessage} </div>}
{succesfulMessage && <div className="flex text-center justify-center bg-green-500 mt-4 rounded-lg text-white"> {succesfulMessage} </div>}
</form>

<div className='flex justify-center items-center p-10 font-serif text-white '>
<h2 className='text-3xl font-bold'>Items Saved</h2>
</div>

<div className='flex text-2xl text-white justify-center px-10 '>
<table className='p-10'>
    <thead>
        <tr>
            <th className='px-10'  scope='col'>Name</th>
            <th className='px-10'  scope='col'>Cost</th>
            <th className='px-10'  scope='col'>Money Towards Item</th>
            <th className='px-10'  scope='col'>Date Started</th>
        </tr>
    </thead>
    <tbody>
        {savedItems.map(item => (
            <tr  key={item.id}>
                <td className='px-10'>{item.name}</td>
                <td className='px-10'>{item.price}</td>
                <td className='px-10'>{item.moNeyTowardsItem}</td>
                <td className='px-10'>{item.dateStarted}</td>
                <td>
                    <button type="button" onClick={() => handleDelete(item.id)} className='flex bg-red-700 rounded-lg p-2'>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

</div> 



</div>

)

}

export default Savings 

