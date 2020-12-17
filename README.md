# Personal web site source code

Built with Typescript and React, based on [PatternFly](https://www.patternfly.org/v4/), an open source web UI framework by Red Hat.


## Quick-start

```bash
git clone https://github.com/rflorenc/rfplourenco.com.git
cd rfplourenco.com
npm install && npm run start:dev
```
## Development Scripts
```sh
# Install development/build dependencies
npm install

# Start the development server
npm run start:dev

# Run the test suite
npm run test

# Run the linter
npm run lint

# Run the code formatter
npm run format

# Launch a tool to inspect the bundle size
npm run bundle-profile:analyze

# Start storybook component explorer
npm run storybook

# Build storybook component explorer as standalone app (outputs to "storybook-static" dir)
npm run build:storybook
```

## Production Scripts
```sh
# Install development/build dependencies
npm install

# Run a production build (outputs to "dist" dir)
npm run build

# Start the express server (run a production build first)
npm run start

# Copy static content to web server root
```
