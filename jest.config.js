export const moduleFileExtensions = [
  'js',
  'jsx',
  'json',
  'vue'
];
export const transform = {
  '^.+\\.vue$': 'vue-jest',
  '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  '^.+\\.jsx?$': 'babel-jest'
};
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1'
};
export const snapshotSerializers = [
  'jest-serializer-vue'
];
export const testMatch = [
  '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
];