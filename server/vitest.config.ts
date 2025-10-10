import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', 
    
    include: ['**/*.test.ts', '**/*.spec.ts'], 

    globals: true,

    exclude: [
      '**/node_modules/**', 
      '**/dist/**', 
      '**/build/**', 
      '**/client/**', 
      '**/*.jsx',
      '**/*.tsx',
    ],
    
    coverage: {
      provider: 'v8', 
      reporter: ['text', 'html', 'json'],
      exclude: [
        '**/node_modules/**', 
        '**/client/**', 
        '**/*.config.ts',
        '**/*.d.ts',
        'dist/**'
      ]
    },
    
  },
});