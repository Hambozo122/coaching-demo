/* Online Coaching Test - script.js
   Mobile menu, plan pre-select, front-end-only form validation.
   Nothing is sent anywhere. */
(function () {
  'use strict';

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setMenu(false); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---- Plan buttons pre-select the plan; the link itself scrolls to #contact ---- */
  var planSelect = document.getElementById('plan');
  document.querySelectorAll('[data-plan]').forEach(function (link) {
    link.addEventListener('click', function () {
      planSelect.value = link.getAttribute('data-plan');
    });
  });

  /* ---- Form validation ---- */
  var form = document.getElementById('contact-form');
  var card = document.getElementById('form-card');
  var thanks = document.getElementById('thank-you');
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var nameError = document.getElementById('name-error');
  var emailError = document.getElementById('email-error');

  var NAME_MSG = 'Please enter your name.';
  var EMAIL_MSG = 'Please enter a valid email address, such as name@example.com.';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function nameValid() { return nameInput.value.trim() !== ''; }
  function emailValid() { return EMAIL_RE.test(emailInput.value.trim()); }

  function showError(input, box, msg) {
    box.textContent = msg;
    box.hidden = false;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input, box) {
    box.textContent = '';
    box.hidden = true;
    input.removeAttribute('aria-invalid');
  }

  nameInput.addEventListener('input', function () {
    if (nameValid()) { clearError(nameInput, nameError); }
  });
  emailInput.addEventListener('input', function () {
    if (emailValid()) { clearError(emailInput, emailError); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;

    if (nameValid()) {
      clearError(nameInput, nameError);
    } else {
      showError(nameInput, nameError, NAME_MSG);
      firstInvalid = nameInput;
    }

    if (emailValid()) {
      clearError(emailInput, emailError);
    } else {
      showError(emailInput, emailError, EMAIL_MSG);
      if (!firstInvalid) { firstInvalid = emailInput; }
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    form.hidden = true;
    thanks.hidden = false;
    card.classList.add('done');
    thanks.focus();
  });
})();
