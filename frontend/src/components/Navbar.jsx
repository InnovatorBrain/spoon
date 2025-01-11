import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Fragment, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = {
    categories: [
        {
            id: 'Online Courses',
            name: 'Online Courses',
            featured: [
                {
                    name: 'Register Yourself',
                    href: '#',
                    imageSrc: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/RE4CA2I-Panel03-FeaturePriority-3Things-1-feature?scl=1',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'You can learn from anywhere and everywhere',
                    href: '#',
                    imageSrc: 'https://static.vecteezy.com/system/resources/previews/001/269/528/large_2x/young-collage-student-using-computer-to-study-online-free-photo.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: '1-on-1 Tuition',
                    name: '1-on-1 Tuition',
                    items: [
                        { name: 'IGCSE Tuitions', href: '#' },
                        { name: 'IB Tuition', href: '#' },
                        { name: 'AS & A Level Tuitions', href: '#' },

                    ],
                },
                {
                    id: 'Achievers Course (Exam Focused)',
                    name: 'Achievers Course (Exam Focused)',
                    p: 'Intensive course for high exam performance',
                    items: [
                        { name: 'Checkpoint Achievers Course', href: '#' },
                        { name: 'IGCSE Achievers Course', href: '#' },
                        { name: 'A Level Achievers Course', href: '#' },

                    ],
                },

            ],
        },
        {
            id: 'Learn',
            name: 'Learn',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: 'company' },
        { name: 'See Teachers', href: 'see-teachers' },
        { name: 'Pricing', href: 'pricing' },
    ],
}
export default function Navbar() {
    const [open, setOpen] = useState(false)
    const handleProfileClick = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get('http://127.0.0.1:8000/asd/profile/');
                console.log('Profile Data:', response.data);
                redirectToProfile(response.data);
            } else {
                // If not authenticated, navigate to login
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error fetching user profile', error);
            // Handle error fetching profile data, maybe redirect to a default route
        }
    };

    const redirectToProfile = (userData) => {
        if (userData.student_profile) {
            window.location.href = '/student-pro';
        } else if (userData.teacher_profile) {
            window.location.href = '/teacher-pro';
        } else {
            // If user has no specific profile type, you may want to handle this case
            console.error('User has no specific profile type');
            window.location.href = '/login';
        }
    };

    return (
        <>
            <div className="bg-[#fff] relative z-40 font-sans font-serif text-lg sticky top-0 shadow-md  ">
                {/* Mobile menu */}
                <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <div className="flex px-4 pb-2 pt-5">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>

                            {/* Links */}
                            <TabGroup className="mt-2">
                                <div className="border-b border-gray-200">
                                    <TabList className="-mb-px flex space-x-8 px-4">
                                        {navigation.categories.map((category) => (
                                            <Tab
                                                key={category.name}
                                                className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                                            >
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </TabList>
                                </div>
                                <TabPanels as={Fragment}>
                                    {navigation.categories.map((category) => (
                                        <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-sm">
                                                        <img
                                                            alt={item.imageAlt}
                                                            src={item.imageSrc}
                                                            className="  rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                        />
                                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                            {item.name}
                                                        </a>
                                                        <p aria-hidden="true" className="mt-1">
                                                            Register Yourself
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                        className="mt-6 flex flex-col space-y-6"
                                                    >
                                                        {section.items.map((item) => (
                                                            <li key={item.name} className="flow-root">
                                                                <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </TabGroup>

                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                            {page.name}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                <div className="flow-root">
                                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                        Sign in
                                    </a>
                                </div>
                                <div className="flow-root">
                                    <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                                        Signup
                                    </Link>
                                </div>
                            </div>


                        </DialogPanel>
                    </div>
                </Dialog>

                <header className="relative bg-white">


                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon aria-hidden="true" className="size-6" />
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <Link to="/">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            src="https://mcqmate.com/public/images/logos/60x60.png"
                                            alt="logo"
                                            className="h-8 w-8"
                                        />
                                    </Link>
                                </div>

                                {/* Flyout menus */}
                                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
                                                <div className="relative flex">
                                                    <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                                                        {category.name}
                                                    </PopoverButton>
                                                </div>

                                                <PopoverPanel
                                                    transition
                                                    className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                                >
                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                    <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                                                    <div className="relative bg-white">
                                                        <div className="mx-auto max-w-7xl px-8">
                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                    {category.featured.map((item) => (
                                                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                                                            <img
                                                                                alt={item.imageAlt}
                                                                                src={item.imageSrc}
                                                                                className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                                            />
                                                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                {item.name}
                                                                            </a>
                                                                            <p aria-hidden="true" className="mt-1">
                                                                                Login or Signup                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                    {category.sections.map((section) => (
                                                                        <div key={section.name}>
                                                                            <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                {section.name}
                                                                            </p>
                                                                            <ul
                                                                                role="list"
                                                                                aria-labelledby={`${section.name}-heading`}
                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                            >
                                                                                {section.items.map((item) => (
                                                                                    <li key={item.name} className="flex">
                                                                                        <a href={item.href} className="hover:text-gray-800">
                                                                                            {item.name}
                                                                                        </a>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverPanel>
                                            </Popover>
                                        ))}

                                        {navigation.pages.map((page) => (
                                            <a
                                                key={page.name}
                                                href={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {page.name}
                                            </a>
                                        ))}
                                    </div>
                                </PopoverGroup>

                                <div className="ml-auto flex items-center">
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <Link
                                            to="" onClick={handleProfileClick}
                                            className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 bg-opacity-10 flex items-center group"
                                        >
                                            <span className="mr-2">Login</span>

                                        </Link>
                            
                                        <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                        <Link
                                            to="/signup"
                                            className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 bg-opacity-10 flex items-center group"
                                        >
                                            <span className="mr-2">Create Account</span>
                                            <svg
                                                className="stroke-current"
                                                width="10"
                                                height="10"
                                                strokeWidth="2"
                                                viewBox="0 0 10 10"
                                                aria-hidden="true"
                                            >
                                                <g fillRule="evenodd">
                                                    <path
                                                        className="opacity-0 group-hover:opacity-100 transition ease-in-out duration-200"
                                                        d="M0 5h7"
                                                    ></path>
                                                    <path
                                                        className="opacity-100 group-hover:transform group-hover:translate-x-1 transition ease-in-out duration-200"
                                                        d="M1 1l4 4-4 4"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>

    )
}

