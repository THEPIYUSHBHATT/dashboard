Dynamic Widget Dashboard
This project is a dynamic dashboard built using React and Tailwind CSS, fulfilling the requirements to manage widgets within categories. The project uses the Context API for state management, allowing users to add, remove, and search widgets across different categories, with persistent storage using localStorage.

Features
Dynamic Category and Widget Management:

The dashboard is built from a JSON file (widgets.json) that contains categories, each with multiple widgets.
Users can dynamically add or remove widgets from any category. For instance, the "CSPM Executive Dashboard" is an example category where widgets can be managed.
Widget Interaction:

Users can click on the +Add Widget button to add a widget by specifying its name and text, which is then added to the selected category.
Each widget has a cross icon (✕) allowing users to remove it from the category directly.
Users can also manage widgets by unchecking them from the category list.
Search Functionality:

A search feature is implemented, allowing users to search through the list of available widgets.

Development and Tools
Framework: React
Styling: Tailwind CSS
State Management: Context API
Persistent Storage: localStorage for saving widgets across page reloads
Setup and Installation


To run this project locally, follow these steps:

Clone the Repository:
git clone https://github.com/your-repo-url.git
cd your-repo-directory

Install Dependencies:
npm install

Run the Application:
npm run dev

Access the Application:

Open your browser and navigate to http://localhost:3000 (or the port provided by the terminal) to view the dashboard.
Reflections
I have implemented nearly all the requirements provided in the assignment, from dynamic widget management to search functionality. This project allowed me to brush up on my skills in React, state management with Context API, and responsive UI design with Tailwind CSS. I am confident that my efforts and the outcome of this project demonstrate my potential as a Frontend Trainee. I would be honored to join the team and continue growing in this role.
