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
