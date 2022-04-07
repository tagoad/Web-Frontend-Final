import BlogManager from "./blogManager";
import { loadHeaderFooter } from "./util";

const blogManager = new BlogManager(document.querySelector(".blog-summary-list"), "blog-summary-template");

// Render List of Blog Summaries
blogManager.renderBlogSummaryList()
// Load Header and Footer
loadHeaderFooter()