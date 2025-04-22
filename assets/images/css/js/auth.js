// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkeUHT5wBxr2eNlNCFqUfyhayZ7VMzjv8",
    authDomain: "student-portal-a2284.firebaseapp.com",
    projectId: "student-portal-a2284",
    storageBucket: "student-portal-a2284.appspot.com",
    messagingSenderId: "854780246625",
    appId: "1:854780246625:web:86899fc898fa2650668820"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM elements
const authButtons = document.getElementById('authButtons');
const userProfile = document.getElementById('userProfile');
const dashboardLink = document.getElementById('dashboardLink');
const mobileDashboardLink = document.getElementById('mobileDashboardLink');
const mobileLoginLink = document.getElementById('mobileLoginLink');
const mobileRegisterLink = document.getElementById('mobileRegisterLink');
const mobileSignOutLink = document.getElementById('mobileSignOutLink');
const signOutButton = document.getElementById('signOutButton');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');

// Auth state listener
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        authButtons.classList.add('hidden');
        userProfile.classList.remove('hidden');
        dashboardLink.classList.remove('hidden');
        mobileDashboardLink.classList.remove('hidden');
        mobileLoginLink.classList.add('hidden');
        mobileRegisterLink.classList.add('hidden');
        mobileSignOutLink.classList.remove('hidden');
        
        // Update user info
        userName.textContent = user.displayName || user.email.split('@')[0];
        userAvatar.src = user.photoURL || 'https://via.placeholder.com/40';
    } else {
        // User is signed out
        authButtons.classList.remove('hidden');
        userProfile.classList.add('hidden');
        dashboardLink.classList.add('hidden');
        mobileDashboardLink.classList.add('hidden');
        mobileLoginLink.classList.remove('hidden');
        mobileRegisterLink.classList.remove('hidden');
        mobileSignOutLink.classList.add('hidden');
    }
});

// Sign out function
if (signOutButton) {
    signOutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            // Redirect to home page after sign out
            window.location.href = 'index.html';
        }).catch(error => {
            console.error('Sign out error:', error);
        });
    });
}

if (mobileSignOutLink) {
    mobileSignOutLink.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        }).catch(error => {
            console.error('Sign out error:', error);
        });
    });
}