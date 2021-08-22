console.log("Postman API");
//Utility Funs
//1.To get DOM element from String
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}
//2.Set event listeners on Delete buttons
function addDeleteEventListeners(paramElement) {
  paramElement.children[3].addEventListener("click", () => {
    paramElement.remove();
    console.log("triggered");
  });
}
//Initialize number of params
let addedParamsCount = 1;
//If users click on params box,hide json Box
let paramsRadio = document.getElementById("params");
paramsRadio.addEventListener("click", () => {
  paramBox.style.display = "flex";
  document.getElementById("paramsList").style.display = "block";
  document.getElementById("jsonBox").style.display = "none";
});

//If users click on Json box,hide Params Box
let jsonRadio = document.getElementById("json");
jsonRadio.addEventListener("click", () => {
  jsonBox.style.display = "flex";
  document.getElementById("paramBox").style.display = "none";
  document.getElementById("paramsList").style.display = "none";
});
//If user click on + button add more parameters inputs
let addBtn = document.getElementById("addParam");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let params = document.getElementById("paramsList");
  let string = `<div id="paramNo${addedParamsCount + 1}"
                class="my-3"
                style="display: flex; justify-content: space-between"
                >
                <legend class="col-form-label col-sm-2 pt-0">Parameter ${
                  addedParamsCount + 1
                }</legend>
                <input
                    class="form-control mx-2"
                    type="text"
                    id="key${addedParamsCount + 1}"
                    placeholder="KEY"
                />
                <input
                    type="text"
                    class="form-control mx-2"
                    id="value${addedParamsCount + 1}"
                    placeholder="VALUE"
                />

                <button id="delBtn${
                  addedParamsCount + 1
                }" class="btn btn-primary">-</button>
                </div>`;

  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);
  addDeleteEventListeners(paramElement);
  addedParamsCount++;
});
// if user click on submit button
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", (e) => {
  //show please wait in the response box for patience from user
  e.preventDefault();
  document.getElementById("response").innerHTML =
    "Please Wait... Fetching Response...";
  //fetch all the value entered by user
  let url = document.getElementById("url").value;
  let requestType = document.querySelector("input[name='request']:checked");
  let contentType = document.querySelector("input[name='content']:checked");
  let contentValue = contentType.value;
  let requestValue = requestType.value;

  //Log all values in console for debuggging

  //if users has used params option instead of json collect all the params in an object
  let data;
  if (contentValue == "params") {
    data = {};
    for (let i = 1; i <= addedParamsCount; i++) {
      if (document.getElementById("key" + i) != undefined) {
        let key = document.getElementById("key" + i).value;
        let value = document.getElementById("value" + i).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsonParams").value;
  }
  console.log("Url is " + url);
  console.log("request is " + requestValue);
  console.log("content is " + contentValue);
  console.log(data);

  //   if request is post invoke fetch api to make a post request
  if (requestValue == "post") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.text())
      .then((text) => {
        let response = document.getElementById("response");
        response.innerHTML = text;
        console.log(text);
      });
  }
  // else request is get and fetch rquest as get
  else {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        let response = document.getElementById("response");
        response.innerHTML = text;
        console.log(text);
      });
  }
});
