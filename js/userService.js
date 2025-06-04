function users(page) {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/users?page=' + page
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
        .then((response) => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        info: data
                    }
                }
            )
        })
        .then((result) => {
            if (result.status === 200) {
                let list_user = `
            <button type="button" class="btn btn-success" onclick="createUser()">Crear</button>
            <table class="table">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellido</th>
            <th scope="col">Avatar</th>
             <th scope="col">Acción</th>
            </tr>
            </thead>
            <tbody>
            `
               result.info.data.forEach(element => {
    list_user = list_user + `
<tr>
<td>${element.id}</td>
<td>${element.first_name}</td>
<td>${element.last_name}</td>
<td><img src="${element.avatar}" class="img-thumbnail" alt="avatar del usuario"></td>
<td>
    <button type="button" class="btn btn-info me-2" onclick="getUser('${element.id}')">Ver</button>
    <button type="button" class="btn btn-danger" onclick="deleteUser('${element.id}')">Eliminar</button>
</td>
</tr>
`
});

                list_user = list_user + `
            </tbody>
            </table>
             <nav aria-label="Page navigation example">
                <ul class="pagination justify-contend-center">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="users('2')">2</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
                </nav>
            `
                document.getElementById('info').innerHTML = list_user
            } else {
                document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
            }
        })
}
function getUser(idUser) {
    const REQRES_ENDPOINT = 'https://reqres.in/api/users/' + idUser
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })
        .then((response) => {
            if (response.status === 201) {
                const user = response.body.data
                const modalUser = `
            <!-- Modal -->
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="card">
                <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                <div class="card-body">
                    <h5 class="card-title">Informacion del usuario</h5>
                    <p class="card-text">Nombre: ${user.first_name}</p>
                    <p class="card-text">Apellido: ${user.last_name}</p>
                </div>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            `
                document.getElementById('viewModal').innerHTML = modalUser
                const modal = new bootstrap.Modal(
                    document.getElementById('modalUser')
                )
                modal.show()
            }
            else[
                document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la Api</h3>'
            ]
        })
}

function createUser() {
    const modalUser = `
<!-- Modal -->
<div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title fs-5" id="exampleModalLabel">Crear Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <form id="formCreateUser">
                            <div class="row g-3">
                                <div class="col">
                                    <input type="text" class="form-control" id="first_name" placeholder="Nombre" required>
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" id="last_name" placeholder="Apellido" required>
                                </div>
                            </div>
                            <div class="row g-3 mt-3">
                                <div class="col">
                                    <input type="email" class="form-control" id="email" placeholder="Correo electrónico" required>
                                </div>
                                <div class="col">
                                    <input type="password" class="form-control" id="password" placeholder="Contraseña" required>
                                </div>
                            </div>
                            <div class="text-end mt-4">
                                <button type="button" class="btn btn-success" onclick="saveUser()">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            `
    document.getElementById('viewModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    )
    modal.show()
}

function saveUser() {
    const form = document.getElementById('formCreateUser')
    if (form.checkValidity()) {
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const user = { first_name, last_name, email, password }

        const REQRES_ENDPOINT = 'https://reqres.in/api/users/'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
            .then((result) => {
                return result.json().then(
                    data => {
                        return {
                            status: result.status,
                            body: data
                        }
                    }
                )
            })
            .then((response) => {
                console.log("entra", response)
                if (response.status === 201) {
                    document.getElementById('info').innerHTML =
                        '<h3>Guardado exitosamente</h3>'
                }
                else {
                    document.getElementById('info').innerHTML =
                        '<h3>Error al guardar el usuario</h3>'
                }
                const modalId = document.getElementById('modalUser')
                const modal =  bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })
    }
    else {
        form.reportValidity()
    }
}

function deleteUser(id) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    const REQRES_ENDPOINT = 'https://reqres.in/api/users/' + id;
    fetch(REQRES_ENDPOINT, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(response => {
        if (response.status === 204) {
            // Éxito simulado
            alert('Usuario eliminado correctamente (simulado)');
            users(1); // Actualiza la lista de usuarios
        } else {
            document.getElementById('info').innerHTML = '<h3>Error al eliminar el usuario</h3>';
        }
    })
    .catch(error => {
        console.error('Error al eliminar usuario:', error);
        document.getElementById('info').innerHTML = '<h3>Error de red al eliminar el usuario</h3>';
    });
}
