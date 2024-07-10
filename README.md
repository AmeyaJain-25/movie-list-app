# Movie List App

This project is a Movie Information App built using Next.js, designed to display a list of movies sourced from The Movie Database (TMDb) API.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine.

### Technologies used

- React.js
- Next.js
- Node
- Git

### Installation

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/AmeyaJain-25/movie-list-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd movie-list-app
   ```

3. Install dependencies: Make sure you have **nvm** and **node** installed in your system.

   ```bash
   nvm install 18.14.0
   nvm use
   npm install
   ```

4. Running the App: To run the app locally, use the following command:

   ```bash
   npm run dev
   ```

##### This command starts a development server at http://localhost:3000.

#### API Key Setup

You will need an API key from TMDb to fetch movie data. Create a _.env_ file in the root of the project folder and add your api key as such.

[More info for api here](https://developer.themoviedb.org/docs/authentication-application#api-key)

```bash
NEXT_PUBLIC_MOVIEDB_API_KEY=<your_api_key>
```

### Features Implemented

- Layout and UI:

  1. Custom UI components built using React/Next.js for reusability.
  2. Display movies sorted by popularity with title, image, genre, and description.
  3. Loads 20 movies per year initially (starting from 2012 by default).

- API Integration:

  1. Dynamic fetching of movies with Smooth scrolling to load more movies as the user scrolls in any direction.
  2. Filter UI for movies filtering by genre fetched. Updates movie list based on selected genre(s).
  3. Search functionality to find movies based on user input.
  4. Additional error handling beyond basic setup. The option to load data if failure happens or encounters at any stage in smooth scrolling, error boundaries and much more is taken care of.

- Code Quality:

  1. Well-structured and maintainable code following best practices.
  2. Custom reusable components. Used styled-components to build components from scratch.

### Features NOT Implemented

- Layout and UI:
  1. Fetching cast and directors data for each movie.

**Author - [Ameya Jain](https://github.com/AmeyaJain-25/)**

**Public repository: [GitHub Link](https://github.com/AmeyaJain-25/movie-list-app.git)**
