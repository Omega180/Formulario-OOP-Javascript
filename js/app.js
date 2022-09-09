/* Clases de la aplicacion */
class Producto {
	constructor(name, price, year) {
		this.name = name
		this.price = price
		this.year = year
	}
}
/* Manejara todos los eventos que se ocuparan dentro de la UI de la pagina */
class UI {
	/* Añade el producto atraves de seleccionar el elemento y agregandole el codigo del elemento al productList creado en HTML */
	addProducto(product) {
		const productList = document.getElementById("lista-producto")
		const element = document.createElement("div")
		element.innerHTML = `
            <div class="card text-center mb-4 bg-light"> 
                <div class="card-body d-flex justify-content-between"> 
                    <strong>Product Name: </strong>${product.name}
                    <strong>Product Price: </strong>${product.price}
                    <strong>Product Year: </strong>${product.year}
                    <a href="#" name="delete" class="btn btn-danger">Delete</a>
                </div>
            </div>
        `
		productList.appendChild(element)
	}
	/* borra los datos del formulario despues de agregarlo */
	resetForm() {
		document.getElementById("producto-formulario").reset()
	}
	/* Borra el producto creado */
	deleteProducto(e) {
		if (e.name === "delete") {
			console.log(e.parentElement.parentElement.parentElement.remove())
			this.mostrarMensaje("Producto Eliminado satisfactoriamente", "info")
		}
	}
	/* permite mostrar mensajes en pantalla */
	mostrarMensaje(message, cssClass) {
		const div = document.createElement("div")
		div.className = `mt-1 alert alert-${cssClass}`
		div.appendChild(document.createTextNode(message))
		/* Mostrando en el DOM */
		const container = document.querySelector(".container")
		const app = document.querySelector("#App")
		container.insertBefore(div, app)
		setTimeout(() => {
			document.querySelector(".alert").remove()
		}, 2000)
	}
}

/* Eventos del Dom */

/* Evento que toma el boton de submit, toma los valores de los campos dentro del formulario,
y dispara las funciones que se encuentran dentro del objeto de UI */
const formulario = document.getElementById("producto-formulario")
formulario.addEventListener("submit", (e) => {
	e.preventDefault()
	console.log("Evento del formulario")
	const productName = document.getElementById("name").value
	const productPrice = document.getElementById("price").value
	const productYear = document.getElementById("year").value

	const product = new Producto(productName, productPrice, productYear)
	const ui = new UI()
	if (productName === "" || productPrice === "" || productYear === "") {
		ui.mostrarMensaje("Complete los campos por favor", "danger")
		return
	}
	ui.addProducto(product)
	ui.resetForm()
	ui.mostrarMensaje("Producto Agregado Satisfactoriamente", "success")
})

/* Evento que toma al boton creado dentro de la lista de productos y permite la eliminacion de este */

const productList = document.getElementById("lista-producto")
productList.addEventListener("click", (e) => {
	const ui = new UI()
	ui.deleteProducto(e.target)
})
