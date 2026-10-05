const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

function showMessage(form, text, type) {
  const message = form.querySelector('.form-message');
  message.textContent = text;
  message.className = `form-message ${type}`;
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    field.classList.remove('invalid');
    if (!field.checkValidity()) {
      field.classList.add('invalid');
      isValid = false;
    }
  });
  return isValid;
}

document.querySelector('#form-rapido').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateForm(form)) {
    showMessage(form, 'Escribe un correo válido para continuar.', 'error');
    return;
  }
  showMessage(form, '¡Listo! Te enviaremos el catálogo muy pronto.', 'success');
  form.reset();
});

document.querySelector('#form-registro').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateForm(form)) {
    showMessage(form, 'Revisa los campos marcados antes de enviar.', 'error');
    form.querySelector('.invalid')?.focus();
    return;
  }
  showMessage(form, '¡Gracias! Tu solicitud quedó registrada correctamente.', 'success');
  form.reset();
});

document.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('input', () => field.classList.remove('invalid'));
});
