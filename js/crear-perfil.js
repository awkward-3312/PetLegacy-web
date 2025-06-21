import { supabase } from '../supabaseClient.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const form = document.getElementById('perfil-form');
  const usernameInput = document.getElementById('username');
  const descInput = document.getElementById('descripcion');
  const avatarInput = document.getElementById('avatar');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) {
      Swal.fire('Atención','Ingresa un nombre de usuario','warning');
      return;
    }

    // Verificar que el nombre de usuario sea único
    const { data: existing, error: existError } = await supabase
      .from('perfiles')
      .select('id')
      .eq('username', username);

    if (existError) {
      Swal.fire('Error','Error validando nombre de usuario','error');
      return;
    }

    if (existing.length > 0) {
      Swal.fire('Atención','El nombre de usuario ya existe, elige otro','warning');
      return;
    }

    const file = avatarInput.files[0];
    if (!file) {
      Swal.fire('Atención','Sube una imagen de perfil','warning');
      return;
    }

    const allowed = ['image/jpeg', 'image/png'];
    if (!allowed.includes(file.type)) {
      Swal.fire('Error','La imagen debe ser JPG o PNG','error');
      return;
    }

    const ext = file.type === 'image/png' ? '.png' : '.jpg';
    const filePath = `${user.id}${ext}`;

    const { error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      Swal.fire('Error','Error subiendo la imagen','error');
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

    const { error } = await supabase.from('perfiles').insert({
      user_id: user.id,
      username,
      descripcion: descInput.value.trim(),
      avatar_url: publicUrl,
    });

    if (error) {
      Swal.fire('Error','Error guardando el perfil','error');
    } else {
      Swal.fire('Éxito','Perfil creado exitosamente','success').then(() => {
        window.location.href = 'plataforma.html';
      });
    }
  });
});
