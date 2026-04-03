// REGISTER
function register() {
  const fullname = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ fullname, username, email, password });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully!");
  window.location.href = "login.html";
}

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

// PROTECT PAGE
function protectPage() {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
  }
}

// PROTECT NAVIGATION
function protectNavigation(event, url) {
  if (!localStorage.getItem("isLoggedIn")) {
    event.preventDefault();
    window.location.href = "login.html";
    return false;
  }
  
  // If logged in and has valid URL, navigate
  if (url && url !== '#') {
    window.location.href = url;
  }
  return true;
}

// LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// TOGGLE MOBILE MENU
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

// UPDATE NAVIGATION
function updateNavigation() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = localStorage.getItem("currentUser");
  
  // Find all desktop nav elements
  const desktopNavElements = document.querySelectorAll('.nav-auth-section');
  
  // Find all mobile nav elements  
  const mobileNavElements = document.querySelectorAll('.nav-auth-section-mobile');
  
  if (isLoggedIn && currentUser) {
    // Parse user data
    const user = JSON.parse(currentUser);
    
    // Show user initials and logout in desktop
    const displayName = user.username || user.fullname || user.email;
    const initials = getUserInitials(displayName);
    
    desktopNavElements.forEach(nav => {
      nav.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              ${initials}
            </div>
            <span class="text-white text-sm">${displayName}</span>
          </div>
          <button onclick="logout()" class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded transition">Logout</button>
        </div>
      `;
    });
    
    // Show user initials and logout in mobile
    mobileNavElements.forEach(nav => {
      nav.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            ${initials}
          </div>
          <span class="text-white text-sm">${displayName}</span>
          <button onclick="logout()" class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded transition">Logout</button>
        </div>
      `;
    });
  } else {
    // Show sign in button in desktop
    desktopNavElements.forEach(nav => {
      nav.innerHTML = `
        <a href="login.html" class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded transition">Sign In</a>
      `;
    });
    
    // Show sign in button in mobile
    mobileNavElements.forEach(nav => {
      nav.innerHTML = `
        <a href="login.html" class="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded transition">Sign In</a>
      `;
    });
  }
}

// GET USER INITIALS
function getUserInitials(email) {
  const parts = email.split('@')[0].split('.');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email.substring(0, 2).toUpperCase();
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', updateNavigation);