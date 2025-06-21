const SUPABASE_URL = 'https://gpnrtcvtwxsoasrnmhof.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbnJ0Y3Z0d3hzb2Fzcm5taG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNDI3MTIsImV4cCI6MjA2NTkxODcxMn0.s7e9BAFcsfUbiWAETf44sUxSGSoQ6xvZF9gPTebcMWc';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// DOM
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const spinner = document.querySelector("#spinner");
const toggleText = document.getElementById("toggle-mode");
const switchToSignup = document.getElementById("switch-to-signup");

// LOGIN
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  spinner.style.display = "flex";
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  spinner.style.display = "none";

  if (error) {
    alert("❌ Error: " + error.message);
  } else {
    alert("✅ Bienvenido");
    window.location.href = "index.html";
  }
});

// REGISTRO
signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signupForm.email.value.trim();
  const password = signupForm.password.value.trim();
  const confirm = signupForm.confirm.value.trim();

  if (password !== confirm) {
    alert("⚠️ Las contraseñas no coinciden");
    return;
  }

  spinner.style.display = "flex";
  const { error } = await supabaseClient.auth.signUp({ email, password });
  spinner.style.display = "none";

  if (error) {
    alert("❌ Error: " + error.message);
  } else {
    alert("✅ Usuario creado. Revisa tu correo para confirmar.");
    toggleForms();
  }
});

// Cambiar entre login y signup
function toggleForms() {
  const isLogin = loginForm.style.display !== "none";
  loginForm.style.display = isLogin ? "none" : "block";
  signupForm.style.display = isLogin ? "block" : "none";
  toggleText.innerHTML = isLogin
    ? 'Already have an account? <a href="#" id="switch-to-login">Sign in</a>'
    : 'Don\'t have an account? <a href="#" id="switch-to-signup">Sign up</a>';
  bindSwitch();
}

// Asigna evento a enlace de cambio
function bindSwitch() {
  const loginLink = document.querySelector("#switch-to-login");
  const signupLink = document.querySelector("#switch-to-signup");
  if (loginLink) loginLink.onclick = (e) => { e.preventDefault(); toggleForms(); };
  if (signupLink) signupLink.onclick = (e) => { e.preventDefault(); toggleForms(); };
}
bindSwitch();
