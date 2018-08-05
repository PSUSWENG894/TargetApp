/* eslint-disable */
module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/*.{vue}",
    "!**/node_modules/**",
    "!**/config/**",
    "!**/src/components/Repositories.vue",
    "!**/src/components/SiteButton.vue"
  ],
  "coverageReporters": ["html", "json", "lcov", "text"],
  "coverageDirectory": "coverage"
}