// https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion#tailwind-config

/** Hopefully self-explanatory what they can be used for. */
const accentNames = ["normal","special","info","trivial","good","risky","bad","theme"];
/** DEFAULT used for button fill, text. soft used for placeholder, bg. hard used for ring, borders. */
const accentVariants = ["DEFAULT","soft","hard"];
const prefix = "color";

const newColors = Object.fromEntries(accentNames.map(name => [name,Object.fromEntries(accentVariants.map(variant => [variant,`var(--${prefix}-${name}${variant=="DEFAULT"?"":`-${variant}`})`]))]));
console.debug("Theme colors generated: ",newColors);
/*
let varNames = "";
Object.values(newColors).forEach(accent => Object.values(accent).forEach(val => varNames += val.substring(4,val.length-1) + "\n"));
console.debug(varNames);
*/
module.exports = {
  purge: false,
  darkMode: "class",
  theme: {
    zIndex: Object.fromEntries(['auto',100,75,50,25,0,-25,-50,-75,-100].map(n=>[n,n])),
    extend: {
      colors: {
        'link-color':"var(--color-link)",
        ...newColors
      },
      flex: {
        'expand':"1 0 auto",
      },
      fontFamily: {
        'comic': ["Comic Sans MS", "Comic Sans", "cursive"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')]
}