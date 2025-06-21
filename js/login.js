import { supabase } from '../supabaseClient.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Seguridad: Validar existencia de campos antes de usarlos
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email?.value.trim();
    const password = loginForm.password?.value.trim();

    if (!email || !password) {
      Swal.fire('Atención', 'Completa todos los campos.', 'warning');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Swal.fire('Error', error.message, 'error');
    } else {
      Swal.fire('Bienvenido', 'Inicio de sesión correcto', 'success').then(() => {
        window.location.href = 'plataforma.html';
      });
    }
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signupForm.email?.value.trim();
    const password = signupForm.password?.value.trim();
    const confirm = signupForm.confirm?.value.trim();

    if (!email || !password || !confirm) {
      Swal.fire('Atención', 'Completa todos los campos.', 'warning');
      return;
    }

    if (password !== confirm) {
      Swal.fire('Atención', 'Las contraseñas no coinciden', 'warning');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Swal.fire('Error', error.message, 'error');
    } else {
      Swal.fire('Éxito', 'Cuenta creada. Revisa tu correo.', 'success').then(() => {
        window.location.href = 'crear-perfil.html';
      });
    }
  });
}

// Conmutador entre formularios login / signup
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');

function toggleForms() {
  const isLoginVisible = loginForm?.style.display !== 'none';
  if (loginForm && signupForm) {
    loginForm.style.display = isLoginVisible ? 'none' : 'block';
    signupForm.style.display = isLoginVisible ? 'block' : 'none';
  }
}

switchToSignup?.addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
});

switchToLogin?.addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
});
