# Kanban Board Web Application

## Overview

The Kanban Board Web Application is a dynamic and user-friendly tool designed to help teams and individuals manage tasks and projects efficiently. This application provides an interactive Kanban board with functionalities to group and sort tasks based on different criteria, offering a flexible and visual approach to task management.

## Features

-   **Interactive Kanban Board**: Visualize tasks in a Kanban board layout with columns representing different stages of progress.
-   **Dynamic Task Grouping**: Group tasks based on criteria such as status, user, or priority, organizing tasks according to specific needs.
-   **Task Sorting**: Sort tasks by priority or title, allowing users to view tasks in the order that best suits their workflow.
-   **Responsive Design**: Ensures a smooth user experience on both desktop and mobile devices.
-   **Data Persistence**: User preferences for grouping and sorting are saved in `localStorage`, retaining settings across sessions.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces, used for developing the component-based architecture of the application.
-   **Axios**: A promise-based HTTP client for making API requests, used to fetch data from the backend.
-   **CSS**: Custom styling using CSS for creating a visually appealing and responsive layout.
-   **React Icons**: For integrating icons into the application to enhance the user interface.

## How to Run

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Doobiii/Quickshell-Frontend-Assessment.git
    cd kanban-board
    ```
2. **Install Dependencies**
    ```bash
    git install
    ```
3. **Start the Development Server**
    ```bash
    npm start
    ```

## Visit the Application

You can view the live Kanban Board application here:  
**[Kanban Board Application](https://kanbanapp-lilac.vercel.app/)**

## Project Structure

-   src/App.js: Main application component that manages state, handles data fetching, and renders the Kanban board.
-   src/Components/Navbar.js: Navbar component for task grouping and sorting controls.
-   src/Components/Card.js: Card component representing individual tasks.
-   src/UI/Navbar.css: Custom CSS for styling the Navbar component.

## API Integration

-   The application fetches task and user data from the following API endpoint:

```bash
https://api.quicksell.co/v1/internal/frontend-assignment
```

## Contributing

-   Contributions are welcome! Please follow the standard GitHub workflow for making contributions:

## Fork the repository

-   Create a new branch (git checkout -b feature/your-feature)
-   Make your changes
-   Commit your changes (git commit -am 'Add new feature')
-   Push to the branch (git push origin feature/your-feature)
-   Create a new Pull Request

## License

-   This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

-   React documentation for guidance on component-based architecture.
-   Axios documentation for details on making API requests.
