document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle display of nav links
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        mobileMenuBtn.textContent = '☰';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
        navLinks.style.padding = '20px 0';
        navLinks.style.alignItems = 'center';
        navLinks.style.borderBottom = '1px solid rgba(197, 160, 89, 0.2)';
        mobileMenuBtn.textContent = '✕';
      }
    });
  }

  // Handle Form Submission via FormSubmit AJAX
  const quoteForms = document.querySelectorAll('.quote-form');
  quoteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard redirect
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      // Gather form data
      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          btn.textContent = 'Thank you. We will be in touch with you.';
          btn.style.backgroundColor = '#4caf50'; // Success green
          btn.style.color = '#fff';
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.opacity = '1';
            btn.disabled = false;
            form.reset();
          }, 4000);
        } else {
          btn.textContent = 'Error Sending';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
          }, 3000);
        }
      }).catch(error => {
        btn.textContent = 'Error Sending';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.opacity = '1';
          btn.disabled = false;
        }, 3000);
      });
    });
  });
});
