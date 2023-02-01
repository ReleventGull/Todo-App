


const BASE_URL = 'http://localhost:4500/api' || process.env.REACT_APP_BASE_URL

export const fetchUserTodos = async({token}) => {
    try {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "GET",
        headers : 
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
  },
}).then(response => response.json())
    return response
    }catch(error) {
        console.error('There was an error fetching all todos', error)
    }
}
export const fetchUser = async (token) => {
    try {
    const response = await fetch(`${BASE_URL}/users/me`, {
    headers : {
        'Authorization': `Bearer ${token}`
    }
    }).then(result => result.json())
    return response
    }catch(error) {
        console.error("There was an error fetching the user", error)
        throw error
    }
}
 export const loginUser = async ({username, password}) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(async(result) => await result.json())
        return response
    }catch(error) {
        console.error('There was an error logging in the user', error)
        throw error
    }
}

export const registerUser = async ({username, password}) => {
    try {
        
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(async(result) => result.json())
    return response
    }catch(error) {
        console.error("There was an error registering the user", error)
    }
}
export const createTodo = async({name, token, description, due_date}) => {
    try {
        const response = await fetch(`${BASE_URL}/todos`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                date: due_date
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error creating the todo in the api call", error)
        throw error
    }
}
export const addProfilePictures = async ({token, pfp}) => {
    try {
        const response = await fetch(`${BASE_URL}/users/profilePicture`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body :JSON.stringify({
                img : pfp
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an erroring adding the profile pictures", error)
        throw error
    }
}
export const getSingleTodo = async({id, token}) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: "GET",
            header: {
                'Content-Type' : 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.error("There was an error getting the todo by id", error)
        throw error
    }
}
export const updatedTodo = async ({todoId, isComplete = false, description, name, due_date, token}) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${todoId}` ,{
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:name,
                description: description,
                isComplete: isComplete,
                due_date: due_date
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error marking the todo as complete", error)
        error
    }
}

export const createNote = async({id, token, description}) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${id}/notes`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                description: description
            })
        }).then(response => response.json())
        return response
    }catch(error) {
        console.error("There was an error creating a note", error)
        throw error
    }
}

export const deleteNote = async({noteId, todoId, token}) => {
    try {
        const response = await fetch (`${BASE_URL}/todos/${todoId}/notes/${noteId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error deleting the Todo in the front end api", error)
        throw error
    }
}

export const deleteTodo = async({id, token}) => {
    try {
        const response = await fetch (`${BASE_URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error trying to delete the todo in src/api", error)
        throw error
    }
}
