// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
   {
      ignores: ['eslint.config.mjs'],
   },
   eslint.configs.recommended,
   ...tseslint.configs.recommendedTypeChecked,
   eslintPluginPrettierRecommended,
   {
      languageOptions: {
         globals: {
            ...globals.node,
            ...globals.jest,
         },
         sourceType: 'commonjs',
         parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
         },
      },
   },
   {
      rules: {
         // Cảnh báo khi dùng any
         '@typescript-eslint/no-explicit-any': 'warn',
         // Cảnh báo biến thừa nhưng bỏ qua biến bắt đầu bằng dấu _
         '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
         // Không bắt buộc khai báo kiểu trả về cho mọi function
         '@typescript-eslint/explicit-function-return-type': 'off',
         // Tắt vì NestJS Request
         '@typescript-eslint/no-unsafe-assignment': 'off',
         // Giúp truy cập request.user thoải mái hơn
         '@typescript-eslint/no-unsafe-member-access': 'off',

         // Prettier Rules
         'prettier/prettier': 0,

         // General Rules
         'no-console': 'off',
      },
   }
);
