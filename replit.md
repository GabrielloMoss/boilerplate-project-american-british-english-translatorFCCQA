# American British English Translator

## Overview
A freeCodeCamp Quality Assurance project that translates between American and British English. The application is an Express.js web server with a simple frontend interface.

## Project Structure
- `server.js` - Main Express server entry point
- `components/` - Translation logic and dictionaries
  - `translator.js` - Main translator class (to be implemented)
  - `american-only.js` - American-only terms dictionary
  - `british-only.js` - British-only terms dictionary
  - `american-to-british-spelling.js` - Spelling differences
  - `american-to-british-titles.js` - Title differences (Mr./Mrs. etc)
- `routes/` - Express route handlers
  - `api.js` - API endpoints for translation
  - `fcctesting.js` - FCC testing routes
- `public/` - Static frontend files
  - `index.js` - Frontend JavaScript
  - `style.css` - Styles
- `views/` - HTML templates
  - `index.html` - Main page
- `tests/` - Unit and functional tests
  - `1_unit-tests.js` - Unit tests
  - `2_functional-tests.js` - Functional/API tests

## Running the Application
- Development: `npm start` (uses nodemon)
- Tests: `npm run test`

## Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to `test` to run tests automatically on startup

## API Endpoints
- `POST /api/translate` - Translate text between American and British English
  - Body: `{ text: string, locale: "american-to-british" | "british-to-american" }`
  - Returns: `{ text: string, translation: string }`
