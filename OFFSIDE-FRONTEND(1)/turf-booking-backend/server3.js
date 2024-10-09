
//===============================================================================================================================
// const express = require('express');
// const fs = require('fs');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const path = require('path');
// const session = require('express-session');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const app = express();
// const PORT = 5002;

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Helper functions to read/write users.json
// // const readUsers = () => {
// //     const data = fs.readFileSync('users.json', 'utf-8');
// //     return JSON.parse(data);
// // };
// const readUsers = () => {
//     const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8');
//     return JSON.parse(data);
// };


// const writeUsers = (users) => {
//     fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
// };

// // Passport configuration
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: '179147707705-dmoo679p5v9mjkh8m6kpsjgg0vct0hc6.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: 'http://localhost:5002/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//     const users = readUsers();
    
//     // Check if the user exists by email
//     let user = users.find(user => user.email === profile.emails[0].value);
    
//     // If user doesn't exist, add to users.json
//     if (!user) {
//         user = { email: profile.emails[0].value, password: null }; // No password for Google sign-in
//         users.push(user);
//         writeUsers(users);
//     }
    
//     done(null, user);
// }));

// // Google Auth Routes
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login.html' }),
//     (req, res) => {
//         // Successful authentication
//         res.redirect('/'); // Redirect to home or a protected page
//     }
// );

// // Logout Route
// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/login.html'); // Redirect to login page after logout
// });

// // Sign up route
// app.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     const users = readUsers();

//     // Check if user already exists
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//         return res.status(400).json({ error: 'Email already in use' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Add the new user
//     users.push({ email, password: hashedPassword });
//     writeUsers(users);

//     res.status(201).json({ message: 'User registered successfully' });
// });

// // Login route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const users = readUsers();

//     // Check if the user exists
//     const user = users.find(user => user.email === email);
//     if (!user) {
//         return res.status(400).json({ error: 'User not found' });
//     }

//     // Verify the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Successful login
//     res.status(200).json({ message: 'Login successful' });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//============================================================================================================================

// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors'); // Import cors

// const app = express();
// const PORT = 5002;

// app.use(cors()); // Enable CORS for all routes
// app.use(bodyParser.json()); // For parsing application/json

// // Load the users from the JSON file

// // Login Route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // Load users
//     const users = loadUsers();

//     // Find the user by email
//     const user = users.find(user => user.email === email);
//     if (!user) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Compare the password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful' });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//=============================================================================================================================================
// const express = require('express');                                          // works perf
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const cors = require('cors');
// const app = express();
// const PORT = 5002;

// app.use(cors({
//     origin:"*"
// }));
// app.use(bodyParser.json());

// // Load the users from the JSON file
// const loadUsers = () => {
//     if (fs.existsSync('users.json')) {
//         const data = fs.readFileSync('users.json');
//         return JSON.parse(data);
//     }
//     return [];
// };

// // Save users back to the JSON file
// const saveUsers = (users) => {
//     fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
// };

// // Login Route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // Email validation on the server-side
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ error: 'Invalid email format' });
//     }

//     // Load users
//     const users = loadUsers();

//     // Find the user by email
//     const user = users.find(user => user.email === email);
//     if (!user) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Compare the password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful' });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//=============================================================================================================================================
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path'); // Importing path module for serving static files

const app = express();
const PORT = 5002;

// Middleware setup
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Load the users from the JSON file
const loadUsers = () => {
    if (fs.existsSync('users.json')) {
        const data = fs.readFileSync('users.json');
        return JSON.parse(data);
    }
    return [];
};

// Save users back to the JSON file
const saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Passport Google OAuth configuration
passport.use(new GoogleStrategy({
    clientID: '179147707705-dmoo679p5v9mjkh8m6kpsjgg0vct0hc6.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    const users = loadUsers();

    // Check if user already exists
    let user = users.find(user => user.googleId === profile.id);
    if (!user) {
        // If user doesn't exist, create a new one
        user = {
            id: users.length + 1,
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
        };
        users.push(user);
        saveUsers(users);
    }

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
    const users = loadUsers();
    const user = users.find(user => user.googleId === id);
    done(null, user);
});

// Google authentication route
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/profile'); // Redirect to a profile page or dashboard after successful login
    }
);

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Email validation on the server-side
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Load users
    const users = loadUsers();

    // Find the user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../turf-booking-frontend/loginpage')));

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Load users
    const users = loadUsers();

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user to the users array
    users.push({ username, email, password: hashedPassword });

    // Save the updated users array back to the file
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});








// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const cors = require('cors');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// const path = require('path');

// const app = express();
// const PORT = 5002;

// // Middleware setup
// app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());
// app.use(session({
//     secret: 'your-session-secret',
//     resave: false,
//     saveUninitialized: true
// }));

// // Initialize passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Load the users from the JSON file
// const loadUsers = () => {
//     if (fs.existsSync('users.json')) {
//         const data = fs.readFileSync('users.json');
//         return JSON.parse(data);
//     }
//     return [];
// };

// // Save users back to the JSON file
// const saveUsers = (users) => {
//     fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
// };

// // Passport Google OAuth configuration
// passport.use(new GoogleStrategy({
//     clientID: 'your-client-id',
//     clientSecret: 'your-client-secret',
//     callbackURL: '/auth/google/callback'
// }, (accessToken, refreshToken, profile, done) => {
//     const users = loadUsers();

//     // Check if user already exists
//     let user = users.find(user => user.googleId === profile.id);
//     if (!user) {
//         // If user doesn't exist, create a new one
//         user = {
//             id: users.length + 1,
//             googleId: profile.id,
//             email: profile.emails[0].value,
//             name: profile.displayName
//         };
//         users.push(user);
//         saveUsers(users);
//     }

//     return done(null, user);
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.googleId);
// });

// passport.deserializeUser((id, done) => {
//     const users = loadUsers();
//     const user = users.find(user => user.googleId === id);
//     done(null, user);
// });

// // Google authentication route
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// // Google callback route
// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         res.redirect('/profile'); // Redirect to a profile page or dashboard after successful login
//     }
// );

// // Function to validate email and phone number
// const isValidEmailOrPhone = (input) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{10}$/; // Regex for a 10-digit phone number
//     return emailRegex.test(input) || phoneRegex.test(input);
// };

// // Login Route
// app.post('/login', async (req, res) => {
//     const { input, password } = req.body; // Change email to input

//     // Validate email or phone number
//     if (!isValidEmailOrPhone(input)) {
//         return res.status(400).json({ error: 'Invalid email or phone number format' });
//     }

//     // Load users
//     const users = loadUsers();

//     // Find the user by email or phone number
//     const user = users.find(user => user.email === input || user.phone === input); // Assuming phone number is stored in the user object
//     if (!user) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Compare the password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful' });
// });

// // Serve static files from the frontend
// app.use(express.static(path.join(__dirname, '../turf-booking-frontend/loginpage')));

// // Signup Route
// app.post('/signup', async (req, res) => {
//     const { username, input, password } = req.body; // Change email to input

//     // Validate email or phone number
//     if (!isValidEmailOrPhone(input)) {
//         return res.status(400).json({ error: 'Invalid email or phone number format' });
//     }

//     // Load users
//     const users = loadUsers();

//     // Check if the user already exists
//     const existingUser = users.find(user => user.email === input || user.phone === input); // Assuming phone number is stored in the user object
//     if (existingUser) {
//         return res.status(400).json({ error: 'Email or phone number already in use' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Add new user to the users array
//     users.push({ username, email: input.includes('@') ? input : null, phone: input.includes('@') ? null : input, password: hashedPassword });

//     // Save the updated users array back to the file
//     saveUsers(users);

//     res.status(201).json({ message: 'User registered successfully' });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
