import ExternalServices from "./externalServices";
import { renderListWithTemplate, renderWithTemplateId, loadTemplate, renderWithTemplate } from "./util";

export default class BlogManager {
    constructor(parent, templateId) {
        this.dataSource = new ExternalServices
        this.parent = parent
        this.templateId = templateId
    }

    async renderFeaturedBlogs() {
        const blogs = await this.dataSource.getFeaturedBlogs()
        loadTemplate('../partials/blog-summary.html').then((template) => {
            renderListWithTemplate(template, this.parent, blogs.items, this.renderBlogSummary)
        })
    }

    async renderBlogSummaryList() {
        const blogs = await this.dataSource.getBlogs()
        loadTemplate('../partials/blog-summary.html').then((template) => {
            console.log(template)
            renderListWithTemplate(template, this.parent, blogs.items, this.renderBlogSummary)
        })
    }

    renderBlogSummary(clone, blog) {
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
        console.log(blog)
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