module.exports = {
  //apparently you can set the order stories load here
  "stories": [
    "../stories/readme.stories.mdx",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}