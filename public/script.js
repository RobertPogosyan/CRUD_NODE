let age = document.getElementById("age");
let name = document.getElementById("text");

function sendData (){
let usage = age.value;
let usname = name.value

 fetch("http://localhost:3000//addName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  
    body: JSON.stringify(age = usage , name = usname), // body data type must match "Content-Type" header
});
}

