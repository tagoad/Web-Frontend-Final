// retrieve data from localstorage
export function getLocalStorage(key) {
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
    callback
) {
    console.log(template)
    list.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const renderedTemplate = callback(clone, item);
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
    data,
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
    console.log(template)
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

