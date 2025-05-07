import './App.css'
import { useState, useEffect } from 'react'
import { FaShoppingCart, FaSearch, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

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
    },
    { id: 5,
      nombre: 'Vaper Luffbar 40000',
      precio: 20000,
      categoria: 'vapers',
      descripcion: 'Ultra duradero y potente.',
      imagen: 'https://via.placeholder.com/150'
    },
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
    const numero = '5493764176107';
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
    <div className="app-container">
      <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="main-title">
        LYC STORE - TODO LO QUE NECESITÁS EN UN SOLO LUGAR
      </motion.h1>
      <p className="sub-text">
        Productos de moda, tecnología y estilo de vida. ¡Sumate a la comunidad que elige calidad!
      </p>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
          <option value="todos">Todas las categorías</option>
          <option value="zapatillas">Zapatillas</option>
          <option value="vapers">Vapers</option>
          <option value="ropa">Ropa</option>
        </select>
        <button onClick={() => setMostrarCarrito(!mostrarCarrito)}>
          <FaShoppingCart /> Carrito ({carrito.length})
        </button>
      </div>

      {mostrarCarrito && (
        <div className="carrito">
          <h3>Productos en el carrito:</h3>
          {carrito.length === 0 ? (
            <p>No hay productos.</p>
          ) : (
            <>
              {carrito.map((item, i) => (
                <div key={i} className="carrito-item">
                  <strong>{item.nombre}</strong> - ${item.precio.toLocaleString()}
                  <button onClick={() => eliminarDelCarrito(i)}>Eliminar</button>
                </div>
              ))}
              <p className="carrito-total">Total: ${totalCarrito.toLocaleString()}</p>
              <button onClick={finalizarCompra} className="whatsapp-button">
                <FaWhatsapp /> Finalizar compra
              </button>
            </>
          )}
        </div>
      )}

      <div className="productos">
        {productosFiltrados.map((prod) => (
          <motion.div
            key={prod.id}
            className="producto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={prod.imagen} alt={prod.nombre} />
            <h3>{prod.nombre}</h3>
            <p>{prod.descripcion}</p>
            <p className="precio">${prod.precio.toLocaleString()}</p>
            <button onClick={() => agregarAlCarrito(prod)}>Agregar al carrito</button>
          </motion.div>
        ))}
      </div>

      <div className="metodos-pago">
        <h2>Métodos de Pago</h2>
        <ul>
          <li>Transferencia bancaria</li>
          <li>MercadoPago</li>
          <li>Efectivo</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
