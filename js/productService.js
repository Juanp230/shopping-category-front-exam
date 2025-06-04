function products() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de productos</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/products?page=1'
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) => response.json().then(data => ({
        status: response.status,
        info: data
    })))
    .then((result) => {
        if (result.status === 200) {
            let listProducts = `
                <button type="button" class="btn btn-success mb-3" onclick="createProduct()">Crear Producto</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre producto</th>
                            <th scope="col">Año</th>
                            <th scope="col">Color</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            result.info.data.forEach(element => {
                listProducts += `
                    <tr style="background-color:${element.color}">
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.year}</td>
                        <td>${element.color}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getProduct('${element.id}')">Ver</button></td>
                    </tr>
                `;
            });

            listProducts += `
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#" onclick="products('1')">1</a></li>
                        <li class="page-item"><a class="page-link" href="#" onclick="products('2')">2</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            `;

            document.getElementById('info').innerHTML = listProducts;
        } else {
            document.getElementById('info').innerHTML = 'No existen productos en la BD';
        }
    });
}

function getProduct(idProduct) {
    const REQRES_ENDPOINT = 'https://reqres.in/api/products/' + idProduct;
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((result) => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then((response) => {
        if (response.status === 200) {
            const product = response.body.data;
            const modalProduct = `
                <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Ver Producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Información del producto</h5>
                                        <p class="card-text">Nombre: ${product.name}</p>
                                        <p class="card-text">Año: ${product.year}</p>
                                        <p class="card-text">Color: ${product.color}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('viewModal').innerHTML = modalProduct;
            const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
            modal.show();
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la API</h3>';
        }
    });
}

function createProduct() {
    const modalProduct = `
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="exampleModalLabel">Crear Producto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCreateProduct">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="product_name" placeholder="Nombre del producto" required>
                            </div>
                            <div class="mb-3">
                                <input type="number" class="form-control" id="product_year" placeholder="Año" required>
                            </div>
                            <div class="mb-3">
                                <input type="color" class="form-control form-control-color" id="product_color" value="#563d7c" title="Elige un color">
                            </div>
                            <div class="text-end">
                                <button type="button" class="btn btn-success" onclick="saveProduct()">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('viewModal').innerHTML = modalProduct;
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
    modal.show();
}

function saveProduct() {
    const form = document.getElementById('formCreateProduct');
    if (form.checkValidity()) {
        const name = document.getElementById('product_name').value;
        const year = document.getElementById('product_year').value;
        const color = document.getElementById('product_color').value;

        const product = { name, year, color };

        const REQRES_ENDPOINT = 'https://reqres.in/api/products';
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json().then(data => ({
            status: response.status,
            body: data
        })))
        .then(response => {
            if (response.status === 201) {
                document.getElementById('info').innerHTML = '<h3>Producto creado exitosamente :)</h3>';
            } else {
                document.getElementById('info').innerHTML = '<h3>Error al crear el producto</h3>';
            }
            const modalId = document.getElementById('modalProduct');
            const modal = bootstrap.Modal.getInstance(modalId);
            modal.hide();
        })
        .catch(err => {
            console.error('Error al guardar producto:', err);
            document.getElementById('info').innerHTML = '<h3>Error de red</h3>';
        });
    } else {
        form.reportValidity();
    }
}
