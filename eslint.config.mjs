import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPkg from 'eslint'; // импортируем eslint для получения стандартных настроек
import eslintPluginPrettier from 'eslint-plugin-prettier'; // используем import для плагина prettier
import eslintPluginReact from 'eslint-plugin-react'; // используем import для плагина react

const { Linter } = eslintPkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Создаем объект FlatCompat для использования совместимости
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Получаем конфигурацию Next.js и TypeScript
const nextConfig = compat.extends('next/core-web-vitals', 'next/typescript');

// Получаем конфигурацию Prettier и React
const eslintConfig = [
  ...nextConfig, // добавляем конфигурацию Next.js и TypeScript
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'], // применяем для этих типов файлов
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021, // позволяет использовать новые возможности JavaScript
        sourceType: 'module', // для использования ES6 модулей
        ecmaFeatures: {
          jsx: true, // если используете React
        },
      },
    },
    plugins: {
      react: eslintPluginReact, // подключаем плагин для React
      prettier: eslintPluginPrettier, // подключаем плагин Prettier
    },
    rules: {
      'no-var': 'error', // запрет на использование var, вместо этого используйте let/const
      'prettier/prettier': 'warn', // предупреждения для несоответствия Prettier
      'react/prop-types': 'off', // если не используете PropTypes в React (например, используете TypeScript)
    },
  },
];

// Экспортируем объект конфигурации ESLint
export default [
  ...eslintConfig,
  {
    plugins: {
      prettier: eslintPluginPrettier, // плагин Prettier
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      'prettier/prettier': 'warn',
    },
  },
];
