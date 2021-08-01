# Password Evaluator

I made to be a password strength checker for myself to use so that I could guarantee it isn't scraping data.

[kyle-west.github.io/password-evaluator/](https://kyle-west.github.io/password-evaluator/)

This site implements the following formula used to calculate password entropy, where `alphabetSize` represents the space of the charset used in the password and `**` is notation for _to the power of_ (adopted from python syntax).

```py
bitStrength = log2(alphabetSize ** passwordLength)
```

---

## My General Thoughts on Passwords

When creating an account, we often instruct users that they must create a password with a minimum of 8 characters, including both letters and numbers.

Following that design, something like `mypa55wd` has a bit-strength of 41. Which is widely accepted by industry standards as a _reasonable_ password. 

When [RFC-4086: Randomness Requirements for Security](https://tools.ietf.org/html/rfc4086#page-34), was published back in 2005 they claimed that 29 bits would be a minimum security requirement for latent systems (like over the internet). So by that standard, 41 bits of entropy would seem pretty acceptable.

Some companies try to increase the entropy of password generation by requiring their users to add symbols and mixed case to their passwords (increasing the alphabet size from 36 to 95 in ascii). `Th3 Pa$$`, for example has a bit-strength of 52 which is better than our original requirements.

Combinatorially speaking, complexity is not the most important thing when selecting a password. `thisisactuallyawaybetterpassword` only has an alphabet size of 26, but the password has a bit-strength of 150. By current standards it would be considered _very strong_ or even _overkill_. Length is the greatest factor to increasing entropy.

Ideally, you may say that we ought to require both complexity and length. The authors of RFC-4086, do make a point about that:

> In a real system, of course, there are other factors. For example, the larger and harder to remember passwords are, the more likely users will bed to write them down, resulting in an additional risk of compromise.

Here are my thoughts on this. The RFC's that make up these industry standards are from before 2010. They are basing many of their assumptions from character sets of old utf standards or even ascii.

For even better modern passwords, we should expand our assumptions and systems to include much more of unicode. _And encourage our users to include those characters_. For many of our non-latin based language speakers, this will be more natural to them anyway. For the rising generation, we could simply encourage them to include emojis.

From my count there are [1816 emojis in the Unicode Standard](https://unicode.org/emoji/charts/full-emoji-list.html). So if a user just puts 4 emojis as their password (like `🌮🍕🍔🍟`), then they have an entropy of 43 bits. That is slightly better than our original minimum standard!

Combine this with regular ascii chars, and we can take advantage of all the things we talked about, including passwords that are easy for the user to remember. `I love 🍕 day` is 130 bits strong and way easy to remember! 
