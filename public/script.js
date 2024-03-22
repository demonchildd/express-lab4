
function addData() {
    const name = document.getElementsByName('name')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    const errorMessage = document.getElementById('error-message');
    const pattern = /\+375(29|25|33|44)\d{7}$/;
    if (!pattern.test(phone)) {
        errorMessage.textContent = 'Некорректный номер телефона. Введите номер в формате +375XXXXXXXXX.';
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone })
        })
            .then(response => response.json())
            .then(() => window.location.href = '/')
            .catch((e) => console.log(e))
    }
    
}



async function updateData() {
    const id = document.querySelector('.form').getAttribute('data-key');
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const errorMessage = document.getElementById('error-message');
    const pattern = /\+375(29|25|33|44)\d{7}$/;
    if (!pattern.test(phone)) {
        errorMessage.textContent = 'Некорректный номер телефона. Введите номер в формате +375XXXXXXXXX.';
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        try {
            await fetch(`/update?id=${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone })
            });
            window.location.href = '/'
        } catch (e) {
            console.log(e);
        }
    }
    

}



async function deleteData() {
    const id = document.querySelector('.form').getAttribute('data-key');

    try {
        await fetch(`/delete?id=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        window.location.href = '/';
    } catch (e) {
        console.log(e);
    }
}



function blockButton(name, phone) {
    const button = document.getElementById('delete-button');
    
    if (document.getElementById('nameForUpdate').value != name ||
    document.getElementById('phoneForUpdate').value != phone) {
        console.log("не Доступна")
        button.setAttribute('disabled', 'true');
    } else {
        console.log(" Доступна")
        button.removeAttribute('disabled');
    }
}