
let baseUrl = "http://localhost:8989/api/v1/m-biodata"
export const MBiodataService = {
    async findById(id){
        const response = await fetch(baseUrl + '/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response_json = await response.json();
        return response_json.data
    },
    async pagination(page, size){
        const response = await fetch(baseUrl + '/pagination?page=' + page + '&size=' + size, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response_json = await response.json();
        return response_json.data
    },
    async create(data){
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}