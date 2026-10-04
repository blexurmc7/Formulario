import { useState, useEffect } from 'react';

// la ruta de json-server a tu backend de Express:
const API_URL = 'http://localhost:3000/usuarios';

export const FormularioPersona = () => {
  const [personas, setPersonas] = useState([]);
  const [formData, setFormData] = useState({
    tipoDoc: '',
    numDoc: '',
    nombres: '',
    apellidos: '',
    correo: '',
    direccion: '',
    ciudad: ''
  });
  const [idEditing, setIdEditing] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setPersonas(data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchPersonas();
  }, []);

  const recargarPersonas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPersonas(data);
    } catch (error) {
      console.error('Error al recargar datos:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      tipoDoc: '',
      numDoc: '',
      nombres: '',
      apellidos: '',
      correo: '',
      direccion: '',
      ciudad: ''
    });
    setIdEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idEditing) {
      try {
        const res = await fetch(`${API_URL}/${idEditing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          recargarPersonas();
          resetForm();
        }
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    } else {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          recargarPersonas();
          resetForm();
        }
      } catch (error) {
        console.error('Error al guardar:', error);
      }
    }
  };

  const handleEdit = (persona) => {
    setIdEditing(persona.id);
    setFormData({
      tipoDoc: persona.tipoDoc || '',
      numDoc: persona.numDoc || '',
      nombres: persona.nombres || '',
      apellidos: persona.apellidos || '',
      correo: persona.correo || '',
      direccion: persona.direccion || '',
      ciudad: persona.ciudad || ''
    });
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('¿Realmente desea eliminar este registro?');
    if (confirmar) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        if (res.ok) {
          recargarPersonas();
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

 // Estilo base para todos los botones
  const btnBase = {
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '6px 12px'
  };

  const btnPrimary = { ...btnBase, backgroundColor: '#007bff', color: '#fff' };
  const btnSecondary = { ...btnBase, backgroundColor: '#6c757d', color: '#fff', marginLeft: '8px' };
  const btnEdit = { ...btnBase, backgroundColor: '#ffc107', color: '#000' };
  const btnDelete = { ...btnBase, backgroundColor: '#dc3545', color: '#fff', marginLeft: '8px' };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{idEditing ? 'Actualizar Persona' : 'Registro de Persona'}</h2>

      <form onSubmit={handleSubmit} id="Formulario">
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="tipoDoc">Tipo de Documento</label></td>
              <td>
                <select
                  id="tipoDoc"
                  name="tipoDoc"
                  value={formData.tipoDoc}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="PA">Pasaporte</option>
                </select>
              </td>
            </tr>

            <tr>
              <td><label htmlFor="numDoc">Número de documento</label></td>
              <td>
                <input
                  type="number"
                  id="numDoc"
                  name="numDoc"
                  value={formData.numDoc}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label htmlFor="nombres">Nombres</label></td>
              <td>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label htmlFor="apellidos">Apellidos</label></td>
              <td>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label htmlFor="correo">Correo Electrónico</label></td>
              <td>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label htmlFor="direccion">Dirección</label></td>
              <td>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td><label htmlFor="ciudad">Ciudad</label></td>
              <td>
                <select
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="Medellin">Medellin</option>
                  <option value="Itagui">Itagui</option>
                  <option value="Envigado">Envigado</option>
                  <option value="Bello">Bello</option>
                </select>
              </td>
            </tr>

            <tr>
              <td colSpan="2" style={{ paddingTop: '15px' }}>
                <button type="submit" style={btnPrimary}>
                  {idEditing ? 'Actualizar' : 'Guardar'}
                </button>
                {idEditing && (
                  <button type="button" onClick={resetForm} style={btnSecondary}>
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h3>Lista de Personas</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Tipo Doc</th>
            <th>Documento</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.tipoDoc}</td>
              <td>{persona.numDoc}</td>
              <td>{persona.nombres}</td>
              <td>{persona.apellidos}</td>
              <td>{persona.correo}</td>
              <td>{persona.direccion}</td>
              <td>{persona.ciudad}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button onClick={() => handleEdit(persona)} style={btnEdit}>
                  Actualizar
                </button>
                <button onClick={() => handleDelete(persona.id)} style={btnDelete}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {personas.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No hay registros guardados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};