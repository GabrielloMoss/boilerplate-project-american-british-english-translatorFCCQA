const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  constructor() {
    this.americanToBritish = { ...americanOnly, ...americanToBritishSpelling };
    this.britishToAmerican = { ...britishOnly };
    
    for (const [american, british] of Object.entries(americanToBritishSpelling)) {
      this.britishToAmerican[british] = american;
    }
    
    this.americanToBritishTitles = americanToBritishTitles;
    this.britishToAmericanTitles = {};
    for (const [american, british] of Object.entries(americanToBritishTitles)) {
      this.britishToAmericanTitles[british] = american;
    }
  }

  translate(text, locale) {
    if (!text) return null;
    if (!locale) return null;
    
    let translation = text;
    let hasChanges = false;
    
    if (locale === 'american-to-british') {
      const result = this.translateAmericanToBritish(text);
      translation = result.text;
      hasChanges = result.hasChanges;
    } else if (locale === 'british-to-american') {
      const result = this.translateBritishToAmerican(text);
      translation = result.text;
      hasChanges = result.hasChanges;
    } else {
      return null;
    }
    
    if (!hasChanges) {
      return "Everything looks good to me!";
    }
    
    return translation;
  }

  translateAmericanToBritish(text) {
    let result = text;
    let hasChanges = false;
    
    for (const [american, british] of Object.entries(this.americanToBritishTitles)) {
      const regex = new RegExp(`(?<![\\w])${this.escapeRegex(american)}(?![\\w])`, 'gi');
      result = result.replace(regex, (match) => {
        hasChanges = true;
        const capitalizedBritish = british.charAt(0).toUpperCase() + british.slice(1);
        return `<span class="highlight">${capitalizedBritish}</span>`;
      });
    }
    
    const sortedTerms = Object.keys(this.americanToBritish).sort((a, b) => b.length - a.length);
    for (const american of sortedTerms) {
      const british = this.americanToBritish[american];
      const regex = new RegExp(`(?<![\\w])${this.escapeRegex(american)}(?![\\w])`, 'gi');
      result = result.replace(regex, (match) => {
        hasChanges = true;
        const preservedCase = this.preserveCase(match, british);
        return `<span class="highlight">${preservedCase}</span>`;
      });
    }
    
    const timeRegex = /(?<![:\d])(\d{1,2}):(\d{2})(?![:\d])/g;
    result = result.replace(timeRegex, (match, hour, minute) => {
      hasChanges = true;
      return `<span class="highlight">${hour}.${minute}</span>`;
    });
    
    return { text: result, hasChanges };
  }

  translateBritishToAmerican(text) {
    let result = text;
    let hasChanges = false;
    
    for (const [british, american] of Object.entries(this.britishToAmericanTitles)) {
      const regex = new RegExp(`(?<![\\w])${this.escapeRegex(british)}(?=\\s)`, 'gi');
      result = result.replace(regex, (match) => {
        hasChanges = true;
        const capitalizedAmerican = american.charAt(0).toUpperCase() + american.slice(1);
        return `<span class="highlight">${capitalizedAmerican}</span>`;
      });
    }
    
    const sortedTerms = Object.keys(this.britishToAmerican).sort((a, b) => b.length - a.length);
    for (const british of sortedTerms) {
      const american = this.britishToAmerican[british];
      const regex = new RegExp(`(?<![\\w])${this.escapeRegex(british)}(?![\\w])`, 'gi');
      result = result.replace(regex, (match) => {
        hasChanges = true;
        const preservedCase = this.preserveCase(match, american);
        return `<span class="highlight">${preservedCase}</span>`;
      });
    }
    
    const timeRegex = /(\d{1,2})\.(\d{2})(?=\s|$|[.,?!])/g;
    result = result.replace(timeRegex, (match, hour, minute) => {
      hasChanges = true;
      return `<span class="highlight">${hour}:${minute}</span>`;
    });
    
    return { text: result, hasChanges };
  }

  preserveCase(original, replacement) {
    if (original[0] === original[0].toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

module.exports = Translator;
