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
            console.log('resultado', result)
            if (result.status === 200) {
                let listProducts = `
            <table class="table">
            <thead>
                <tr >
                <th scope="col">#</th>
                <th scope="col">Nombre producto</th>
                <th scope="col">Año</th>
                <th scope="col">Color</th>
                <th scope="col">Accion</th>
            </tr>
            </thead>
            <tbody>`;
                result.info.data.forEach(element => {
                    listProducts = listProducts + `
                    <tr style="background-color:${element.color}">
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.year}</td>
                        <td>${element.color}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getProduct('${element.id}')">Ver</button></td>
                    </tr>
                `
                });
                listProducts = listProducts + `
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
             `
                console.log('nombres ', listProducts)
                document.getElementById('info').innerHTML = listProducts
            }
            else {
                document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
            }
        })
}function getProduct(idProduct) {
    const REQRES_ENDPOINT = 'https://reqres.in/api/products/' + idProduct
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
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
            if (response.status === 200) {
                const product = response.body.data
                const modalProduct = `<!-- Modal -->
            <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                   
                    <div class="card" >
                      <div class="card-body">
                        <h5 class="card-title">Informacion del usuario</h5>
                        <p class="card-text">Nombre:${product.name} </p>
                        <p class="card-text">Nombre:${product.year} </p>
                        <p class="card-text">Nombre:${product.color} </p>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>`
                document.getElementById('viewModal').innerHTML = modalProduct
                const modal = new bootstrap.Modal(
                    document.getElementById('modalProduct')
                )
                modal.show()
            }
            else {
                document.getElementById('info').innerHTML =
                    '<h3>No se necontr el usuario en la Api</h3>'
            }
        })
}