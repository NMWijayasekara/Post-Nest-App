# Post Nest App
Simple API with User Authentication and Create and View Posts

## Routes

### User Authentication Routes

> /auth/register **(POST)** -> creates new user

> /auth/login **(POST)** -> validates user credentionals and return access token

> /profile -> view user details based on access token provided


### Post Routes

> /posts -> view all posts

> /posts/user -> view user's post based on access token

> /posts **(POST)** -> creates new post with user access token

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
