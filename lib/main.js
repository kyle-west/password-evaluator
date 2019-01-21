function togglePasswordShow () {
  let elem = document.getElementById('password');
  elem.type = elem.type === "password" ?  "text" : "password";
}

function calculateStrength (elem) {
  let results = document.getElementById('results');
  let combinations = document.getElementById('combinations');

  let evaluation = new PasswordEvaluator(elem.value);
  console.log(evaluation);

  results.innerHTML = evaluation.bitStrength.toString();
  combinations.innerHTML = evaluation.numberOfPossibleCombinations.toString();
}