//UI variables
const form = document.querySelector(".form");
const loading = document.querySelector(".spinner");
let output = "";

//Event Listeners
form.addEventListener("submit", getJokes);
document.addEventListener("DOMContentLoaded", hideSpinner);

//Functions
function hideSpinner() {
  loading.style.display = "none";
  form.reset();
}
function showAlert(msg) {
  output = `<li>${msg}</li>`;
  document.querySelector(".output").innerHTML = output;
}
function showSpinner() {
  loading.style.display = "block";
}
function getJokes(e) {
  output = "";
  showAlert("");
  const number = document.querySelector("#number").value;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);
  xhr.onprogress = function () {
    showSpinner();
  };
  xhr.onload = function () {
    output = "";
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let count = 1;
      if (response.type === "success") {
        response.value.forEach(function (joke) {
          output += `<li>${count}- ${joke.joke}</li>`;
          count++;
        });
      } else {
        output += `<li>Somthing Went Wrong! </li>`;
      }
      setTimeout(function () {
        loading.style.display = "none";
        document.querySelector(".output").innerHTML = output;
      }, 2000);
    }
  };
  if (number <= 0 || number > 574) {
    showSpinner();
    setTimeout(function () {
      showAlert("Please Enter A Number Between 1 - 574");
      hideSpinner();
    }, 1000);
  } else {
    xhr.send();
  }

  e.preventDefault();
}
