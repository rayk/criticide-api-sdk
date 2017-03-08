# Criticide API SDK
NodeJs client library for accessing the [Criticide API](https://github.com/rayk/criticide-api).

### Requires

- This SDK requires a Node.js (at least version 0.10.4).
- Node Package Manager aka npm to resolve the dependencies.

### Structure

- `package.json` contains the definition of the SDK and its dependencies
- `index.js` is the entry point for the generated module
- `restletUtils.js` a standalone helper file for the SDK
- `securityUtils.js` some utility methods to handle the security in the SDKs
- `sdks/criticideProbabilityEngineAPI.js` is the source of the generated SDK
