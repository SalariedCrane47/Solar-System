# Contributing to Solar System Explorer

Thank you for your interest in contributing!

## Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format
```

### Guidelines

1. **No TypeScript** - This project uses vanilla JavaScript
2. **Use constants** - Extract magic numbers to `src/constants.js`
3. **State management** - Use `src/state.js` for shared state
4. **JSDoc comments** - Document public functions
5. **Test coverage** - Add tests for new functionality

## Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## Testing

### Unit Tests

```bash
# Run tests
npm run test:run

# With coverage
npm run test:coverage
```

Write tests for:

- Orbital calculations
- State management functions
- Utility functions
- Input validation

### E2E Tests

```bash
# Install browsers (first time)
npx playwright install

# Run E2E tests
npm run test:e2e
```

## Reporting Issues

Please include:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

## Questions?

Feel free to open an issue for any questions.
