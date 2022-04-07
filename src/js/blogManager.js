import ExternalServices from "./externalServices";
import { renderListWithTemplate, loadTemplate, renderWithTemplate } from "./util";

export default class BlogManager {
    constructor(parent) {
        this.dataSource = new ExternalServices()
        this.parent = parent
    }

    async renderFeaturedBlogs() {
        const blogs = await this.dataSource.getFeaturedBlogs()
        loadTemplate('../partials/blog-summary.html').then((template) => {
            renderListWithTemplate(template, this.parent, blogs.items, this.renderBlogSummary)
        })
    }

    async renderBlogSummaryList(blogs = null, admin=null) {
        if (blogs == null) {
            blogs = await this.dataSource.getBlogs()
        }
        loadTemplate('../partials/blog-summary.html').then((template) => {
            console.log(template)
            renderListWithTemplate(template, this.parent, blogs.items, this.renderBlogSummary, admin)
        })
    }

    renderBlogSummary(clone, blog, admin=null) {
        // Set Title
        clone.querySelector(".blog-summary-title").textContent = blog.title
        // Set Author
        clone.querySelector(".blog-summary-author").textContent = 'by ' + blog.dName
        // Set Date
        clone.querySelector(".blog-summary-date").textContent = blog.date
        // Set Content
        clone.querySelector(".blog-summary-content").textContent = blog.summary
        // Set Link
        clone.querySelector(".blog-summary-link").setAttribute("href", `/blog-details?id=${blog.id}`)
        // Set Featured
        if (blog.featured == 'true') {
            clone.querySelector(".blog-summary-featured").textContent = 'Featured!'
        }
        if(admin) {
            // Add edit button
            const editButton = document.createElement("button")
            editButton.classList.add("btn", "btn-primary")
            editButton.textContent = "Edit"
            editButton.addEventListener("click", () => {
                window.location.href = `/admin?id=${blog.id}`
            })
            clone.querySelector(".admin-buttons").appendChild(editButton)
            // Add delete button
            const deleteButton = document.createElement("button")
            deleteButton.classList.add("btn", "btn-danger")
            deleteButton.textContent = "Delete"
            deleteButton.addEventListener("click", () => {
                // Get confirmation
                if (confirm("Are you sure you want to delete this blog?")) {
                    const dataSource = new ExternalServices()
                    console.log(blog.id)
                    dataSource.deleteBlog(blog.id).then(() => {
                        window.location.href = "/admin"
                    })
                }
            })
            clone.querySelector(".admin-buttons").appendChild(deleteButton)
        }
        return clone
    }

    async renderBlogDetail(id) {
        const blog = await this.dataSource.getBlogById(id)
        loadTemplate('../partials/blog-details.html').then((template) => {
            console.log(template)
            renderWithTemplate(template, this.parent, blog, this.renderBlogDetails)
        })
    }

    renderBlogDetails(clone, blog) {
        // Set Title
        clone.querySelector(".blog-details-title").textContent = blog.title
        // Set Author
        clone.querySelector(".blog-details-author").textContent = blog.dName
        // Set Date
        clone.querySelector(".blog-details-date").textContent = blog.date
        // Set Content
        clone.querySelector(".blog-details-content").textContent = blog.content
        return clone
    }
}