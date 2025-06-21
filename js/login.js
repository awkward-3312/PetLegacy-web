// login.js

// Reemplaza estos valores por los de tu proyecto Supabase
const SUPABASE_URL = 'https://gpnrtcvtwxsoasrnmhof.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbnJ0Y3Z0d3hzb2Fzcm5taG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNDI3MTIsImV4cCI6MjA2NTkxODcxMn0.s7e9BAFcsfUbiWAETf44sUxSGSoQ6xvZF9gPTebcMWc';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.querySelector("#login-form");
const spinner = document.querySelector("#spinner");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  // Mostrar el spinner con el hámster
  spinner.style.display = "flex";

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  // Ocultar el spinner
  spinner.style.display = "none";

  if (error) {
    alert(`❌ Error: ${error.message}`);
  } else {
    alert("✅ Sesión iniciada correctamente");
    window.location.href = "index.html"; // Redirige a página principal
  }
});
