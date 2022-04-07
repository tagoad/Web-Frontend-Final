import ExternalServices from "./externalServices";
import BlogManager from "./blogManager";
import { loadTemplate, renderWithTemplate, alertMessage, validateEmail, setLocalStorage, getLocalStorage } from "./util";

export default class UserManager {
    // Constructor
    constructor(parent) {
        this.dataSource = new ExternalServices()
        this.blogManager = new BlogManager()
        this.parent = parent
    }

    // Clear Parent Element
    clearParent() {
        this.parent.innerHTML = ""
    }

    // Show Login Form
    async renderLoginForm() {
        this.clearParent()
        loadTemplate('../partials/login-form.html').then((template) => {
            renderWithTemplate(template, this.parent)
        }).then( () => this.attachLoginListeners())
    }

    // Show Register Form
    async renderResgisterForm() {
        this.clearParent()
        loadTemplate('../partials/register-form.html').then((template) => {
            renderWithTemplate(template, this.parent)
        }).then( () => this.attachRegisterListeners())
    }

    // Show Admin Portal
    async renderUserInfo(id=null) {
        const token = await getLocalStorage('token')
        const blogs = await this.dataSource.getBlogsByUser(token.user)
        this.clearParent()
        loadTemplate('../partials/user-info.html').then((template) => {
            renderWithTemplate(template, this.parent)
        }).then(() => {
            if(id) {
                this.setEditForm(id)
            }
            this.blogManager.parent = document.querySelector(".blog-summary-list")
            document.querySelector(".user-info-dname").textContent = token.dname
            this.blogManager.renderBlogSummaryList(blogs, true)
        }).then( () => this.attachUserInfoListeners())
    }

    // Attach Login Listeners
    attachLoginListeners() {
        document.getElementById("login").addEventListener("submit", async (e) => {
            e.preventDefault();
        
            // set to invalid if blank
            let valid = true
            const email = document.getElementById("loginEmail");
            if (!email.value || !validateEmail(email.value)) {
                email.classList.add("is-invalid");
                valid = false;
            } else {
                email.classList.remove("is-invalid");
            }
        
            const password = document.getElementById("loginPassword")
            if (!password.value) {
                password.classList.add("is-invalid");
                valid = false;
            } else {
                password.classList.remove("is-invalid");
            }
            if(!valid){
                return
            }
            this.dataSource.login(email.value, password.value).then((response) => {
                if(response.error) {
                    alertMessage(response.error, 'alert')
                } else {
                    alertMessage('Welcome to the app!', 'success')
                    setLocalStorage('token', response)
                    this.renderUserInfo()
                }
            })
        })
        document.getElementById("register-button").addEventListener("click", async (e) => {
            e.preventDefault();
            await this.renderResgisterForm()
        })
    }

    // Attach Register Listeners
    attachRegisterListeners() {
        document.getElementById("register").addEventListener("submit", async (e) => {
            e.preventDefault();
        
            // set to invalid if blank
            const fnameInput = document.getElementById("fname");
            let valid = true
            if (!fnameInput.value) {
                fnameInput.classList.add("is-invalid");
                valid = false;
            } else {
                fnameInput.classList.remove("is-invalid");
            }
            const lname = document.getElementById("lname");
            if (!lname.value) {
                lname.classList.add("is-invalid");
                valid = false;
            } else {
                lname.classList.remove("is-invalid");
            }
        
            const dname = document.getElementById("dname");
            if (!dname.value) {
                dname.classList.add("is-invalid");
                valid = false;
            } else {
                dname.classList.remove("is-invalid");
            }
        
            const email = document.getElementById("email");
            if (!email.value || !validateEmail(email.value)) {
                email.classList.add("is-invalid");
                valid = false;
            } else {
                email.classList.remove("is-invalid");
            }
        
            const password = document.getElementById("password")
            if (!password.value) {
                password.classList.add("is-invalid");
                valid = false;
            } else {
                password.classList.remove("is-invalid");
            }
            console.log(valid)
            if(!valid){
                return
            }
            let response = await this.dataSource.register(fnameInput.value, lname.value, dname.value, email.value, password.value)
            this.renderLoginForm().then(() => alertMessage('Welcome to the app! Please login in now', 'success'))
        })
    }

    // Attach User Info Listeners
    attachUserInfoListeners() {
        // Blog Creation Listener
        document.getElementById("create-blog").addEventListener("submit", async (e) => {
            e.preventDefault();
        
            // set to invalid if blank
            const titleInput = document.getElementById("title");
            let valid = true
            if (!titleInput.value) {
                titleInput.classList.add("is-invalid");
                valid = false;
            } else {
                titleInput.classList.remove("is-invalid");
            }
            const contentInput = document.getElementById("content");
            if (!contentInput.value) {
                contentInput.classList.add("is-invalid");
                valid = false;
            } else {
                contentInput.classList.remove("is-invalid");
            }

            const featuredInput = document.getElementById("featured")

            // Hidden inputs for editing
            const idInput = document.getElementById("blog-id")
            const dateInput = document.getElementById("date")

            console.log(valid)
            if(!valid){
                return
            }
            const token = await getLocalStorage('token')
            const blog = {
                title: titleInput.value,
                featured: featuredInput.checked ? 'true' : 'false',
                summary: contentInput.value.length > 100 ? contentInput.value.substring(0, 100) + '...' : contentInput.value,
                content: contentInput.value,
                date: dateInput.value ? dateInput.value : new Date().toLocaleDateString("en-US"),
                id: idInput.value ? idInput.value : null,
                user: token.user,
                dName: token.dname
            }
            let response = await this.dataSource.postBlog(blog, token.token)
            if(response.error) {
                alertMessage(response.error, 'alert')
            } else {
                this.renderUserInfo().then(() => alertMessage('Blogging Success!', 'success'))
                window.history.replaceState({}, 'Papyrus | Admin', '/admin')
            }
        })
        // Creation Button Listener - Toggle Create Form
        document.getElementById("create-button").addEventListener("click", async (e) => {
            e.preventDefault();
            document.getElementById("create-wrapper").classList.toggle("visually-hidden")
            window.scrollTo(0, 0)
        })
        // Logout Button - Clears Token and redirects
        document.getElementById("logout-button").addEventListener("click", async (e) => {
            e.preventDefault();
            localStorage.removeItem('token')
            this.renderLoginForm()
        })
    }

    // Feed Blog data for editing
    async setEditForm(id) {
        const blog = await this.dataSource.getBlogById(id)
        document.getElementById("title").value = blog.title
        document.getElementById("content").value = blog.content
        document.getElementById("featured").checked = blog.featured === 'true'
        document.getElementById("blog-id").value = blog.id
        document.getElementById("date").value = blog.date
        document.getElementById("create-wrapper").classList.remove("visually-hidden")
    }

}