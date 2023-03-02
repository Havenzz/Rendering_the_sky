import axios from 'axios';

export const MockUrl = axios.create({
    baseURL:'https://www.fastmock.site/mock/79cad79f260f92472890423eddf0c375/caretblog',
    timeout:5000
})
