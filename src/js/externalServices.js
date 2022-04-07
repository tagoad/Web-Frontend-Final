import { setLocalStorage, getLocalStorage } from "./util"
const baseURL = 'http://localhost:3000/api'

export default class ExternalServices {

    async getBlogs() {
        const res = await fetch(baseURL + '/blogs')
        const data = await res.json()
        return data
    }

    async getFeaturedBlogs() {
        const res = await fetch(baseURL + '/blogs/featured')
        const data = await res.json()
        return data
    }

    async getBlogById(id) {
        console.log(id)
        const res = await fetch(baseURL + '/blogs/id/' + id)
        const data = await res.json()
        console.log(data)
        return data.items.pop()
    }

    async getBlogByUser(user) {
        const res = await fetch(baseURL + '/blogs?user=' + user)
        const data = await res.json()
        return data
    }

    async postBlog(blog, token) {
        const res = await fetch(baseURL + '/blogs', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        return data
    }

    async deleteBlog(id, token) {
        const res = await fetch(baseURL + '/blogs?id=' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await res.json()
        return data
    }

    async login(email, password) {
        const res = await fetch(baseURL + '/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await res.json()
        setLocalStorage('token', data.token)
    }

    async register(fname, lname, dname, email, password) {
        const res = await fetch(baseURL + '/users/register', {
            method: 'POST',
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                dname: dname,
                email: email,
                password: password
            })
        })
        const data = await res.json()
        return data
    }
}