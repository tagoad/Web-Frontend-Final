// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export async function getLocalStorageAsync(key) {
    return JSON.parse(localStorage.getItem(key));
}  

// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
export function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function renderListWithTemplateId(
    templateId,
    parentElement,
    list,
    callback
) {
    const template = document.getElementById(templateId);
    list.forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true);
        const renderedTemplate = callback(clone, item);
        parentElement.appendChild(renderedTemplate);
    });
}

export function renderListWithTemplate(
    template,
    parentElement,
    list,
    callback,
    admin = null
) {
    list.forEach((item) => {
        const clone = template.content.cloneNode(true);
        let renderedTemplate = callback(clone, item, admin);
        parentElement.appendChild(renderedTemplate);
    });
}

export function renderWithTemplateId(
    templateId,
    parentElement,
    data,
    callback
) {
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);
    const renderedTemplate = callback(clone, data);
    parentElement.appendChild(renderedTemplate);
}

export function renderWithTemplate(
    template,
    parentElement,
    data = null,
    callback = null
  ) {
    const clone = template.content.cloneNode(true);
    if (callback) {
      const renderedTemplate = callback(clone, data);
      parentElement.appendChild(renderedTemplate);
    } else {
      parentElement.appendChild(clone);
    }
  }

export async function loadTemplate(path) {
    const contents = await fetch(path).then((res) => res.text());
    const template = document.createElement("template");
    template.innerHTML = contents;
    return template;
  }

export function loadHeaderFooter() {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    // loadTemplate("../partials/header.html")
    // .then((template) => renderWithTemplate(template, header))
    loadTemplate("../partials/footer.html").then((template) =>
    renderWithTemplate(template, footer)
    );
}

export function getURLParams(url = window.location.href) {
    const params = (new URL(url)).searchParams;
    return params;
}

export function alertMessage(message, alertType = "alert", scroll = true) {
    // create element to hold our alert
    const alert = document.createElement("div");
    alert.classList.add("alert_message", alertType);
    // set the contents. You should have a message and an X or something the user can click on to remove
    alert.innerHTML = `<p>${message}</p><p class="close">X</p>`;
  
    // add a listener to the alert to see if they clicked on the X
    // if they did then remove the child
    alert.addEventListener("click", function (e) {
      if (e.target.innerText == "X") {
        // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
        main.removeChild(this);
      }
    });
    // add the alert to the top of main
    const main = document.querySelector("main");
    main.prepend(alert);
    // make sure they see the alert by scrolling to the top of the window
    //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
    if (scroll) window.scrollTo(0, 0);
  }
