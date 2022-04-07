import BlogManager from "./blogManager";
import { loadHeaderFooter, getURLParams } from "./util";

const blogManager = new BlogManager(document.querySelector("main"));

// Get the blog id from the url
const id = getURLParams().get("id");
blogManager.renderBlogDetail(id)
loadHeaderFooter()