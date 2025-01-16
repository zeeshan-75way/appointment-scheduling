# Appointment Service API

This is the documentation for the **Appointment Service API**, which allows users to manage appointments, including booking, rescheduling, canceling, and viewing appointments. The API supports role-based authentication, ensuring different permissions based on user roles (ADMIN, STAFF, USER).

## Features

- **JWT Authentication**: Secure the API routes using JWT tokens for user authentication.
- **Appointment Management**: Book, reschedule, cancel, and fetch user appointments.
- **Role-based Access Control**: Roles include ADMIN, STAFF, and USER, each with different levels of access.
- **Appointment Reminders**: Send email reminders for upcoming appointments.
- **Service Integration**: Integration with availability and service modules to manage bookings.

## Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16 or later)
- [npm](https://www.npmjs.com/) (recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) or a cloud-based MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/zeeshan-75way/appointment-scheduling
    appointment-scheduling
    ```

2.  **Install dependencies**:

    Using `npm` (recommended):

    ```bash
    npm install
    ```

    Or with `pnpm`:

    ```bash
    pnpm install
    ```

3.  **Create a `.env` file** in the root directory for your environment variables:

    ```bash
    PORT=5000
    MONGO_URI=<your-mongo-uri>
    JWT_SECRET=<your-secret-key>
    JWT_ACCESS_TOKEN_EXPIRY=<expiry-time>
    JWT_REFRESH_TOKEN_EXPIRY=<expiry-time>
    MAIL_PASSWORD=<your-mail-password>
    MAIL_USER=<your-mail-user>
    ```

## Scripts

Here are the available npm scripts:

- **Start the server (development mode)**:  
  Runs the server with `nodemon` for automatic restarts.

  ```bash
  npm run start
  ```

- **Build the project**:  
  Build the project for production.

  ```bash
  npm run build
  ```

- **Run TypeScript in development mode**:

  ```bash
  npm run start
  ```

## API Endpoints

### 1. **Book an Appointment**

**POST** `/appointment`

Book an appointment by selecting a service and an available time slot.

#### Request Body:

```json
{
  "availabilityId": "60c72b2f9f1b2c5f74c8977f",
  "serviceId": "60c72b2f9f1b2c5f74c89780"
}
```

#### Response:

```json
{
  "message": "Appointment Booked Successfully",
  "appointment": {
    "_id": "60c72b2f9f1b2c5f74c8977f",
    "availabilityId": "60c72b2f9f1b2c5f74c8977f",
    "serviceId": "60c72b2f9f1b2c5f74c89780",
    "userId": "60c72b2f9f1b2c5f74c89790",
    "status": "BOOKED",
    "date": "2025-01-20",
    "startTime": "2025-01-20T09:00:00Z"
  }
}
```

#### Status Codes:

- `201 Created`: Appointment successfully booked.
- `400 Bad Request`: Invalid request data.

### 2. **Get User Appointments**

**GET** `/appointment`

Retrieve all appointments for the authenticated user.

#### Response:

```json
{
  "message": "Appointments fetched successfully",
  "appointments": [
    {
      "_id": "60c72b2f9f1b2c5f74c8977f",
      "availabilityId": "60c72b2f9f1b2c5f74c8977f",
      "serviceId": "60c72b2f9f1b2c5f74c89780",
      "userId": "60c72b2f9f1b2c5f74c89790",
      "status": "BOOKED",
      "date": "2025-01-20",
      "startTime": "2025-01-20T09:00:00Z"
    }
  ]
}
```

#### Status Codes:

- `200 OK`: Appointments fetched successfully.
- `404 Not Found`: No appointments found for the user.

### 3. **Cancel an Appointment**

**PATCH** `/appointment/{id}`

Cancel a specific appointment by its ID.

#### Parameters:

- `id` (string): The ID of the appointment to cancel.

#### Response:

```json
{
  "message": "Appointment Cancelled Successfully",
  "appointment": {
    "_id": "60c72b2f9f1b2c5f74c8977f",
    "status": "CANCELLED"
  }
}
```

#### Status Codes:

- `200 OK`: Appointment successfully cancelled.
- `404 Not Found`: Appointment not found.

### 4. **Reschedule an Appointment**

**PATCH** `/appointment/reschedule`

Reschedule an appointment by selecting a new time slot.

#### Request Body:

```json
{
  "appointmentId": "60c72b2f9f1b2c5f74c8977f",
  "availabilityId": "60c72b2f9f1b2c5f74c89780"
}
```

#### Response:

```json
{
  "message": "Appointment Rescheduled Successfully",
  "appointment": {
    "_id": "60c72b2f9f1b2c5f74c8977f",
    "availabilityId": "60c72b2f9f1b2c5f74c8977f",
    "serviceId": "60c72b2f9f1b2c5f74c89780",
    "userId": "60c72b2f9f1b2c5f74c89790",
    "status": "RESCHEDULED",
    "date": "2025-01-20",
    "startTime": "2025-01-20T09:00:00Z"
  }
}
```

#### Status Codes:

- `200 OK`: Appointment successfully rescheduled.
- `400 Bad Request`: Invalid request data.

## Role-based Authorization

### Allowed Roles:

- **ADMIN**: Full access to all routes.
- **STAFF**: Can reschedule and cancel appointments.
- **USER**: Can book, view, and cancel their own appointments.

### Authentication

Make sure to include a valid Bearer token in the request header for authentication:

```bash
Authorization: Bearer <Your-JWT-Token>
```

## Folder Structure

Here’s an overview of the folder structure:

```
├── src
│   ├── common
│   │   ├── middleware
│   │   ├──helper
|   |   └──services
│   ├── appointment
│   │   ├── appointment.controller.ts
│   │   ├── appointment.schema.ts
│   │   ├── appointment.service.ts
│   │   ├── appointment.routes.ts
│   │   ├── appointment.validation.ts
│   │   └── appointment.dto.ts
│   ├── availability
│   └── user
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Error Handling

- **400 Bad Request**: Missing or invalid parameters.
- **404 Not Found**: Resource not found (e.g., appointment or user).
- **401 Unauthorized**: Missing or invalid JWT token.
- **403 Forbidden**: Insufficient permissions.
