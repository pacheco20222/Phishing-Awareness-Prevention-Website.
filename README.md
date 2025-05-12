# Phishing Awareness & Prevention Website (Frontend)

This is the frontend of a complete cybersecurity awareness project focused on educating users about phishing threats. The project includes educational content, real-world phishing examples, prevention tips, and secure user interaction via a Node.js + MongoDB backend with 2FA support.

## 🌐 Technologies Used
- HTML5 & CSS3
- JavaScript
- Bootstrap 5
- Custom Cyberpunk-Themed Design

## 📁 Project Structure
```
Phishing-Awareness-Prevention-Website/
├── public/
│   ├── css/
│   │   ├── styles.css
│   │   ├── style_profile.css
│   ├── js/
│   │   ├── signup.js
│   │   ├── login.js
│   │   ├── update_user.js
│   │   ├── delete_user.js
│   ├── views/
│   │   ├── index.html
│   │   ├── phishing.html
│   │   ├── examples.html
│   │   ├── protection.html
│   │   ├── contact.html
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── profile.html
```

## 🛠 Features
- Cyberpunk-styled responsive layout
- Informative sections: What is phishing, real examples, prevention tips
- Contact form for user feedback
- Full authentication system (login, signup)
- Secure 2FA QR code and manual key
- Profile management (view, update, delete)
- Dynamic user interface powered by modular JS files

## 🧪 How to Run (Locally)
1. Clone this frontend repo.
2. Make sure you have the backend running on http://localhost:3000
3. Serve the `public` folder using the backend or a static server.
4. Navigate to http://localhost:3000 in your browser.

## 🖼 Screenshots

### Home Page
![Home Screenshot](screenshots/home.png)

### Signup Page with 2FA
![Signup Screenshot](screenshots/signup.png)

### Profile Page
![Profile Screenshot](screenshots/profile.png)

### Danger Zone (Delete Account)
![Delete Screenshot](screenshots/delete.png)

> 📸 **How to add your own screenshots**:
> 1. Create a folder named `screenshots` in the project root.
> 2. Place your `.png` or `.jpg` files inside.
> 3. Reference them in the README like this:
>    ```markdown
>    ![Alt text](screenshots/your_image.png)
>    ```

## 📂 Repository Status
This frontend is linked to a backend repo handling authentication, database connection, and 2FA:
- 🔗 [Backend Repository](<insert-backend-repo-link-here>)

## Backend Technologies and Features
- Node.js, Express, MongoDB, Mongoose
- Authentication with JWT
- Two-Factor Authentication (2FA)
- CRUD operations for user management
- Modular controllers and routes
- Environment variables required: `MONGO_URI`, `JWT_SECRET`, `TWO_FA_ENCRYPTION_KEY`

---
© 2025 Phishing Awareness. Educational project for cybersecurity training.
