import './App.css';
import { useState, useEffect } from 'react';

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
      nombre: 'Vaso Stanley Original',
      precio: 28000,
      categoria: 'hogar',
      descripcion: 'Mantiene frío o calor por horas.',
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
    <div className="container">
      <h1 className="titulo">FULLSTORE <span>| Todo lo que querés, en un solo lugar</span></h1>

      <div className="busqueda-filtros">
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
          <option value="hogar">Hogar</option>
        </select>
      </div>

      <button className="boton-carrito" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
        Ver Carrito ({carrito.length})
      </button>

      {mostrarCarrito && (
        <div className="carrito">
          <h3>Productos en el carrito:</h3>
          {carrito.length === 0 ? (
            <p>No hay productos.</p>
          ) : (
            <>
              {carrito.map((item, i) => (
                <div key={i} className="item-carrito">
                  <strong>{item.nombre}</strong> - ${item.precio.toLocaleString()}
                  <button onClick={() => eliminarDelCarrito(i)}>Eliminar</button>
                </div>
              ))}
              <p className="total">Total: ${totalCarrito.toLocaleString()}</p>
              <button className="finalizar" onClick={finalizarCompra}>Finalizar compra</button>
            </>
          )}
        </div>
      )}

      <div className="productos">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="producto">
            <img src={prod.imagen} alt={prod.nombre} />
            <h3>{prod.nombre}</h3>
            <p>{prod.descripcion}</p>
            <p className="precio">${prod.precio.toLocaleString()}</p>
            <button onClick={() => agregarAlCarrito(prod)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
