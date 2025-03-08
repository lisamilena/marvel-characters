module.exports = {
  "*.{js,mjs,ts,tsx}": "eslint",
  // Disable Typecheck on Commit because need to be project wise, will be done on build
  // "*.{ts,tsx}": () => "tsc --noEmit --project tsconfig.json",
};