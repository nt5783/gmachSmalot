<img width="1875" height="1013" alt="Screenshot 2025-07-31 013952" src="https://github.com/user-attachments/assets/17a4ae15-d1c0-4c3a-aab7-40e72b09922d" />
<img width="1919" height="836" alt="Screenshot 2025-07-31 014058" src="https://github.com/user-attachments/assets/ab6d25ab-2b2d-447c-bebf-c1916a1207be" />
<img width="1110" height="718" alt="Designer (23) (1)" src="https://github.com/user-attachments/assets/979695ea-dffc-45df-ba53-30d2d77df966" />



# gmachSmalot – Gown Rental App for "Rinat Lev"

gmachSmalot is a full-stack web application for managing the gown rental business "Rinat Lev". The app allows customers to browse available gowns, reserve a dress for a specific date, and pay securely via PayPal. Administrators can manage inventory and view reservations through a dedicated admin interface.

![Gmach Smalot dashboard](/assets/images/Screenshot 2025-07-31 013952.png "San Juan Mountains")

---

## Features

### Customer Functionality
- Browse the gown collection with photos and details.
- Choose an event date and check gown availability.
- Reserve a gown for the selected date.
- Complete payment securely via PayPal.

### Admin Functionality
- View customer reservations.
- Add new gowns to the collection.
- Remove gowns from inventory.
- Edit gown details (size, image, availability, price).

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js (Express)
- **Database:** MySQL
- **Payment Integration:** PayPal REST API

---


## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nt5783/gmachSmalot.git
cd gmachSmalot
```

### 2. Configure Environment Variables

Create a `.env` file in both the `server/` and `client/` directories.

Example `.env` for the server:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=gmachdb
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
```

### 3. Install Dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

### 4. Run the Application

Open two terminal windows:

**Backend:**

```bash
cd server
npm run dev
```

**Frontend:**

```bash
cd client
npm start
```

---

## Roadmap / Planned Features

- Improved mobile responsiveness
- Admin image upload interface
- Calendar view for admin reservations
- Email confirmation for bookings
- Customer invoice downloads

---

## Project Highlights

- End-to-end design, specification, and development
- Separate user interfaces for customer and admin
- Focus on simple, intuitive UI/UX
- Secure PayPal integration
- Scalable, maintainable codebase

---

## License

This project is licensed under the MIT License.

---

## Author

Feigi Zaks  
Junior Full Stack Developer  
Email: PZ0933@gmail.com  
GitHub: [feigiz](https://github.com/feigiz)
