import ExternalServices from "./externalServices";
import { renderListWithTemplate, renderWithTemplateId, loadTemplate } from "./util";

export default class BlogManager {
    constructor(parent, templateId) {
        this.dataSource = new ExternalServices
        this.parent = parent
        this.templateId = templateId
    }

    async renderFeaturedBlogs() {
        const blogs = await this.dataSource.getFeaturedBlogs()
        loadTemplate('../partials/blog-summary.html').then((template) => {
            console.log(template)
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
        clone.querySelector(".blog-summary-link").setAttribute("href", `/blog?id=${blog.id}`)
        // Set Featured
        if (blog.featured == 'true') {
            clone.querySelector(".blog-summary-featured").textContent = 'Featured!'
        }
        return clone
    }

    async renderBlogDetail(id) {
        const blog = await this.dataSource.getBlogById(id)
        renderWithTemplateId(this.templateId, this.parent, blog, this.renderBlogDetails)
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