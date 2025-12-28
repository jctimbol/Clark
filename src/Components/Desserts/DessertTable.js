import React, {useEffect, useState} from 'react';
import {getAllDesserts, editDessert, deleteDessert} from '../../APIFunctions/Desserts';
import {useSCE} from '../../Components/context/SceContext';

export function DessertTable() {
    const {user} = useSCE();

    const [desserts, setDesserts] = useState([]);
    const [editDessertId, setEditDessertId] = useState(null);
    const [tempData, setTempData] = useState({});

    const handleEdit = (dessert) => {
      setEditDessertId(dessert._id);
      setTempData(dessert);
    };

    //post edit
    const handleSave = async (dessert) => {
      await editDessert(dessert, user.token);
      setEditDessertId(null);
      await getDessertsFromDB();
    };

    const handleChange = (event) => {
      setTempData({...tempData, [event.target.name]: event.target.value})
    };

    const handleDelete = async (dessert) => {
      await deleteDessert(dessert, user.token);
      await getDessertsFromDB();
    };

    async function getDessertsFromDB() {
        const dessertsFromDB = await getAllDesserts();
        
        if(!dessertsFromDB.error) {
            setDesserts(dessertsFromDB.responseData);
        }
    };
    
    useEffect(() => {
        getDessertsFromDB();
    }, []);
    if(desserts.length === 0) return (
            <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                No desserts yet. </h1>
    );
    else {
        return (
        <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          </thead>
          <tbody>
            {desserts.map((dessert) => {
              return (
                <tr key={dessert._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex justify-between items-start">
                  <td>
                    {editDessertId == dessert._id ? (
                        <div className="grid grid-cols-2 gap-4 items-center">

                          <div className="flex flex-col gap-2">
                            <input name="title" type="text" value={tempData.title} onChange={handleChange}></input>
                            <input name="description" type="text" value={tempData.description} onChange={handleChange}></input>
                            <input name="rating" type="text" value={tempData.rating} onChange={handleChange}></input>
                          </div>

                          <div className="flex justify-end">
                            <button className="btn btn-sm" onClick = {() => handleSave(tempData)}>Save</button>
                          </div>

                        </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 items-center">
                        
                        <div className="flex flex-col gap-2">
                          <h2 className="text-xl px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {dessert.title}
                          </h2>
                          <h3 className="px-6 px-1">
                              {dessert.description}
                          </h3>
                          <h3 className="px-6 py-1 pb-6">
                              Rating: {dessert.rating}
                          </h3>
                        </div>

                        <div className="flex justify-end">
                          <button className="btn btn-sm" onClick={() => handleDelete(dessert)}>Delete</button>
                          <button className="btn btn-sm" onClick = {() => handleEdit(dessert)}>Edit</button>
                        </div>

                      </div>
                    )}
          
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}
}