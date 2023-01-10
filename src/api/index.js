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
        console.log(error)
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

export const getSingleTodo = async({id, token}) => {
    try {
        console.log('Id is here right', id)
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
        throw error
    }
    
}