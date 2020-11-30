class PasswordEvaluator {
  constructor (str) {
    this.value = str;
    this.length = str.length;
    this.stats = {
      containsLowerCase: false,
      containsUpperCase: false,
      containsSymbol: false,
      containsNumber: false
    };

    this.tallyCharSet(str);
    this.alphabetLength = this.calcTotalAlphabetLength();
    this.numberOfPossibleCombinations = this.pow(this.alphabetLength, this.length);
    this.bitStrength = this.calcBitStrength(this.numberOfPossibleCombinations);

    this.doBasicChecks(this.value);

    if (this.bitStrength < 28) {
      this.bitStrengthClass = 'very-weak';
      this.bitStrengthText = 'Very Weak';
    } else if (this.bitStrength < 36) {
      this.bitStrengthClass = 'weak';
      this.bitStrengthText = 'Weak';
    } else if (this.bitStrength < 60) {
      this.bitStrengthClass = 'reasonable';
      this.bitStrengthText = 'Reasonable';
    } else if (this.bitStrength < 128) {
      this.bitStrengthClass = 'strong';
      this.bitStrengthText = 'Strong';
    } else {
      this.bitStrengthClass = 'very-strong';
      this.bitStrengthText = 'Very Strong';
    }
  }

  doBasicChecks (value) {
    this.warnings = [];

    if (value.length < 8) {
      this.warnings.push('Password is too short!')
    }

    if (dictionary.includes(value)) {
      this.warnings.push('Password as least partially found in basic dictionary!')
    }
  }

  calcBitStrength (combinations) {
    return this.log2(combinations);
  }

  log2 (x) {
    let n = 1n;
    let a = 2n;
    while (true) {
      if (a > x) return n - 1n;
      n += 1n;
      a *= 2n;
    }
  }

  pow (n, e) {
    let x = 1n;
    for (let i = e; i > 0; --i) {
      x *= BigInt(n);
    }
    return x;
  }

  calcTotalAlphabetLength () {
    let length = 0;
    if (this.stats.containsLowerCase) length += 26;
    if (this.stats.containsUpperCase) length += 26;
    if (this.stats.containsNumber)    length += 10;
    if (this.stats.containsSymbol)    length += 33;
    return length;
  }

  tallyCharSet () {
    this.value.split('').forEach(char => {
      let charCode = char.charCodeAt(0);
      let isLower  = this.charIsLowerCase(charCode);
      let isUpper  = this.charIsUpperCase(charCode);
      let isNumber = this.charIsNumber(charCode);
      let isSymbol = this.charIsSymbol(isLower, isUpper, isNumber);

      this.stats.containsLowerCase |= isLower;
      this.stats.containsUpperCase |= isUpper;
      this.stats.containsNumber    |= isNumber;
      this.stats.containsSymbol    |= isSymbol;
    });
  }

  charIsLowerCase(charCode) {
    return this.LOWER_CASE_START <= charCode && charCode <= this.LOWER_CASE_END;
  }

  charIsUpperCase(charCode) {
    return this.UPPER_CASE_START <= charCode && charCode <= this.UPPER_CASE_END;
  }

  charIsNumber(charCode) {
    return this.NUMBER_START <= charCode && charCode <= this.NUMBER_END;
  }

  charIsSymbol(isLower, isUpper, isNumber) {
    return !(isLower || isUpper || isNumber);
  }

  get LOWER_CASE_START ()  { return 'a'.charCodeAt(0); }
  get LOWER_CASE_END   ()  { return 'z'.charCodeAt(0); }

  get UPPER_CASE_START ()  { return 'A'.charCodeAt(0); }
  get UPPER_CASE_END   ()  { return 'Z'.charCodeAt(0); }

  get NUMBER_START     ()  { return '0'.charCodeAt(0); }
  get NUMBER_END       ()  { return '9'.charCodeAt(0); }

}
