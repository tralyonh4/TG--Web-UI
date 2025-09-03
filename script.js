// Example: Fetch and display files from the 'octocat/Hello-World' public GitHub repo

document.addEventListener("DOMContentLoaded", () => {
  // Removed automatic GitHub file fetch on page load
    // Dropdown menu logic for Home.html user icon
    const userIcon = document.getElementById('userIcon');
    const userDropdown = document.getElementById('userDropdown');
    const logoutMenuItem = document.getElementById('logoutMenuItem');
    if (userIcon && userDropdown) {
        userIcon.addEventListener('click', function(e) {
          e.stopPropagation();
          if (userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
            setTimeout(() => { userDropdown.style.display = 'none'; }, 250);
          } else {
            userDropdown.style.display = 'block';
            setTimeout(() => { userDropdown.classList.add('show'); }, 10);
          }
        });
        // Call this function when you want to display the files (e.g., after clicking a tab or search)
        // fetchGitHubRepoFiles();

        // Make sure you have an element with id 'github-file-list' in your HTML to display the results
        // Example: <ul id="github-file-list"></ul>
        document.addEventListener('click', function(e) {
          if (userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
            setTimeout(() => { userDropdown.style.display = 'none'; }, 250);
          }
        });
    }
    if (logoutMenuItem) {
      logoutMenuItem.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'Acelogin.html';
      });
    }
      // Login logic for ACElogin.html
      const loginForm = document.querySelector('.login-form');
      if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const userID = document.getElementById('userID').value.trim();
          const errorDiv = document.getElementById('login-error');
          if (userID.length > 0) {
            errorDiv.style.display = 'none';
            localStorage.setItem('sidebarAnimate', 'true');
            window.location.href = 'Home.html';
          } else {
            errorDiv.textContent = 'UserID is required.';
            errorDiv.style.display = 'block';
          }
        });
      }
  
      // Logout logic for Home.html
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
          window.location.href = 'ACElogin.html';
        });
      }
    // Select all sidebar nav links and welcome message element
      const sidebarItems = document.querySelectorAll(".sidebar-item");
      const dashboardWelcome = document.querySelector(".dashboard-welcome");
        
      // Animate sidebar items only if coming from login
      if (localStorage.getItem('sidebarAnimate') === 'true') {
        sidebarItems.forEach((item, idx) => {
          setTimeout(() => {
            item.classList.add('fade-in');
          }, idx * 300 + 400); // 300ms delay between each, 400ms initial delay
        });
        localStorage.removeItem('sidebarAnimate');
      }
  
    // create an object to map sidebar link text to their corresponding content view
    const views = {
      "Recent Documents": document.getElementById("recent-documents-view"),
      "Tagged Documents": document.getElementById("tagged-documents-view"),
      "Version Control": document.getElementById("version-control-view"),
      About: document.getElementById("about-view"),
    };
  
    //======HELPER FUNCTIONS=====
  
    // Hide all content views by adding 'hidden' class
    const hideAllViews = () => {
      Object.values(views).forEach((view) => {
        view.classList.add("hidden");
      });
    };

    // Hide document views and version control view on page load and throughout navigation
    const recentDocumentsView = document.getElementById("recent-documents-view");
    const taggedDocumentsView = document.getElementById("tagged-documents-view");
    const versionControlView = document.getElementById("version-control-view");
    if (recentDocumentsView) recentDocumentsView.classList.add("visible");
    if (taggedDocumentsView) taggedDocumentsView.classList.add("visible");
    if (versionControlView) versionControlView.classList.add("visible");
  
    //   Set the clicked link as active and remove 'active class' from others
    const setActiveLink = (targetLink) => {
      sidebarItems.forEach((item) => {
        item.classList.remove("active");
      });
      targetLink.classList.add("active");
    };
  
    // Sidebar toggle logic for mobile
    // select hamburger menu button and the sidebar
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
  
    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("show-sidebar");
      });
    }
  
    //======Handle events for navigation======
    sidebarItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        //   event.preventDefault();
  
        // get the text content of the clicked link
        const linkText = item.textContent.trim();
  
        // if on mobile screen, close sidebar after a link is clicked
        if (sidebar.classList.contains("show-sidebar")) {
          sidebar.classList.remove("show-sidebar");
        }
  
        // hide all content views and set the clicked link as active
        hideAllViews();
        setActiveLink(item);
        //   show content view corresponding to the clicked link
        if (views[linkText]) {
          views[linkText].classList.remove("hidden");
        }
  
        // Hide welcome message when the About link is clicked
        if (linkText === "About") {
          dashboardWelcome.classList.add("hidden");
        } else {
          dashboardWelcome.classList.remove("hidden");
        }

        // Always keep document views and version control view hidden
        if (recentDocumentsView) recentDocumentsView.classList.add("hidden");
        if (taggedDocumentsView) taggedDocumentsView.classList.add("hidden");
        if (versionControlView) versionControlView.classList.add("hidden");

        // Trigger animation for about cards when About view is shown
        if (linkText === "About") {
          animateAboutCards();
        }
      });
    });

    // Pop-in animation for about cards
    function animateAboutCards() {
      const cards = document.querySelectorAll('.about-card');
      // Remove pop-in class to reset animation
      cards.forEach(card => card.classList.remove('pop-in'));
      // Re-add pop-in class with delay for each card
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('pop-in');
        }, i * 350);
      });
    }

    // Show alert when document link is clicked
    const documentLinks = document.querySelectorAll('.document-link');
    documentLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Document can\'t be open.');
      });
    });
  });