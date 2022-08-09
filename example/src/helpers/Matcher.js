class Matcher { 
    /**
     * 
     * @param {Any<T>} value 
     * @param {MatcherValue[]} patterns
     * @param {T} base 
     * @returns 
     */
    static when (value, patterns, base) { 
      let found = patterns.find(pattern => value == pattern.pattern); 

      if (found === undefined) { 
        if(base != undefined) { 
          return base; 
        } 
        throw Error(`Padrão não exaustivo para o valor ${value}`); 
      } 
   
      return found.arm; 
    } 
}

class MatcherValue {
  constructor(pattern, arm) {
    this.pattern = pattern
    this.arm = arm
  }
}

export {
  Matcher, 
  MatcherValue
}