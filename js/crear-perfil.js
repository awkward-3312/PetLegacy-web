import { supabase } from '../supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const form = document.getElementById('perfil-form');
  const usernameInput = document.getElementById('username');
  const avatarInput = document.getElementById('avatar');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) {
      alert('Ingresa un nombre de usuario');
      return;
    }

    // Verificar que el nombre de usuario sea único
    const { data: existing, error: existError } = await supabase
      .from('perfiles')
      .select('id')
      .eq('nombre_usuario', username);

    if (existError) {
      alert('Error validando nombre de usuario');
      return;
    }

    if (existing.length > 0) {
      alert('El nombre de usuario ya existe, elige otro');
      return;
    }

    const file = avatarInput.files[0];
    if (!file) {
      alert('Sube una imagen de perfil');
      return;
    }

    const allowed = ['image/jpeg', 'image/png'];
    if (!allowed.includes(file.type)) {
      alert('La imagen debe ser JPG o PNG');
      return;
    }

    const ext = file.type === 'image/png' ? '.png' : '.jpg';
    const filePath = `${user.id}${ext}`;

    const { error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      alert('Error subiendo la imagen');
      return;
    }

    const {
      data: { publicUrl }
    } = supabase.storage.from('avatars').getPublicUrl(filePath);

    const { error } = await supabase.from('perfiles').insert({
      id: user.id,
      nombre_usuario: username,
      imagen_url: publicUrl,
    });

    if (error) {
      alert('Error guardando el perfil');
    } else {
      alert('Perfil creado exitosamente');
      window.location.href = 'perfil.html';
    }
  });
});
