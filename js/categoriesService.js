function categories() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de categorías</h5>';
    const REQRES_ENDPOINT = 'https://reqres.in/api/categories?page=1';
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(response => response.json().then(data => ({
        status: response.status,
        info: data
    })))
    .then(result => {
        if (result.status === 200) {
            let listCategories = `
                <button type="button" class="btn btn-success mb-3" onclick="createCategory()">Crear Categoría</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre categoría</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            result.info.data.forEach(element => {
                listCategories += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.description || 'Sin descripción'}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getCategory('${element.id}')">Ver</button></td>
                    </tr>
                `;
            });

            listCategories += `
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#" onclick="categories('1')">1</a></li>
                        <li class="page-item"><a class="page-link" href="#" onclick="categories('2')">2</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            `;

            document.getElementById('info').innerHTML = listCategories;
        } else {
            document.getElementById('info').innerHTML = 'No existen categorías en la BD';
        }
    });
}

function getCategory(idCategory) {
    const REQRES_ENDPOINT = 'https://reqres.in/api/categories/' + idCategory;
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            const category = response.body.data;
            const modalCategory = `
                <div class="modal fade" id="modalCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Ver Categoría</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Información de la categoría</h5>
                                        <p class="card-text">Nombre: ${category.name}</p>
                                        <p class="card-text">Descripción: ${category.description || 'Sin descripción'}</p>
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
            document.getElementById('viewModal').innerHTML = modalCategory;
            const modal = new bootstrap.Modal(document.getElementById('modalCategory'));
            modal.show();
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró la categoría en la API</h3>';
        }
    });
}

function createCategory() {
    const modalCategory = `
        <div class="modal fade" id="modalCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="exampleModalLabel">Crear Categoría</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCreateCategory">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="category_name" placeholder="Nombre de la categoría" required>
                            </div>
                            <div class="mb-3">
                                <textarea class="form-control" id="category_description" placeholder="Descripción" rows="3"></textarea>
                            </div>
                            <div class="text-end">
                                <button type="button" class="btn btn-success" onclick="saveCategory()">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('viewModal').innerHTML = modalCategory;
    const modal = new bootstrap.Modal(document.getElementById('modalCategory'));
    modal.show();
}

function saveCategory() {
    const form = document.getElementById('formCreateCategory');
    if (form.checkValidity()) {
        const name = document.getElementById('category_name').value;
        const description = document.getElementById('category_description').value;

        const category = { name, description };

        const REQRES_ENDPOINT = 'https://reqres.in/api/categories';
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(category)
        })
        .then(response => response.json().then(data => ({
            status: response.status,
            body: data
        })))
        .then(response => {
            if (response.status === 201) {
                document.getElementById('info').innerHTML = '<h3>Categoría creada exitosamente :)</h3>';
            } else {
                document.getElementById('info').innerHTML = '<h3>Error al crear la categoría</h3>';
            }
            const modalId = document.getElementById('modalCategory');
            const modal = bootstrap.Modal.getInstance(modalId);
            modal.hide();
        })
        .catch(err => {
            console.error('Error al guardar categoría:', err);
            document.getElementById('info').innerHTML = '<h3>Error de red</h3>';
        });
    } else {
        form.reportValidity();
    }
}
