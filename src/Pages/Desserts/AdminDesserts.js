import React, {useEffect, useState} from 'react';
import {getAllDesserts, createDessert} from '../../APIFunctions/Desserts';
import {useSCE} from '../../Components/context/SceContext';
import {DessertTable} from '../../Components/Desserts/DessertTable';

export default function AdminDessertPage() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [rating, setRating] = useState();
    const {user} = useSCE();
    
    const INPUT_CLASS = 'indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-white';

    return (
        <div className='m-10'>
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Welcome to the Dessert Admin Page!!
            </h1>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-full sm:grid-cols-6">
                <div className="col-span-full sm:col-span-4">
               
                <div className="mt-2">
                    <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={INPUT_CLASS}
                    />
                </div>
                </div>
                <div className="col-span-full sm:col-span-4">
               
                <div className="mt-2">
                    <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className={INPUT_CLASS}
                    />
                </div>
                </div>
                <div className="col-span-full sm:col-span-4">
               
                <div className="mt-2">
                    <input
                    type="text"
                    name="rating"
                    id="rating"
                    placeholder="Rating"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    className={INPUT_CLASS}
                    />
                </div>
                </div>
                <div className="col-span-full sm:col-span-4">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => createDessert({
                    title,
                    description,
                    rating,
                    }, user.token)}
                >
                    Save
                </button>
                </div>
            </div>
            <DessertTable/>
        </div>
    )
}