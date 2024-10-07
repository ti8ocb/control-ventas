document.addEventListener('DOMContentLoaded', () => {
    refrescar();
});

function agregarArticulo() {
    const codigo = prompt("Ingrese el código del artículo:");
    const descripcion = prompt("Ingrese la descripción del artículo:");
    const ubicacion = prompt("Ingrese la ubicación del artículo:");
    const cantidad = prompt("Ingrese la cantidad del artículo:");
    const equivalencia = prompt("Ingrese la equivalencia del artículo:");
    const nombreCorto = prompt("Ingrese el nombre corto del artículo:");
    const precioCosto = prompt("Ingrese el precio costo del artículo:");
    const precioTotal = prompt("Ingrese el precio total del artículo:");

    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventas.push({ codigo, descripcion, ubicacion, cantidad, equivalencia, nombreCorto, precioCosto, precioTotal });
    localStorage.setItem('ventas', JSON.stringify(ventas));
    refrescar();
}

function modificarArticulo() {
    const codigo = prompt("Ingrese el código del artículo a modificar:");
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const articulo = ventas.find(venta => venta.codigo === codigo);

    if (articulo) {
        articulo.descripcion = prompt("Ingrese la nueva descripción del artículo:", articulo.descripcion);
        articulo.ubicacion = prompt("Ingrese la nueva ubicación del artículo:", articulo.ubicacion);
        articulo.cantidad = prompt("Ingrese la nueva cantidad del artículo:", articulo.cantidad);
        articulo.equivalencia = prompt("Ingrese la nueva equivalencia del artículo:", articulo.equivalencia);
        articulo.nombreCorto = prompt("Ingrese el nuevo nombre corto del artículo:", articulo.nombreCorto);
        articulo.precioCosto = prompt("Ingrese el nuevo precio costo del artículo:", articulo.precioCosto);
        articulo.precioTotal = prompt("Ingrese el nuevo precio total del artículo:", articulo.precioTotal);

        localStorage.setItem('ventas', JSON.stringify(ventas));
        refrescar();
    } else {
        alert("Artículo no encontrado.");
    }
}

function eliminarArticulo() {
    const codigo = prompt("Ingrese el código del artículo a eliminar:");
    let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventas = ventas.filter(venta => venta.codigo !== codigo);
    localStorage.setItem('ventas', JSON.stringify(ventas));
    refrescar();
}

function refrescar() {
    const ventasBody = document.getElementById('ventasBody');
    ventasBody.innerHTML = '';
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    let totalCosto = 0;
    let totalPrecio = 0;

    ventas.forEach(venta => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${venta.codigo}</td>
            <td>${venta.descripcion}</td>
            <td>${venta.ubicacion}</td>
            <td>${venta.cantidad}</td>
            <td>${venta.equivalencia}</td>
            <td>${venta.nombreCorto}</td>
            <td>${venta.precioCosto}</td>
            <td>${venta.precioTotal}</td>
        `;
        ventasBody.appendChild(row);
        totalCosto += parseFloat(venta.precioCosto);
        totalPrecio += parseFloat(venta.precioTotal);
    });

    document.getElementById('totalCosto').textContent = totalCosto.toFixed(2);
    document.getElementById('totalPrecio').textContent = totalPrecio.toFixed(2);
}

function exportar() {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const csvContent = "data:text/csv;charset=utf-8," + ventas.map(venta => Object.values(venta).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ventas.csv");
    document.body.appendChild(link);
    link.click();
}

function salir() {
    window.close();
}
