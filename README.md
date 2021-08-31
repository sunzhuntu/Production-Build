# Production Build of React Application

This project is for the production build of react application

## How to Run

- use `npm run build` to generate the static folder for your frontend application
- add app.use(express.static('build')) into your server.js
- change the base url for axios as relative url, e.g., 'api/products'
