import { loadHeaderFooter, getLocalStorageAsync, getURLParams } from "./util";
import UserManager from "./userManager";

const userManager = new UserManager(document.querySelector("main"));
const params = getURLParams();

getLocalStorageAsync("token").then((token) => {
    if (token) {
        userManager.renderUserInfo(params.get("id"));
    } else {
        userManager.renderLoginForm()
    }
});

loadHeaderFooter()