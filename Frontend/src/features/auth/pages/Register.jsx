import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <h1 className="text-2xl font-semibold animate-pulse">Loading...</h1>
                </div>
            </main>
        )
    }

    return (
        <main className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
            <div className="flex flex-col gap-8 bg-gray-800/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
                <h1 className="text-4xl font-bold text-center text-white mb-2">
                    Create Account
                </h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-gray-300 font-medium">
                            Username
                        </label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            className="border border-gray-600 bg-gray-700/50 text-white px-4 py-3 rounded-xl outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200 placeholder-gray-400"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-300 font-medium">
                            Email Address
                        </label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="border border-gray-600 bg-gray-700/50 text-white px-4 py-3 rounded-xl outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200 placeholder-gray-400"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-300 font-medium">
                            Password
                        </label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="border border-gray-600 bg-gray-700/50 text-white px-4 py-3 rounded-xl outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200 placeholder-gray-400"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 active:scale-95 cursor-pointer text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-400">Already have an account? <Link to={'/login'} className='text-pink-400 hover:text-pink-300 font-medium transition-colors'>Login</Link></p>
            </div>
        </main>
    )
}

export default Register