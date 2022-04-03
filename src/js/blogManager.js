import ExternalServices from "./externalServices";
import { renderListWithTemplate, renderWithTemplate } from "./util";

export default class BlogManager {
    constructor(parent, templateId, parentFeatured = null) {
        this.dataSource = new ExternalServices
        this.parent = parent
        this.parentFeatured = parentFeatured
        this.templateId = templateId
    }

    async renderFeaturedBlogs() {
        const blogs = await this.dataSource.getFeaturedBlogs()
        renderListWithTemplate(this.templateId, this.parentFeatured, blogs.items, this.renderBlogSummary)
    }

    async renderBlogSummaryList() {
        const blogs = await this.dataSource.getBlogs()
        renderListWithTemplate(this.templateId, this.parent, blogs.items, this.renderBlogSummary)
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
        clone.querySelector(".blog-summary-link").setAttribute("href", `/blogs/id/${blog.id}`)
        // Set Featured
        if (blog.featured == 'true') {
            const div = document.createElement('div')
            div.classList.add('blog-summary-featured')
            div.textContent = 'Featured!'
            clone.prepend(div)
        }
        return clone
    }

    async renderBlogDetail(id) {
        const blog = await this.dataSource.getBlogById(id)
        renderWithTemplate(this.templateId, this.parent, blog, this.renderBlogDetails)
    }

    renderBlogDetails(clone, blog) {
        // Set Title
        clone.querySelector(".blog-detail-title").textContent = blog.title
        // Set Author
        clone.querySelector(".blog-detail-author").textContent = blog.dName
        // Set Date
        clone.querySelector(".blog-detail-date").textContent = blog.date
        // Set Content
        clone.querySelector(".blog-detail-content").textContent = blog.content
        // Set Link
        clone.querySelector(".blog-detail-link").setAttribute("href", `/blogs/id/${blog.id}`)
        return clone
    }
}