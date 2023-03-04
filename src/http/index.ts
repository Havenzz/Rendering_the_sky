import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

export const MockUrl = axios.create({
    baseURL:'https://www.fastmock.site/mock/79cad79f260f92472890423eddf0c375/caretblog',
    timeout:5000
})

export const getArtcile = (articleData:any) => {
    axios.get('/article',articleData).then(res => res.data)
}

export const addArtcile = (articleData:any) => {
    axios.post('/article',{ params: articleData }).then(res => res.data)
}

export const updateArtcile = (articleData:any) => {
    axios.patch(`/article/${articleData.id}`,articleData).then(res => res.data)
}

export const deleteArtcile = (articleDataId:any) => {
    axios.post(`/article/${articleDataId}`).then(res => res.data)
}