## QuickStay — Hotel Booking Management System

> A full-stack hotel booking web application with real-time room management, secure authentication, and a hotel admin dashboard.

![QuickStay Banner](https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=400&fit=crop)


## Live Demo

<!-- Add your deployed link here -->
🔗 [View Live Project](#) &nbsp;|&nbsp; [GitHub Repository](#)


##  Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Author](#author)


## About the Project

**QuickStay** is a modern, full-stack Hotel Booking System built to demonstrate end-to-end web development skills. It allows users to browse available rooms, make bookings, and manage their reservations — while hotel admins can manage room listings, track revenue, and monitor bookings from a dedicated dashboard.

This project was built as a personal portfolio project to showcase skills in React, Next.js, MySQL, and third-party integrations like Clerk Authentication and Stripe Payments.



## Features

###  User Side
-  **Search & Browse Rooms** — Filter by destination, check-in/check-out date, and guest count
- **Featured Destinations** — Curated hotel listings with pricing and ratings
- **Exclusive Offers** — Time-limited deals (Summer Escape, Romantic Getaway, Luxury Retreat)
-  **Room Booking** — Book available rooms with real-time availability status
- **My Bookings** — View and track personal booking history
- *Guest Reviews** — Read testimonials from verified guests
- **Experience Page** — Explore curated dining, wellness, adventure, and events offerings
-  **Newsletter Subscription** — Stay updated with offers and travel inspiration

###  Admin / Hotel Owner Dashboard
- **Dashboard Overview** — Total bookings and revenue at a glance
-  **Add Room** — Upload room images, set room type, price, and amenities
-  **Room Listings** — View, manage, and toggle availability of all rooms
-  **Recent Bookings Table** — Track guest name, room, amount, and payment status

###  Authentication
- Secure sign-in / sign-up via **Clerk**
- Google OAuth login support
- Account management (profile update, email, connected accounts)


##  Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js / Next.js |
| **Styling** | Tailwind CSS |
| **Authentication** | Clerk |
| **Database** | MySQL |
| **ORM / Query** | Raw SQL / MySQL Workbench |
| **Image Hosting** | Unsplash (external URLs) |
| **Deployment** | Vercel (Frontend) |


##  Database Schema

The application uses a MySQL database named hotel_booking with the following tables:

### rooms Table
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Auto-increment primary key |
| room_number | VARCHAR | Room identifier (e.g., 101, 102) |
| type | ENUM | SINGLE / DOUBLE / SUITE |
| price | INT | Price per night (₹) |
| capacity | INT | Max guests |
| available | BOOLEAN | Availability status |
| description | TEXT | Room description |
| image_url | TEXT | Room image URL |
| city | VARCHAR | City location |

### bookings Table
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Auto-increment primary key |
| guest_name | VARCHAR | Booked guest name |
| guest_email | VARCHAR | Guest email address |
| guest_phone | VARCHAR | Guest phone number |
| room_id | INT (FK) | References rooms.id |
| check_in | DATE | Check-in date |
| check_out | DATE | Check-out date |
| total_price | INT | Total booking amount |
| status | ENUM | CONFIRMED / PENDING / CANCELLED |
| created_at | DATETIME | Booking timestamp |

### Sample SQL Queries Used

sql
-- View all rooms
SELECT * FROM hotel_booking.rooms;

-- View all bookings
SELECT * FROM hotel_booking.bookings;

-- Count total rooms
SELECT COUNT(*) AS total_rooms FROM hotel_booking.rooms;

-- Count total bookings
SELECT COUNT(*) AS total_bookings FROM hotel_booking.bookings;

-- Add city column
ALTER TABLE hotel_booking.rooms ADD COLUMN city VARCHAR(100) DEFAULT 'Mumbai';



##  Screenshots

| Page | Preview |
|---|---|
|  Home / Hero | Search bar with destination, check-in, check-out, guests |
| Featured Destinations | Hotel cards with ratings, price, and Book Now button |
|  Exclusive Offers | Discount cards with expiry dates |
|  Hotel Rooms | Room listings with filters and sort options |
|  Experience Page | Dining, Wellness, Adventure, Events tabs |
| Admin Dashboard | Booking stats, revenue, recent bookings table |
|  Add Room | Room form with image upload, type, price, amenities |
|  Room Listings | Toggle availability with on/off switch |
|  Profile | Clerk account management modal |


##  Getting Started

## Prerequisites
- Node.js v18+
- MySQL 8.0+
- npm or yarn

## Installation


# 1. Clone the repository
git clone https://github.com/your-username/quickstay.git

# 2. Navigate to the project directory
cd quickstay

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
Fill in your credentials (see Environment Variables section)

# 5. Set up the database
Run the SQL schema in MySQL Workbench or terminal
mysql -u root -p < database/schema.sql

# 6. Start the development server
npm run dev


Open [http://localhost:3000](http://localhost:3000) to view the app.


##  Environment Variables

Create a `.env.local` file in the root directory with the following:

env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hotel_booking



##  What I Learned

- Implementing **Clerk Authentication** with Google OAuth in a Next.js app
- Designing a **relational MySQL database** with foreign key constraints
- Building a **role-based UI** (user vs. admin views)
- Creating a **responsive multi-page layout** with Tailwind CSS
- Managing **real-time availability** state for room bookings
- Working with **image uploads and external URL storage**

##  Future Improvements

- [ ] Stripe payment gateway integration
- [ ] Email confirmation on booking
- [ ] Date conflict validation (prevent double booking)
- [ ] User booking cancellation
- [ ] Admin analytics charts (revenue over time)
- [ ] Mobile app version


##  Author

Dharshini S

Full Stack Developer

Skills: HTML,CSS,JavaScript,React.js,Java 

Focus: Frontend Development | Backend Development

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/your-profile)

If you found this project helpful, please give it a star!

##  License

This project is open source and available under the [MIT License](LICENSE).
