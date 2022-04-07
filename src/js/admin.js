import { loadHeaderFooter, getLocalStorageAsync, getURLParams } from "./util";
import UserManager from "./userManager";

const userManager = new UserManager(document.querySelector("main"));
const params = getURLParams();

// Check Authentication Status of the User
getLocalStorageAsync("token").then((token) => {
  if (token) {
    userManager.renderUserInfo(params.get("id"));
  } else {
    userManager.renderLoginForm();
  }
});

// Load Header and Footer
loadHeaderFooter();
