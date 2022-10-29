// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, push } from "firebase/database"
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvSSmSRY1YXynd-gjdfBC-fi-nqzn5GKo",
  authDomain: "reactive-resume-bde21.firebaseapp.com",
  projectId: "reactive-resume-bde21",
  storageBucket: "reactive-resume-bde21.appspot.com",
  messagingSenderId: "784369660175",
  appId: "1:784369660175:web:c42eca650d6f39b20e4e7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const db = getDatabase(app);

// Get database reference
const dbRef = ref(db);

// Initialize auth on firebase app
const auth = getAuth(app);

// Initialize google auth instance
const provider = new GoogleAuthProvider();

function writeUserData(userId, email) {
    set(ref(db, 'users/' + userId), {
        email: email
    })
}

// Handle user sign in through Google
function handleSignIn() {
    signInWithPopup(auth, provider)
    .then((result) => {
    // Get Google login credential
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user.uid);
    // Assess whether user exists or not; if he does not exist then create account
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            writeUserData(user.uid, user.email)
        }
    })
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
}

// Update the user's profile to contain a first name, last name, phone number, and alt email to be used on resume
function updateProfile(firstName, lastName, phoneNumber, alternateEmail = null) {
    
    // Get current user
    const user = auth.currentUser;
    
    // If a user is logged in update the profile, else log no user
    if (user) {
        update(ref(db, `users/${user.uid}`), {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            alternateEmail: alternateEmail
        })
    } else {
        console.log("no current user")
    }
    
}

function updateKeyedObjectSection(objArray, endpoint) {
    // Iterate through each item in the object array, generate a new key, and set item object for that key
    // Push object to the given endpoint
    objArray.forEach(item => {
        push(ref(db, `users/${auth.currentUser.uid}/${endpoint}`), item)
    })
}

function updateStandardObjectSection(array, endpoint) {
    // Iterate through each item in array add to given endpoint
    array.forEach(item => {
        update(ref(db, `users/${auth.currentUser.uid}/${endpoint}`), item)
    })
}


export { handleSignIn, updateProfile, updateKeyedObjectSection, updateStandardObjectSection };
