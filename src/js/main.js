import BlogManager from "./blogManager";
import { loadHeaderFooter } from "./util";

const blogManager = new BlogManager(
  document.querySelector(".blog-featured-list")
);

// Render List of Featured Blog Summaries
blogManager.renderFeaturedBlogs();
// Load Header and Footer
loadHeaderFooter();
