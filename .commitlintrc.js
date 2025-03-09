// based on https://stackoverflow.com/a/73914895
const isTicketKey = (value) => new RegExp(/^[A-Z][A-Z0-9_]+-[1-9][0-9]*$/).test(value);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'subject-min-length': [2, 'always', 15],
    'scope-empty': [2, 'never'],
    'scope-enum': [0],
    'function-rules/scope-enum': [
      2,
      'always',
      ({ scope }) => {
        if (scope === null || isTicketKey(scope)) {
          return [true];
        }

        return [
          false,
          `Provided scope ("${scope}") does not match the ticket format! (example: XYZ-1234)`,
        ];
      },
    ],
  },
};
