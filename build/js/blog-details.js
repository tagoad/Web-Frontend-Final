import BlogManager from "./blogManager.js";
import { loadHeaderFooter, getURLParams } from "./util.js";

const blogManager = new BlogManager(document.querySelector("main"));

// Get the blog id from the url
const id = getURLParams().get("id");
blogManager.renderBlogDetail(id);
// Load Header and Footer
loadHeaderFooter();
