# 👗 gmachSmalot - Gown Rental App for "Rinat Lev"

A full-stack web application designed for the gown rental business "Rinat Lev". The app enables customers to browse gowns, book an available dress for their event date, and pay online — while providing admin capabilities for managing inventory and reservations.

---

## ✨ Features

### 🧍 For Customers
- 📷 **Browse Collection** – View photos and details of all available gowns.
- 📅 **Select Event Date** – Choose a date for your event and check gown availability.
- 🛒 **Reserve a Gown** – Secure a gown for your selected date.
- 💳 **Pay via PayPal** – Complete your rental with a secure online payment.

### 👩‍💼 For Admin
- 📋 **View Reservations** – See all upcoming and past bookings.
- ➕ **Add New Gowns** – Easily upload new dresses to the collection.
- 🗑️ **Delete Gowns** – Remove outdated or unavailable gowns.
- ✏️ **Update Details** – Edit gown info such as sizes, images, availability, and price.

---

## 🧱 Tech Stack

- **Frontend:** React
- **Backend:** Node.js (Express)
- **Database:** MySQL
- **Payment Integration:** PayPal REST API

---

## 📁 Project Structure

```
gmachSmalot/
│
├── client/              # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── ...
│
├── server/              # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
│
├── db/                  # SQL scripts / config
│
├── .env                 # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/nt5783/gmachSmalot.git
cd gmachSmalot
```

### 2. Environment Variables

Create a `.env` file in both the `server/` and `client/` directories. Example for the server:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=gmachdb
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
```

### 3. Install Dependencies

#### Backend:
```bash
cd server
npm install
```

#### Frontend:
```bash
cd ../client
npm install
```

### 4. Run the App

Open two terminals:

**Terminal 1 (backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (frontend):**
```bash
cd client
npm start
```

---

## 🧪 Features in Development / To-Do

- 📱 Mobile responsiveness improvements
- 📤 Upload images directly from admin panel
- 🗓️ Calendar view for admin reservations
- ✉️ Email notifications on booking confirmation
- 🧾 Invoice download for customers

---

## 🧑‍💻 Project Highlights

- 🎯 Full end-to-end design, specification, and implementation
- 👥 Differentiated UX for customer vs. admin
- 💡 Focus on intuitive, minimal, and user-friendly UI
- 🔐 Secure data handling and PayPal integration
- 🧰 Easily maintainable and scalable codebase

---

## 🙋‍♀️ About the Authors

**Nechama Taurog**
Full Stack Developer  
📧 nt243609@gmail.com  
🔗 [GitHub Profile](https://github.com/nt5783)

**Feigi Bass**  
Full Stack Developer  
📧 PZ0933@gmail.com  
🔗 [GitHub Profile](https://github.com/feigiz)
