function togglePasswordShow () {
  let elem = document.getElementById('password');
  elem.type = elem.type === "password" ?  "text" : "password";
}

function calculateStrength (elem) {
  let returnElem = document.getElementById('results');

  let strength = elem.value.length;

  returnElem.innerHTML = strength.toString();
}
