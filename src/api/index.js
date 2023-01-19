


const BASE_URL = 'http://localhost:4500/api'

export const fetchUserTodos = async({token}) => {
    try {
    const response = await fetch(`${BASE_URL}/users/me`, {
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

 export const loginUser = async ({username, password}) => {
    try {
        console.log(username, password)
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
        console.log(error)/home/jaron/SelfProjects/ToDo/src/api
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
                due_date: due_date
            })
        }).then(result => result.json())
        console.log(response)
        return response
    }catch(error) {
        console.error("There was an error creating the todo in the api call", error)
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
        console.log(result)
        return result
    }catch(error){
        console.error("There was an error getting the todo by id", error)
        throw error
    }
}
export const completeTodo = async ({todoId, isComplete, token}) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${todoId}` ,{
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isComplete: isComplete
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