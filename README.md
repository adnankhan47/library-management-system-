Library Management System

Overview
The Library Management System is a web application designed to manage books, users, and book checkouts within a library. 
It provides functionalities such as adding new books, updating book details, checking out books, returning books, and calculating late return fines.

Features
- User Authentication: Allows users to sign up and sign in. Differentiates between regular users and administrators.
- Book Management:
  - View all books in the library.(accessible only when you are signedIn)
  - View details of a specific book.(accessible only when you are signedIn)
  - Add new books (accessible only by administrators).
  - Update book details (accessible only by administrators).
  - Partially update book details (accessible only by administrators).
- Checkout System:
  - Check out a book.(accessible only when you are signedIn)
  - Return a book.(accessible only when you are signedIn)
  - Calculate late return fines.
- Cron Job:
  - Runs every 24 hours (or as scheduled) to update late return fines for overdue checkouts.
  - Note**: You get 2 access tokens once when you  signUp and another once you SignIn
    When you access any end point through post man you need to add Header where 
    Key:Authorization
    Value:(access token generated  once after you signUp)


    To access Admin based operation Sign-in with following credentials:
     {
        "email": "Admin@example.com",
        "password": "Password123"
    }


 Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT for authentication
- Cron for scheduling jobs

 Getting Started
1. Clone the repository:
   ```bash
   -git clone https://github.com/adnankhan47/library-management-system-.git
   -cd library-management-system-
   Install dependencies:
   -npm install
   Set up MongoDB:Create a MongoDB database and update the connection string in app.js.
   Run the application:
   -node index.js
