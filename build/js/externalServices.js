const baseURL = 'http://localhost:3000/api'

export default class ExternalServices {
    constructor() {}

    async getBlogs(token) {
        const res = await fetch(baseURL + '/blogs', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await res.json()
        return data
    }

    async getBlogById(id, token) {
        const res = await fetch(baseURL + '/blogs?id=' + id, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await res.json()
        return data
    }

    async getBlogByUser(user, token) {
        const res = await fetch(baseURL + '/blogs?user=' + user, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
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
        const res = await fetch(baseURL + '/users', {
            method: 'POST',
            headers: {
                'Key': key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await res.json()
        return data
    }

    async register(fname, lname, email, password) {
        const res = await fetch(baseURL + '/users', {
            method: 'POST',
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                email: email,
                password: password
            })
        })
        const data = await res.json()
        return data
    }
}