import { ApiResponse } from './ApiResponses';
// if you are running the website with `sce run c`
// change the below string to:
// http://localhost:8080/api
const DESSERT_API_URL = 'http://localhost:8084';

export async function getAllDesserts() {
    let status = new ApiResponse();
    try {
        const res = await fetch(DESSERT_API_URL + '/Dessert/getDesserts');
        if(res.ok) status.responseData = await res.json();
        else status.error = true;
    }
    catch(err) {
        status.responseData = err;
        status.error = true;
    }
    return status;
}

export async function createDessert(newDessert, token) {
    let status = new ApiResponse();
    try {
        const res = await fetch(DESSERT_API_URL + '/Dessert/createDessert', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': `${newDessert.title}`,
                'description': `${newDessert.description}`,
                'rating': `${newDessert.rating}`
            })
        });
        if(res.ok) status.responseData = await res.json();
        else status.error = true;
    } catch(err) {
        status.responseData = err;
        status.error = true;
    }
    return status;
}

export async function editDessert(editedDessert, token) {
    let status = new ApiResponse();
    try {
        const res = await fetch(DESSERT_API_URL + '/Dessert/editDessert', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                '_id': `${editedDessert._id}`,
                'title': `${editedDessert.title}`,
                'description': `${editedDessert.description}`,
                'rating': `${editedDessert.rating}`
            })
        });
        if(res.ok) status.responseData = await res.json();
        else status.error = true;
    } catch(err) {
        status.responseData = err;
        status.error = true;
    }
    return status;
}

export async function deleteDessert(dessertToDelete, token) {
    let status = new ApiResponse();
    try {
        const res = await fetch(DESSERT_API_URL + '/Dessert/deleteDessert', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                '_id': `${dessertToDelete._id}`,
            })
        });
        if(res.ok) status.responseData = await res.json();
        else status.error = true;
    } catch(err) {
        status.responseData = err;
        status.error = true;
    }
    return status;
}