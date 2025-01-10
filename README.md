# Developer Exam

Project as part of a developer exam.

Due to the CORS restrictions of the randomnumberapi.com (see https://github.com/jameskozlowski/randomnumberapi-go/issues/2), this project uses my own backend that acts as proxy request to the said api.

The API URL used is https://manga-app-snowy.vercel.app/api/randomnumbergen which uses https://www.randomnumberapi.com/api/v1.0/random?min=100000&max=999999 under the hood to mimic the original task as closely as possible.

User session is stored using sessionStorage to provide persistence on reload but will be wiped on browser/tab closure.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
