// const baseURL = "http://localhost:3000/api"
const baseURL = "https://web-frontend-final-api.vercel.app/api";

export default class ExternalServices {
  // Get All Blogs
  async getBlogs() {
    const res = await fetch(baseURL + "/blogs");
    const data = await res.json();
    return data;
  }

  // Get Featured Blogs
  async getFeaturedBlogs() {
    const res = await fetch(baseURL + "/blogs/featured");
    const data = await res.json();
    return data;
  }

  // Get Blog By Id
  async getBlogById(id) {
    const res = await fetch(baseURL + "/blogs/id/" + id);
    const data = await res.json();
    return data.items.pop();
  }

  // Get Blog by a User
  async getBlogsByUser(user) {
    const res = await fetch(baseURL + "/blogs/user/" + user);
    const data = await res.json();
    return data;
  }

  // Create/Update a Blog
  async postBlog(blog, token) {
    const res = await fetch(baseURL + "/blogs", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(blog),
    })
      .then((data) => data.json())
      .catch((err) => err.json());
    return res;
  }

  // Delete a Blog
  async deleteBlog(id, token) {
    const res = await fetch(baseURL + "/blogs/id/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  }

  // Get User Token
  async login(email, password) {
    const res = await fetch(baseURL + "/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    return data;
  }

  // Create User
  async register(fname, lname, dname, email, password) {
    const res = await fetch(baseURL + "/users/register", {
      method: "POST",
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        dname: dname,
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    return data;
  }
}
