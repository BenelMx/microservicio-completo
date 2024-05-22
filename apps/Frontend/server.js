/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', function () {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const userDataDiv = document.getElementById('userData');
        userDataDiv.innerHTML = `<p>Nombre: ${userData.name}</p><p>Email: ${userData.email}</p>`;
    } else {
        document.getElementById('userData').innerText = 'No hay datos de usuario disponibles.';
    }

    document.getElementById('showProductsBtn').addEventListener('click', async function () {
        try {
            const response = await fetch('http://localhost:3001/products'); // Asegúrate de que la URL sea correcta
            if (!response.ok) {
                throw new Error('Error al obtener la lista de productos');
            }

            const products = await response.json();
            const productTableBody = document.querySelector('#productTable tbody');
            productTableBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.amount}</td>
                `;
                productTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            const productTableBody = document.querySelector('#productTable tbody');
            productTableBody.innerHTML = '<tr><td colspan="4">No se pudieron cargar los productos</td></tr>';
        }
    });

    document.getElementById('addProductBtn').addEventListener('click', function () {
        const form = document.getElementById('addProductForm');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('productForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        try {
            const response = await fetch('http://localhost:3001/products', { // Asegúrate de que la URL sea correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName, price: productPrice, amount: productQuantity })
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            const data = await response.json();
            console.log(data);

            // Refresca la lista de productos
            document.getElementById('showProductsBtn').click();

            // Resetea el formulario
            document.getElementById('productForm').reset();

            // Oculta el formulario
            document.getElementById('addProductForm').style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

