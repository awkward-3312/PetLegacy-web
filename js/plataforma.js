import { supabase } from '../supabaseClient.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const perfilContainer = document.getElementById('perfil');
const petForm = document.getElementById('pet-form');
const petGrid = document.getElementById('pet-grid');
const logoutBtn = document.getElementById('logout');

let currentUser;

async function loadUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  currentUser = user;
  const { data, error } = await supabase
    .from('perfiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) return;

  const avatar = document.createElement('img');
  avatar.src = data.avatar_url;
  avatar.alt = 'avatar';
  const info = document.createElement('div');
  info.innerHTML = `<h2>@${data.username}</h2><p>${data.descripcion || ''}</p>`;
  perfilContainer.appendChild(avatar);
  perfilContainer.appendChild(info);
}

async function loadPets() {
  const { data, error } = await supabase
    .from('mascotas')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  petGrid.innerHTML = '';
  if (!data || data.length === 0) {
    petGrid.innerHTML = '<p>No tienes mascotas registradas.</p>';
    return;
  }

  data.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
      <img src="${p.foto_url}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.especie} - ${p.edad} años</p>
      <p>${p.estado}</p>
    `;
    petGrid.appendChild(card);
  });
}

petForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const nombre = document.getElementById('pet-name').value.trim();
  const especie = document.getElementById('pet-species').value.trim();
  const edad = parseInt(document.getElementById('pet-age').value, 10);
  const estado = document.getElementById('pet-status').value;
  const foto = document.getElementById('pet-photo').files[0];

  if (!foto || !['image/jpeg','image/png'].includes(foto.type)) {
    Swal.fire('Error','La foto debe ser JPG o PNG','error');
    return;
  }
  const ext = foto.type === 'image/png' ? '.png' : '.jpg';
  const path = `pets/${currentUser.id}-${Date.now()}${ext}`;

  const { error: uploadError } = await supabase
    .storage.from('mascotas').upload(path, foto, { contentType: foto.type });

  if (uploadError) {
    Swal.fire('Error','No se pudo subir la imagen','error');
    return;
  }

  const { data: { publicUrl } } = supabase.storage.from('mascotas').getPublicUrl(path);

  const { error } = await supabase.from('mascotas').insert({
    nombre, especie, edad, estado, foto_url: publicUrl, user_id: currentUser.id
  });

  if (error) {
    Swal.fire('Error','No se pudo guardar la mascota','error');
  } else {
    Swal.fire('Éxito','Mascota registrada','success');
    petForm.reset();
    loadPets();
  }
});

logoutBtn?.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
});

loadUser().then(loadPets);
