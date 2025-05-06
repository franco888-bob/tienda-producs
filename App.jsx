import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const todosLosProductos = [
    {
      id: 1,
      nombre: 'Zapatilla Nike Air',
      precio: 45000,
      categoria: 'zapatillas',
      descripcion: 'Comodidad y estilo para el día a día.',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nombre: 'Vaper Elfbar 5000',
      precio: 15000,
      categoria: 'vapers',
      descripcion: 'Sabor intenso y duradero.',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      nombre: 'Gorra Negra',
      precio: 10000,
      categoria: 'ropa',
      descripcion: 'Ideal para el sol o el estilo urbano.',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      nombre: 'Zapatilla Adidas Run',
      precio: 42000,
      categoria: 'zapatillas',
      descripcion: 'Ligeras y cómodas para entrenar.',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 5,
      nombre: 'Vaper Luffbar 40000',
      precio: 20000,
      categoria: 'vapers',
      descripcion: 'Ultra duradero y potente.',
      imagen: 'https://via.placeholder.com/150'
    }
  ];

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const totalCarrito = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  const finalizarCompra = () => {
    const numero = '5493764176107'; // Reemplazá por tu número real si querés
    const mensaje = encodeURIComponent(
      `Hola! Quiero comprar:\n` +
      carrito.map((item) => `• ${item.nombre} - $${item.precio.toLocaleString()}`).join('\n') +
      `\n\nTotal: $${totalCarrito.toLocaleString()}`
    );
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
  };

  const productosFiltrados = todosLosProductos.filter((prod) => {
    const coincideCategoria = filtroCategoria === 'todos' || prod.categoria === filtroCategoria;
    const coincideBusqueda = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fffde7', minHeight: '100vh' }}>
      <h1 style={{ color: '#ff5722' }}>Venta de productos LYC</h1>
      <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '20px' }}>
        Productos seleccionados con la mejor onda: vapers, zapatillas, ropa y mucho más.  
        ¡Calidad, estilo y precios que te cierran!
      </p>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '8px',
            width: '200px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px'
          }}
        />
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} style={{
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}>
          <option value="todos">Todas las categorías</option>
          <option value="zapatillas">Zapatillas</option>
          <option value="vapers">Vapers</option>
          <option value="ropa">Ropa</option>
        </select>
      </div>

      <button onClick={() => setMostrarCarrito(!mostrarCarrito)} style={{
        marginBottom: '20px',
        background: '#4caf50',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Ver Carrito ({carrito.length})
      </button>

      {mostrarCarrito && (
        <div style={{
          background: '#ffffff',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h3>Productos en el carrito:</h3>
          {carrito.length === 0 ? (
            <p>No hay productos.</p>
          ) : (
            <>
              {carrito.map((item, i) => (
                <div key={i} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                  <strong>{item.nombre}</strong> - ${item.precio.toLocaleString()}
                  <button onClick={() => eliminarDelCarrito(i)} style={{
                    marginLeft: '10px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>
                    Eliminar
                  </button>
                </div>
              ))}
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Total: ${totalCarrito.toLocaleString()}</p>
              <button onClick={finalizarCompra} style={{
                marginTop: '10px',
                background: '#2196f3',
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Finalizar compra
              </button>
            </>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {productosFiltrados.map((prod) => (
          <div key={prod.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            width: '200px',
            background: '#ffe0b2'
          }}>
            <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', marginBottom: '10px' }} />
            <h3>{prod.nombre}</h3>
            <p style={{ fontSize: '0.9rem', color: '#444' }}>{prod.descripcion}</p>
            <p style={{ fontWeight: 'bold' }}>${prod.precio.toLocaleString()}</p>
            <button onClick={() => agregarAlCarrito(prod)} style={{
              background: '#ff7043',
              color: 'white',
              border: 'none',
              padding: '6px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              width: '100%'
            }}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', background: '#fff3e0', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#ff5722' }}>Métodos de Pago</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Transferencia bancaria</li>
          <li>MercadoPago</li>
          <li>Efectivo</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
