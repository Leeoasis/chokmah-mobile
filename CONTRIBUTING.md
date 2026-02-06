# Contributing to Capetech RSM

Thank you for your interest in contributing to Capetech Repair Shop Manager! We welcome contributions from the community.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain professional communication

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Device/platform information
   - App version

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue tagged with "enhancement"
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Any alternatives considered
   - Why this would be useful to others

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chokmah-mobile.git
   cd chokmah-mobile
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```
   
   Use conventional commit format:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code formatting
   - `refactor:` Code restructuring
   - `test:` Adding tests
   - `chore:` Build/tooling changes

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

## Development Setup

See [QUICKSTART.md](QUICKSTART.md) for initial setup.

### Running Tests

```bash
# Run TypeScript checks
npx tsc --noEmit

# Future: Run unit tests
npm test
```

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic

### File Organization

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── navigation/     # Navigation setup
├── screens/        # Screen components
├── services/       # Business logic
├── types/          # TypeScript types
└── utils/          # Helper functions
```

## Areas That Need Help

We especially welcome contributions in these areas:

### High Priority
- [ ] Unit tests for services
- [ ] Integration tests for screens
- [ ] Backend API integration
- [ ] Cloud synchronization
- [ ] Better error handling

### Medium Priority
- [ ] Barcode scanning
- [ ] Receipt printing
- [ ] Email/SMS notifications
- [ ] Advanced reporting with charts
- [ ] Dark mode

### Low Priority
- [ ] Animation improvements
- [ ] Accessibility improvements
- [ ] Internationalization (i18n)
- [ ] Performance optimizations

## Review Process

1. Maintainers will review your PR
2. They may request changes
3. Make requested updates
4. Once approved, your PR will be merged
5. Your contribution will be credited

## Getting Help

- Ask questions in GitHub Discussions
- Comment on relevant issues
- Join our community chat (coming soon)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Mentioned in the changelog

Thank you for contributing! 🎉
