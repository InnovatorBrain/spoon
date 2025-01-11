export default function OnlineEducationContent() {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                    <p
                        className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-blue-500 text-white">
                        New Era of Learning
                    </p>
                </div>
                <h2
                    className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <span className="relative">Empower &nbsp;</span>
                    </span> 
                    your future with interactive online education
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    Join our platform to access expert teachers, engaging courses, and a personalized learning experience.
                </p>
            </div>

            <div className="grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3">
                <div className="flex flex-col sm:flex-row">
                    <div className="sm:mr-4">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50">
                            <svg className="w-12 h-12 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                <circle cx="26" cy="26" r="25" strokeWidth="3" fill="none" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-2 font-semibold leading-5">Expert Teachers</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Learn from experienced professionals who provide guidance and support throughout your educational journey.
                        </p>
                        <ul className="mb-4 -ml-1 space-y-2">
                            <li className="flex items-start">
                                <span className="mr-1">
                                    <svg className="w-5 h-5 mt-px text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                        <circle cx="26" cy="26" r="25" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                                Personalized Tutoring
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1">
                                    <svg className="w-5 h-5 mt-px text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                        <circle cx="26" cy="26" r="25" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                                Real-Time Feedback
                            </li>
                        </ul>
                        <a href="/see-teachers" aria-label=""
                            className="inline-flex items-center font-semibold transition-colors duration-200 text-blue-400 hover:text-blue-800">
                            Meet Our Teachers
                        </a>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <div className="sm:mr-4">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50">
                            <svg className="w-12 h-12 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                <rect x="10" y="10" width="32" height="32" strokeWidth="3" fill="none" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-2 font-semibold leading-5">Interactive Courses</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Engage with interactive lessons, quizzes, and projects designed to make learning enjoyable and effective.
                        </p>
                        <ul className="mb-4 -ml-1 space-y-2">
                            <li className="flex items-start">
                                <span className="mr-1">
                                    <svg className="w-5 h-5 mt-px text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                        <rect x="10" y="10" width="32" height="32" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                                Gamified Learning
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1">
                                    <svg className="w-5 h-5 mt-px text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                        <rect x="10" y="10" width="32" height="32" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                                Comprehensive Curriculum
                            </li>
                        </ul>
                        <a href="/courses" aria-label=""
                            className="inline-flex items-center font-semibold transition-colors duration-200 text-blue-400 hover:text-blue-800">
                            Browse Courses
                        </a>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <div className="sm:mr-4">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50">
                            <svg className="w-12 h-12 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                <path d="M13 13 L39 39 M39 13 L13 39" strokeWidth="3" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-2 font-semibold leading-5">Wide Range of Subjects</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Choose from a diverse selection of subjects to suit your interests and career goals.
                        </p>
                        <ul className="mb-4 -ml-1 space-y-2">
                            <li className="flex items-start">
                                <span className="mr-1">
                                    <svg className="w-5 h-5 mt-px text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                        <path d="M13 13 L39 39 M39 13 L13 39" strokeWidth="3" />
                                    </svg>
                                </span>
                                Science and Technology
                            </li>
                            <li className="flex items-start">
                                <span className="mr-1">
                                    <svg className="w-5 h-5 mt-px text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
                                        <path d="M13 13 L39 39 M39 13 L13 39" strokeWidth="3" />
                                    </svg>
                                </span>
                                Arts and Humanities
                            </li>
                        </ul>
                        <a href="/subjects" aria-label=""
                            className="inline-flex items-center font-semibold transition-colors duration-200 text-blue-400 hover:text-blue-800">
                            Explore Subjects
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
