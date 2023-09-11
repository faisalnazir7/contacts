import React,{useState} from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';

export default function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const[error,setError]=useState("");
  const navigator=useNavigate();
  const CreateContact = async() => {
    const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/contacts`,{
      method:'POST',
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:name,
        email:email,
        phone:phone
      })
    })
    const data=await response.json();
    if(!data.message){
      localStorage.setItem('user_data',JSON.stringify(data))
      localStorage.setItem('web_token',JSON.stringify(data.token))
      navigator('/contacts')
    }else{
      setError(data.message)
    }

  };
  return (
    <>
    <Navbar/>
        <section className='mt-16'>
      <div className="">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Add Contact</h2>
            <p className="text-red-400 font-semibold text-center mt-3">{error}</p>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    {' '}
                    Email{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                      {' '}
                      Phone{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Phone"
                      id="phone"
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={()=>
                      CreateContact()}>
                    Add Contact <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
          </div>
        </div>
    </section>
    </>
  )
}
