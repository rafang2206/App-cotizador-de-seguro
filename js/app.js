// constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.mostrarResultado = function(seguro){
    const { marca, year, tipo } = seguro;
    
    
    /*
        asiatico 1.05
        americano, 1.15
        europeo 1,30
    */
    let cantidad;
    const base = 2000;
    console.log(marca)
    switch(marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.30;
            break;
        default:
            break;
    }
    
    const diferencia = new Date().getFullYear() - year;
    cantidad -= ((diferencia * 3) * cantidad / 100);
    

    switch(tipo){
        case 'basico':
            cantidad *= 1.3;
            break;
        case 'completo':
            cantidad *= 1.5;
            break;

        default:
            break;
    }
    let nombre;
    switch(marca){
        case '1':
            nombre = 'Americano';
            break;
        case '2':
            nombre = 'Asiatico';
            break;
        case '3':
            nombre = 'Europeo';
            break;
        default:
            break;
    }

    

    const resultado = document.querySelector('#resultado');
    const div = document.createElement('DIV');
    div.classList.add('presupuesto')
    div.innerHTML = `
        <p>Tu presupuesto del Vehículo</p>
        <p>Modelo: ${nombre}</p>
        <p>Año: ${year}</p>
        <p>Costo del seguro $${cantidad}</p>
    `;
    const cargando = document.querySelector('#cargando');
    cargando.classList.remove('hidden');
    setTimeout(() => {
        cargando.classList.add('hidden');
        resultado.appendChild(div)
    }, 3000)

}

function UI(){}

UI.prototype.agregandoElementos = function(){
    const max = new Date().getFullYear();
        min = max -20;
    for(let i = max; i > min; i--){
        const seleccionar = document.querySelector('#year');
        const option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;
        seleccionar.appendChild(option);
    }
}

UI.prototype.mensajeAlerta = function(mensaje, clase){
    const formulario = document.querySelector('#cotizar-seguro');
    const div = document.createElement('DIV');
    div.classList.add(clase)
    div.classList.add('mt-10', 'mensaje')
    div.textContent = mensaje;
    const resultado = document.querySelector('#resultado');
    formulario.insertBefore(div, resultado);
    setTimeout(() => {
        div.remove();
    }, 3000);
}




const ui = new UI();

console.log(ui)

//eventos


eventos();
function eventos(){
    ui.agregandoElementos();
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}



//Funciones
function cotizarSeguro(e){
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if(marca === '' || year === '' || tipo === ''){
        ui.mensajeAlerta('debes completar los campos', 'error');
        return;
    }

    ui.mensajeAlerta('cotizando', 'correcto')
    const div = document.querySelector('.presupuesto');
    if(div){
        div.remove();
    }
    const seguro = new Seguro(marca, year, tipo)
    Seguro.prototype.mostrarResultado(seguro)
    
}