import { supabase } from '../supabaseClient.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    Swal.fire('Error', error.message, 'error');
  } else {
    Swal.fire('Bienvenido','Inicio de sesión correcto','success').then(()=>{
      window.location.href = 'plataforma.html';
    });
  }
});

signupForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = signupForm.email.value.trim();
  const password = signupForm.password.value.trim();
  const confirm = signupForm.confirm.value.trim();

  if (password !== confirm) {
    Swal.fire('Atención','Las contraseñas no coinciden','warning');
    return;
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    Swal.fire('Error', error.message, 'error');
  } else {
    Swal.fire('Éxito','Cuenta creada. Revisa tu correo.','success').then(()=>{
      window.location.href = 'crear-perfil.html';
    });
  }
});

function toggleForms() {
  const isLogin = loginForm.style.display !== 'none';
  loginForm.style.display = isLogin ? 'none' : 'block';
  signupForm.style.display = isLogin ? 'block' : 'none';
}

document.getElementById('switch-to-signup')?.addEventListener('click', e => {
  e.preventDefault();
  toggleForms();
});

document.getElementById('switch-to-login')?.addEventListener('click', e => {
  e.preventDefault();
  toggleForms();
});
