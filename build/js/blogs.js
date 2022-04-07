import BlogManager from "./blogManager.js";
import { loadHeaderFooter } from "./util.js";

const blogManager = new BlogManager(
  document.querySelector(".blog-summary-list"),
  "blog-summary-template"
);

// Render List of Blog Summaries
blogManager.renderBlogSummaryList();
// Load Header and Footer
loadHeaderFooter();
