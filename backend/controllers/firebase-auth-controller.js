const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail
} = require('../firebase');

const auth = getAuth();

class FirebaseAuthController {

    registerUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                email: "Email is required",
                password: "Password is required",
            });
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        res.status(201).json({ message: "User created successfully!" });
                    })
            })
            .catch((error) => {
                const errorMessage = error.message || "An error occurred while registering user";
                res.status(500).json({ error: errorMessage });
            });
    }
}

module.exports = new FirebaseAuthController();