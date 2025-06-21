// js/login.js (para login.html)
import { supabase } from './supabaseClient.js';

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.6s ease";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
});

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("❌ Error: " + error.message);
    } else {
      alert("✅ Sesión iniciada correctamente.");
      window.location.href = "index.html";
    }
  });
}
