import React from 'react';

function WelcomePage() {
    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            {/* Navigation Menu */}
            <nav className="bg-white shadow-md py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <a className="text-2xl font-bold text-gray-800" href="/">ProductApp</a>
                    <div>
                        <a className="px-4 py-2 text-blue-600 hover:text-blue-800" href="/login">Login</a>
                        <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" href="/register">Register</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container mx-auto flex items-center justify-center flex-grow">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Welcome to ProductApp
                    </h1>
                    <p className="text-xl text-gray-700 mb-8">
                        Your all-in-one solution for managing products efficiently.
                    </p>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;