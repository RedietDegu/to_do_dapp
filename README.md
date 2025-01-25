# to-do-dapp

## Authors

- **Name**: Rediet Degu
- **Email**: redi.degu691@gmail.com
- **Phone**: +251909142168
- **WhatsApp**: +251909142168

---

# Project Overview  

**to-do-dapp** is a multi-user to-do list application built using **Chromia**, **Rell**, and the **FT4 library**. It ensures secure task management with blockchain-based authentication.

## Features  

- Add, update, complete, and delete tasks.  
- Filter tasks by status (completed/pending).  
- Sort tasks by due date.  

---

## How It Works  

### User Management  

- Connect an **EVM wallet** (e.g., MetaMask) to create a secure account.  
- User actions are authenticated and linked to the connected wallet.  

### Task Management  

- Add new tasks or update existing ones.  
- Mark tasks as complete or delete them.  
- Filter and sort tasks for better organization.  


## Setup Instructions and Installation

### Prerequisites

1. Set up a PostgreSQL database.
2. Install the **Chromia CLI** by following this guide:  
   [Chromia Setup Guide](https://learn.chromia.com/courses/marketplace-course/setup)

---

## Running the Project Locally

1. **Clone the Repository**:

```bash
   git clone git@gitlab.com:to-do-dapp/to-do-dapp.git
```

2. **Navigate to the Project Directory**:

```bash
cd to_do_dapp
```

3. **Start the Backend**:
   \*\*\*Navigate to the backend folder and run the Chromia node:

```bash
cd to-do-dapp-backend && chr install && chr node start

```

4. **Start the Frontend**:
   **_Open a new terminal, navigate to the frontend folder, and install dependencies_**:

```bash
cd to-do-dapp-frontend
```

**_Use either yarn or npm_**:

```bash
npm install
```

```bash
yarn
```

5. **Run the Frontend**:

```bash
yarn dev
```

**_ Or, if using npm_**:

```bash
npm run dev
```

6. **Access the Application**:
   **_Open your browser and navigate to_**:

   ## [http://localhost:3000](http://localhost:3000)

