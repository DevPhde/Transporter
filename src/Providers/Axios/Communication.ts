import axios from "axios";

export async function communication(path: string, data: object): Promise<any> {
    const config = {
        baseURL: 'localhost:3001',
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer token'
        },
    };

    axios.post(`/authentication${path}`, data, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return "Erro interno, tente novamente mais tarde."
        })
}