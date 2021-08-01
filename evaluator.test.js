const { PasswordEvaluator } = require('./lib/password-evaluator');

const checks = [
  { password: 'a', strength: 4n },
  { password: 'B', strength: 4n },
  { password: '3', strength: 3n },
  { password: '&', strength: 5n },
  { password: ' ', strength: 5n },
  { password: '🗡', strength: 10n },
  { password: 'mypa55wd', strength: 41n },
  { password: 'Th3 Pa$$', strength: 52n },
  { password: 'thisisactuallyawaybetterpassword', strength: 150n },
  { password: 'This is actually a way better password.', strength: 249n },
  { password: 'This is actua11y a way better password.', strength: 256n },
  { password: '🌮🍕🍔🍟', strength: 43n },
  { password: 'I love 🍕 day', strength: 130n },
]

checks.forEach(check => {
  test(`"${check.password}" ==> ${check.strength}bits`, () => {
    const { bitStrength } = new PasswordEvaluator(check.password, {useDictionary: false});
    expect(bitStrength).toBe(check.strength);
  })
})