export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "color-no-hex": true,
    "color-named": "never",
    "function-disallowed-list": [
      ["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color"],
      { message: "Use a theme token (var(--lv-...)) instead of a raw colour" },
    ],
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      { message: "CSS module classes are camelCase, so code can write s.className" },
    ],
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
  },
};
