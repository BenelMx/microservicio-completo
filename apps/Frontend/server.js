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
            const response = await fetch('http://localhost:3001/productos');
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
                    <td>${product.nombre}</td>
                    <td>${product.precio}</td>
                    <td>${product.cantidad}</td>
                `;
                productTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            const productTableBody = document.querySelector('#productTable tbody');
            productTableBody.innerHTML = '<tr><td colspan="4">No se pudieron cargar los productos</td></tr>';
        }
    });
});