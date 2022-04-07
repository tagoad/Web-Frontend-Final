import ExternalServices from "./externalServices.js";
import {
  renderListWithTemplate,
  loadTemplate,
  renderWithTemplate,
} from "./util.js";

export default class BlogManager {
  // Default constructor
  constructor(parent) {
    this.dataSource = new ExternalServices();
    this.parent = parent;
  }

  // Get and Render All Featured Blogs
  async renderFeaturedBlogs() {
    const blogs = await this.dataSource.getFeaturedBlogs();
    // sort blogs
    blogs.items.sort((a, b) => new Date(b.date) - new Date(a.date));
    loadTemplate("../partials/blog-summary.html").then((template) => {
      renderListWithTemplate(
        template,
        this.parent,
        blogs.items,
        this.renderBlogSummary
      );
    });
  }

  // Get and Render All Blogs
  async renderBlogSummaryList(blogs = null, admin = null) {
    let bloglist = blogs;
    if (bloglist == null) {
      bloglist = await this.dataSource.getBlogs();
    }
    // sort blogs
    bloglist.items.sort((a, b) => new Date(b.date) - new Date(a.date));
    loadTemplate("../partials/blog-summary.html").then((template) => {
      renderListWithTemplate(
        template,
        this.parent,
        bloglist.items,
        this.renderBlogSummary,
        admin
      );
    });
  }

  // Render Blog Summary with optional admin flag
  renderBlogSummary(clone, blog, admin = null) {
    // Set Title
    clone.querySelector(".blog-summary-title").textContent = blog.title;
    // Set Author
    clone.querySelector(".blog-summary-author").textContent =
      "by " + blog.dName;
    // Set Date
    clone.querySelector(".blog-summary-date").textContent = blog.date;
    // Set Content
    clone.querySelector(".blog-summary-content").textContent = blog.summary;
    // Set Link
    clone
      .querySelector(".blog-summary-link")
      .setAttribute("href", `/blog-details?id=${blog.id}`);
    // Set Featured
    if (blog.featured == "true") {
      clone.querySelector(".blog-summary-featured").textContent = "Featured!";
    }
    if (admin) {
      // Add edit button
      const editButton = document.createElement("button");
      editButton.classList.add("btn", "btn-primary");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        window.location.href = `/admin?id=${blog.id}`;
      });
      clone.querySelector(".admin-buttons").appendChild(editButton);
      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        // Get confirmation
        if (confirm("Are you sure you want to delete this blog?")) {
          const dataSource = new ExternalServices();

          dataSource.deleteBlog(blog.id).then(() => {
            window.location.href = "/admin";
          });
        }
      });
      clone.querySelector(".admin-buttons").appendChild(deleteButton);
    }
    return clone;
  }

  // Get and Render Blog Detail
  async renderBlogDetail(id) {
    const blog = await this.dataSource.getBlogById(id);
    loadTemplate("../partials/blog-details.html").then((template) => {
      renderWithTemplate(template, this.parent, blog, this.renderBlogDetails);
    });
  }

  // Render Blog Details
  renderBlogDetails(clone, blog) {
    // Set Title
    clone.querySelector(".blog-details-title").textContent = blog.title;
    // Set Author
    clone.querySelector(".blog-details-author").textContent = blog.dName;
    // Set Date
    clone.querySelector(".blog-details-date").textContent = blog.date;
    // Set Content
    clone.querySelector(".blog-details-content").textContent = blog.content;
    return clone;
  }
}
