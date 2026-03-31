# Motors - Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Setup

```bash
git clone https://github.com/yourusername/Motors.git
cd Motors
npm install --legacy-peer-deps
npm start
```

## Code Style

### TypeScript

```typescript
// Use meaningful names
const carBrand = 'BMW';

// Use const by default
const cars: Car[] = [];

// Use arrow functions
const getCars = () => this.cars;

// Use interfaces for types
interface Car {
  id: string;
  brand: string;
}
```

### Angular

```typescript
// Use standalone components
@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule],
})
export class CarCardComponent {}

// Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

### CSS/Tailwind

```css
/* Use Tailwind classes */
<div class="flex gap-4 p-6 rounded-lg shadow">

/* Avoid inline styles */
/* ❌ style="color: red;" */

/* Use @apply for custom classes */
@apply flex gap-4 p-6 rounded-lg shadow;
```

## Commit Messages

```
feat: add car filtering
fix: resolve filter bug
docs: update API guide
style: format code
refactor: simplify service
test: add car service tests
chore: update dependencies
```

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review
6. Address feedback
7. Merge when approved

## Branch Naming

```
feature/add-car-filtering
bugfix/fix-filter-bug
docs/update-guide
refactor/simplify-service
```

## Testing Requirements

- Unit tests for services
- Component tests for UI
- E2E tests for workflows
- Minimum 80% coverage

## Documentation

- Update README.md
- Add JSDoc comments
- Update API docs
- Add examples

## Performance Guidelines

- Keep bundle size small
- Use lazy loading
- Optimize images
- Minimize HTTP requests
- Use OnPush detection

## Security Guidelines

- Never commit secrets
- Validate user input
- Sanitize HTML
- Use HTTPS
- Keep dependencies updated

## Questions?

- Check documentation
- Review existing code
- Ask in discussions
- Open an issue

Thank you for contributing!
