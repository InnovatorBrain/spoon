export default function Pricing() {
    return (
        <>
            <section className="py-20 bg-gray-100 text-gray-800">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto mb-16 text-center">
                        <span className="font-bold tracking-wider uppercase text-green-600">Pricing</span>
                        <h2 className="text-4xl font-bold lg:text-5xl">Choose Your Best Plan</h2>
                    </div>
                    <div className="flex flex-wrap justify-center -mx-4">
                        <div className="flex w-full sm:px-4 md:w-1/2 lg:w-1/3">
                            <div className="flex flex-col p-8 space-y-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-2">
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold text-gray-800">Beginner</h4>
                                    <span className="text-5xl font-bold text-green-600">Free</span>
                                </div>
                                <p className="mt-3 text-gray-600">Perfect for individuals just starting out.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Feature 1</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Feature 2</span>
                                    </li>
                                </ul>
                                <button className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700">
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <div className="flex w-full sm:px-4 md:w-1/2 lg:w-1/3">
                            <div className="flex flex-col p-8 space-y-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-2">
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold text-gray-800">Pro</h4>
                                    <span className="text-5xl font-bold text-green-600">$24<span className="text-sm text-gray-600">/month</span></span>
                                </div>
                                <p className="mt-3 text-gray-600">Best for professionals needing advanced features.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>All Beginner Features</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Additional Pro Features</span>
                                    </li>
                                </ul>
                                <button className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
