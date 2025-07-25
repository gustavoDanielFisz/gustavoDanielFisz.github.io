window.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarContador();

function renderizarProductos(productos) {
  const contenedor = document.querySelector('.productos-container');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  productos.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('producto-card');
    card.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" />
      <h3>${producto.title}</h3>
      <p>$${producto.price.toFixed(2)}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const totalItems = (window.carrito || []).reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = `(${totalItems})`;
  }
}

const productosMock = [
  {
    id: 1,
    title: 'Remera Oficial Independiente',
    price: 15000,
    image: 'complementos/img/remera.png',
  },
  {
    id: 2,
    title: 'Pantalón Deportivo Independiente',
    price: 12000,
    image: 'complementos/img/pantalon.png',
  },
  {
    id: 3,
    title: 'Pelota Oficial Independiente',
    price: 10000,
    image: 'complementos/img/pelota.png',
  },
  {
    id: 4,
    title: 'Campera Rompeviento Independiente',
    price: 18000,
    image: 'complementos/img/campera.png',
  },
  {
    id: 5,
    title: 'Gorra Oficial Independiente',
    price: 5000,
    image: 'complementos/img/gorra.png',
  }
];

// Renderiza productos mock (en vez de usar API externa)
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos(productosMock);
});

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
    const id = parseInt(e.target.dataset.id);
    agregarAlCarrito(id);
  }
});

function agregarAlCarrito(id) {
  const producto = productosMock.find(p => p.id === id);
  if (!producto) return;
  const existe = window.carrito.find(item => item.id === id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    window.carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(window.carrito));
  actualizarContador();
  alert(`✅ ${producto.title} agregado al carrito`);
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('header nav');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = this.nombre.value.trim();
      const email = this.email.value.trim();
      const mensaje = this.mensaje.value.trim();

      const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

      let errorDiv = document.getElementById('form-error');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'form-error';
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '1rem';
        this.appendChild(errorDiv);
      }
      errorDiv.textContent = '';

      if (nombre === '') {
        errorDiv.textContent = 'Por favor, ingresa tu nombre y apellido.';
        return;
      }

      if (!emailRegex.test(email)) {
        errorDiv.textContent = 'Por favor, ingresa un correo válido.';
        return;
      }

      if (mensaje === '') {
        errorDiv.textContent = 'Por favor, ingresa un mensaje.';
        return;
      }

      errorDiv.style.color = 'green';
      errorDiv.textContent = 'Enviando...';
      this.submit();
    });
  }
});
