/** Prefix for generated CSS vars */
const prefix = "hi-color";
/** Hopefully self-explanatory what they can be used for. */
const accentNames = ["primary","secondary","info","trivial","good","risky","bad","normal"];
/** Tailwind color classes to extend & their respective opacity vars */
const colorClasses = {
  "textColor":"--tw-text-opacity",
  "placeholderColor":"--tw-placeholder-opacity",
  "backgroundColor":"--tw-bg-opacity",
  "borderColor":"--tw-border-opacity",
  "divideColor":"--tw-divide-opacity",
  "ringColor":"--tw-ring-opacity",
  "ringOffsetColor":"1",
  "gradientColorStops":"1"
};

const generateColor = ([className,opacityVar]) => [className,Object.fromEntries(accentNames.map(name => [name,`rgba(var(--${prefix}-${name}),var(${opacityVar}))`]))];
const newColors = Object.fromEntries(Object.entries(colorClasses).map(generateColor));

//Normal color for background should be contrasting
newColors['backgroundColor']['normal'] = `rgba(var(--${prefix}-normalbg),var(--tw-bg-opacity))`

//Theme colors generated
//console.debug(newColors);

//Copy these CSS vars into baseTheme and edit.
//console.debug([...accentNames.map(name => `--${prefix}-${name}`),...Object.values(colorClasses)].join("\n"));

module.exports = {
  purge: false,
  darkMode: "class",
  theme: {
    zIndex: Object.fromEntries(['auto',100,75,50,25,0,-25,-50,-75,-100].map(n=>[n,n])),
    extend: {
      ...newColors,
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