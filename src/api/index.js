const BASE_URL = 'http://localhost:4500/api'

export const fetchAllTodos = async() => {
    try {
    const response = await fetch(`${BASE_URL}/todos`).then(response => response.json())
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