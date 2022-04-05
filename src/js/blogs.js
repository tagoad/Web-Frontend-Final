import BlogManager from "./blogManager";
import { loadHeaderFooter } from "./util";

const blogManager = new BlogManager(document.querySelector(".blog-summary-list"), "blog-summary-template");

blogManager.renderBlogSummaryList()
loadHeaderFooter()