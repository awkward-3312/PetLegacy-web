// Configura tu Supabase
const supabaseUrl = 'https://gpnrtcvtwxsoasrnmhof.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // (ya la conoces)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Elemento contenedor
const grid = document.querySelector('.card-grid');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { data, error } = await supabase
      .from('mascotas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data.length === 0) {
      grid.innerHTML = `<p style="text-align:center;">Aún no hay perfiles de mascotas registrados 🐾</p>`;
      return;
    }

    data.forEach((pet) => {
      const card = document.createElement('div');
      card.classList.add('pet-card');

      card.innerHTML = `
        <img src="${pet.imagen || 'https://placekitten.com/400/300'}" alt="${pet.nombre}">
        <h3>${pet.nombre}</h3>
        <p>${pet.descripcion || 'Sin descripción disponible.'}</p>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Error cargando mascotas:', err.message);
    grid.innerHTML = `<p style="text-align:center; color: red;">Error al cargar los perfiles.</p>`;
  }
});
