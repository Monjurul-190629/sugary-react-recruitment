# Authentication System with LocalStorage and Stylish Dashboard using lazy loading

This project implements a React.js authentication system using localStorage for token management, Axios for API requests, and automatic token refresh using interceptors.
Ans also Dashboard using lazy loading and tansack query.


#Live link: 


## Features

- User login using email and password.
- Tokens (access and refresh) are stored in `localStorage`.
- Axios interceptors automatically refresh the token when expired.
- Responsive and professional UI designed with Tailwind CSS.
- Stylish Dashboard using lazy loading

## Tech Stack

Frontend: React.js

State Management: Redux Toolkit

Data Fetching: TanStack Query, Axios

Styling: Tailwind CSS

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm start
Your app will be available at http://localhost:3000.

Folder Structure
src/components: Reusable components like form inputs and buttons.

src/features/auth: Redux slices, API functions, authentication logic.

src/api: Axios configuration and interceptors.

src/pages: Page components like Login and Dashboard.

Axios Interceptors
Attach accessToken to requests.

Automatically refresh expired tokens.

Example:

javascript
Copy
Edit
Api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

