//File to store URLs for clean code
// Values have been defined as functions so that we can pass arguments to the URL

const API_ROOT = "http://codeial.codingninjas.com:8000/api/v2"

export const APIUrls = {
    login: `${API_ROOT}/users/login`,
    signup: `${API_ROOT}/users/signup`,
    fetchPosts: (page = 1, limit = 5) =>
        `${API_ROOT}/posts?page=${page}&limit=${limit}`
}