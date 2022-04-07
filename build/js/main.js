import BlogManager from "./blogManager.js";
import { loadHeaderFooter } from "./util.js";

const blogManager = new BlogManager(
  document.querySelector(".blog-featured-list")
);

// Render List of Featured Blog Summaries
blogManager.renderFeaturedBlogs();
// Load Header and Footer
loadHeaderFooter();
