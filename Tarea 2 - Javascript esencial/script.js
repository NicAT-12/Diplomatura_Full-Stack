const inputName = document.querySelector('#name');
const inputAge = document.querySelector('#age');
const form = document.querySelector('#form');
const message = document.querySelector('#message');

function sendData(event) {
    event.preventDefault();

    const nameValue = inputName.value.trim();
    const ageValue = inputAge.value.trim();

    if (!nameValue || !ageValue) {
        message.className = '';
        return message.textContent = 'Por favor completar todos los campos.';
    }

    const ageValueNumber = Number(ageValue);

    if (ageValueNumber >= 18) {
        message.textContent = `Bienvenido, ${nameValue}, tienes acceso al evento.`;
        message.classList.remove('denied');
        message.classList.add('success');
    } else {
        message.textContent = `Lo sentimos, ${nameValue}, debes ser mayor de edad.`;
        message.classList.remove('success');
        message.classList.add('denied');
    }
}

form.addEventListener('submit', sendData);