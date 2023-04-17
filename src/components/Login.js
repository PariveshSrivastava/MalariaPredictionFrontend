import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'

export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [checkPass,setCheckPass] = useState(true)

    const navigate = useNavigate()

    async function loginUser() {
        const response = await fetch('http://localhost:2000/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        
        const data = await response.json()

        if(data.user){
            localStorage.clear();
            localStorage.setItem('token', data.user)

            navigate('/')
            
            // window.location.href = '/AdminPage'
        }else{
            setCheckPass(checkPass => !checkPass)
            // alert('please check username and password')
        }
    }


    let confirmText = checkPass ? ' hidden' : ' ';


    return (
        <div>
            <div
                className="relative flex text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-3 sm:py-12">
                <div className="relative py-3 sm:w-96 mx-auto text-center">
                    <span className="text-2xl font-light">Login to your account</span>
                    <div className="mt-4 bg-white shadow-md rounded-2xl text-left">
                        <div className="h-3 bg-teal-400 rounded-t-2xl"></div>
                        <div className="px-8 pt-6 pb-3">
                            
                            <label className="block font-semibold text-sm"> Email </label>
                            <input 
                                value ={email}
                                onChange = {(e) => setEmail(e.target.value)}
                                type="text" 
                                placeholder="Email"
                                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-emerald-500 focus:ring-1 rounded-full" />
                            
                            <label className="block mt-3 font-semibold text-sm"> Password </label>
                            <input 
                                value ={password}
                                onChange = {(e) => setPassword(e.target.value)}
                                type="password" 
                                placeholder="Password"
                                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-emerald-500 focus:ring-1 rounded-full" />
                            
                            
                            
                            <div className='text-sm pt-2 text-red-500'>
                                <p className={`${confirmText}`}>Email or password is wrong</p>
                            </div>
                            <button 
                                onClick={loginUser}
                                type="submit"
                                className="text-center w-full mt-3 bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-400 ">Login</button>
                            <div className="flex justify-between items-baseline">
                                <Link to="/SignUp" className="py-2 cursor-pointer text-sm block"> Dont have an account?</Link>
                                <Link to="/" className="text-sm hover:underline">Forgot password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
