### Lab 07 -- Build Something w/ Layerd Architecture and CRUD Routes

# Basic Overview:

- API: official_joke_api
- Purpose: Users can create, edit, delete, and view full programming jokes
- CRUD Routes:
  - POST: User can create a new joke to add to the DB
  - GET: User can get a random quote or a group of quotes based on count
  - PUT: User can update an existing joke based on the joke ID
  - DELETE: User can delete a joke they no longer want in the DB
- AWS SES: Ability to send jokes via Email

# Plan

- Create data model for jokes
- Load data into SQL db
- TDD POST /jokes endpoint
- Repeat for remaining CRUD routes
- add AWS to send email w/ jokes
