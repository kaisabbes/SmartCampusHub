📚 Distributed Student Request Management System
📝 Project Description

This project is a distributed system architecture that enables students to submit structured requests using XML over SOAP, which are validated and then processed by RESTful microservices. Administrators can review, manage, and respond to these requests through a modern web interface.

The system is designed for university environments, where strict data contracts, validation, and reliability are essential.

🏗️ System Architecture
Student Client (React - XML)
        ↓
SOAP Integration Layer (XSD Validation + JAXB)
        ↓
REST API (Spring Boot)
        ↓
MySQL Database

🔄 Request Lifecycle

The student creates a request through the frontend.

The frontend generates a structured XML document.

The SOAP service:

Validates the XML using XSD schemas

Converts XML to Java objects using JAXB

Valid data is forwarded to the REST API.

The REST API applies business logic and stores the request in MySQL.

The administrator reviews and responds to the request.

The student can view the response and request status.

🛠️ Technologies Used
Frontend

React

Tailwind CSS

XML generation

Middleware

SOAP Web Services

JAXB (Java Architecture for XML Binding)

XSD validation

Backend

Spring Boot (REST API)

MySQL Database

AI Integration

Gemini API for assisting in request drafting

👥 User Roles
Student

Submit structured requests

Track request status

View administrator responses

Administrator

View incoming student requests

Respond to requests

Update request status

🚀 Key Features

XML-based request submission

Strict schema validation

SOAP-to-REST integration

Role-based request handling

Scalable microservice architecture

AI-assisted request drafting

📦 Future Enhancements

Authentication and authorization (JWT / OAuth2)

Email or in-app notifications

Request history and analytics

Docker and Kubernetes deployment

📄 License

This project is developed for academic and educational purposes.

🙌 Acknowledgments

Spring Boot & SOAP Web Services

React & Tailwind CSS

Gemini AI API
