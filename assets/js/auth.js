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
  
  // DOM elements with null checks
  const getSafeElement = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID '${id}' not found`);
    }
    return element;
  };
  
  const authButtons = getSafeElement('authButtons');
  const userProfile = getSafeElement('userProfile');
  const dashboardLink = getSafeElement('dashboardLink');
  const mobileDashboardLink = getSafeElement('mobileDashboardLink');
  const mobileLoginLink = getSafeElement('mobileLoginLink');
  const mobileRegisterLink = getSafeElement('mobileRegisterLink');
  const mobileSignOutLink = getSafeElement('mobileSignOutLink');
  const signOutButton = getSafeElement('signOutButton');
  const userAvatar = getSafeElement('userAvatar');
  const userName = getSafeElement('userName');
  
  // Safe DOM manipulation functions
  const safeClassListToggle = (element, action, className) => {
    if (element && element.classList) {
      element.classList[action](className);
    }
  };
  
  const safeSetAttribute = (element, attr, value) => {
    if (element && element.setAttribute) {
      element.setAttribute(attr, value);
    }
  };
  
  const safeSetTextContent = (element, text) => {
    if (element && element.textContent !== undefined) {
      element.textContent = text;
    }
  };
  
  // Auth state listener
  auth.onAuthStateChanged(user => {
    try {
      if (user) {
        // User is signed in
        safeClassListToggle(authButtons, 'add', 'hidden');
        safeClassListToggle(userProfile, 'remove', 'hidden');
        safeClassListToggle(dashboardLink, 'remove', 'hidden');
        safeClassListToggle(mobileDashboardLink, 'remove', 'hidden');
        safeClassListToggle(mobileLoginLink, 'add', 'hidden');
        safeClassListToggle(mobileRegisterLink, 'add', 'hidden');
        safeClassListToggle(mobileSignOutLink, 'remove', 'hidden');
        
        // Update user info
        const displayName = user.displayName || user.email.split('@')[0];
        safeSetTextContent(userName, displayName);
        safeSetAttribute(userAvatar, 'src', user.photoURL || 'https://via.placeholder.com/40');
      } else {
        // User is signed out
        safeClassListToggle(authButtons, 'remove', 'hidden');
        safeClassListToggle(userProfile, 'add', 'hidden');
        safeClassListToggle(dashboardLink, 'add', 'hidden');
        safeClassListToggle(mobileDashboardLink, 'add', 'hidden');
        safeClassListToggle(mobileLoginLink, 'remove', 'hidden');
        safeClassListToggle(mobileRegisterLink, 'remove', 'hidden');
        safeClassListToggle(mobileSignOutLink, 'add', 'hidden');
      }
    } catch (error) {
      console.error('Error in auth state listener:', error);
    }
  });
  
  // Sign out functions with enhanced error handling
  const handleSignOut = (redirectUrl = 'index.html') => {
    auth.signOut()
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch(error => {
        console.error('Sign out error:', error);
        // Optionally show error to user
        alert('Sign out failed. Please try again.');
      });
  };
  
  if (signOutButton) {
    signOutButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleSignOut();
    });
  }
  
  if (mobileSignOutLink) {
    mobileSignOutLink.addEventListener('click', (e) => {
      e.preventDefault();
      handleSignOut();
    });
  }
  
  // Initialize only if auth elements exist
  const authElementsExist = [
    authButtons, userProfile, dashboardLink,
    mobileDashboardLink, mobileLoginLink,
    mobileRegisterLink, mobileSignOutLink
  ].some(element => element !== null);
  
  if (!authElementsExist) {
    console.log('Auth UI elements not found on this page - skipping auth UI initialization');
  }