const BASE_URL = 'http://localhost:4500/api'

export const fetchAllTodos = async() => {
    try {
    const response = await fetch(`${BASE_URL}/todos`).then(response => response.json())
    return response
    }catch(error) {
        console.error('There was an error fetching all todos', error)
    }
}

