import axios from "axios"

const baseUrl = '/api/products'

const getAll = () => {
    return axios.get(baseUrl)
            .then(response => response.data)
}

const create = (productObject) => {
    return axios.post(baseUrl, productObject)
            .then(response => response.data)
}

const update = (productObject) => {
    return axios.put(baseUrl+'/'+productObject.id, productObject)
                .then(response => response.data)
}

export default {getAll, create, update}




