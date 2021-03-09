function togglePasswordShow () {
  let elem = document.getElementById('password');
  elem.type = elem.type === "password" ?  "text" : "password";
}

function calculateStrength (elem) {
  let results = document.getElementById('results');
  let strength = document.getElementById('strength-description');
  let combinations = document.getElementById('combinations');
  let warnings = document.getElementById('warnings');

  let evaluation = new PasswordEvaluator(elem.value);
  console.log(evaluation);

  results.innerHTML = evaluation.bitStrength.toString();
  combinations.innerHTML = evaluation.numberOfPossibleCombinations.toString();

  if (evaluation.length) {
    strength.innerHTML = '';
    warnings.innerHTML = '';

    strength.className = evaluation.bitStrengthClass.toString();
    strength.innerHTML = evaluation.bitStrengthText.toString();

    for (i = 0; i < evaluation.warnings.length; i++) {
      let el = document.createElement('p');
      el.classList.add('warning');
      el.innerHTML = evaluation.warnings[i];
      warnings.appendChild(el);
    }
  }
}
