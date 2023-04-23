# Tasks App

This is a full-stack web application that uses React for the frontend and Laravel for the backend. The application allows users to list their tasks, search through their tasks, create, modify, and mark tasks as "To Do", "In Progress", or "Done".

The frontend is built using React, Tailwind and Flowbite.

The backend is built with Laravel on MySQL and the easiest way to set up the environment is by installing XAMPP.

## Prerequisites

- Node.js
- XAMPP
- Composer

## Installation & Setup

1. Clone the repository.

```
git clone https://github.com/your_username/myproject.git
```

2. Install dependencies for the frontend and backend.

```
cd TasksApp/frontend
npm install

cd ../backend
composer install
```

3. Set up XAMPP and start the Apache and MySQL services.

4. Create a new database in phpMyAdmin with the name specified in the `.env` file.

5. Verify that the database credentials in the `.env` file are correct.

6. Seed the database by running the following command in the `backend` directory:

```
php artisan migrate:fresh --seed
```

## Running the Application

1. In the `backend` directory, start the Laravel server:

```
php artisan serve
```

2. In a separate terminal, navigate to the `frontend` directory and start the React development server:

```
npm run dev
```

3. Open your browser and go to `http://localhost:3000` to access the frontend.

## API Routes

The backend API consists of public and protected routes:

### Public Routes

- Registration: `POST /api/v1/register`
- Login: `POST /api/v1/login`
- List tasks: `GET /api/v1/tasks`
- Get task by ID: `GET /api/v1/tasks/{id}`
- List developers: `GET /api/v1/developers`
- Get developer by ID: `GET /api/v1/developers/{id}`

### Protected Routes

- Logout: `POST /api/v1/logout`
- Create task: `POST /api/v1/tasks`
- Search tasks by title: `GET /api/v1/tasks/search/{title}`
- Search tasks by title and developer ID: `GET /api/v1/tasks/search/{title}/{developerId}`
- Update task: `PATCH /api/v1/tasks/{id}`
- Delete task: `DELETE /api/v1/tasks/{id}`
- Update developer (for testing purposes only): `PATCH /api/v1/developers/{id}`

## Testing API Routes with Postman

A Postman collection is available at the root of the project to test the different API routes. Start by sending the Authentication/register request to get a token, and then use the token to access the other requests.

## Todo

A lot actually:

- Add better and more consistent styling
- Add Projects
- View other user's tasks in the frontend
