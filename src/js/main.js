import BlogManager from "./blogManager";
import { getLocalStorage, loadHeaderFooter } from "./util";

const blogManager = new BlogManager(document.querySelector(".blog-featured-list"));

loadHeaderFooter()
blogManager.renderFeaturedBlogs()