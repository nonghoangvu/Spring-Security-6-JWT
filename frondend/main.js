const form = document.querySelector('#signIn')
const api = 'http://localhost:8080'
let access_token;
let data_admin = [];
const logout = document.querySelector('#logout')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const data = {
            username: form.username.value.trim(),
            password: form.password.value.trim()
        }

        const response = await fetch(`${api}/auth/access`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const error = document.querySelector('#error')
        if (!response.ok) {
            console.log("Network response was not ok");
            error.style.display = ''
            return;

        }
        error.style.display = 'none'
        form.style.display = 'none'
        logout.style.display = ''

        const result = await response.json()
        access_token = result.access_token

        const info = await user(access_token)
        displayItem(info)
    } catch (_) { }

})

const user = async (token) => {
    const response = await fetch(`${api}/auth/info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })

    const data = await response.json()
    return data
}

const displayItem = (info) => {
    document.querySelector('#admin').style.display = ''
    document.querySelector('#hidden-item').style.display = ''
    const boxItem = document.querySelector('#box')
    boxItem.innerHTML = ''

    const emailCell = document.createElement('li')
    emailCell.innerText = info.email
    emailCell.className = 'list-group-item'
    boxItem.appendChild(emailCell)

    const fullnameCell = document.createElement('li')
    fullnameCell.innerText = info.fullname
    fullnameCell.className = 'list-group-item'
    boxItem.appendChild(fullnameCell)

    const genderCell = document.createElement('li')
    genderCell.innerText = info.gender
    genderCell.className = 'list-group-item'
    boxItem.appendChild(genderCell)

    const addressCell = document.createElement('li')
    addressCell.innerText = info.address
    addressCell.className = 'list-group-item'
    boxItem.appendChild(addressCell)
}

document.querySelector('#hidden-item').addEventListener('click', () => {
    const box = document.querySelector('#container-box')
    box.style.display = box.style.display === '' ? 'none' : ''
})

document.querySelector('#admin').addEventListener('click', async () => {
    const box = document.querySelector('#container-admin')
    const tbody = document.querySelector('.table tbody');
    box.style.display = box.style.display === '' ? 'none' : ''
    if (data_admin.length === 0) {
        data_admin = await getDataAdmin(access_token)
        console.table(data_admin);
    }

    tbody.innerHTML = ''
    data_admin.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${item.id}</th>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.fullname}</td>
            <td>${item.gender ? 'Male' : 'Female'}</td>
            <td>${item.address}</td>
            <td>${item.role}</td>
            <td>${item.authorities.map(auth => auth.authority).join(', ')}</td>
        `;

        tbody.appendChild(row);
    });
})

const getDataAdmin = async (token) => {
    try{
        const res = await fetch(`${api}/api/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
        return res;
    }catch(e){
        alert("403")
        return [];
    }
}

logout.addEventListener('click', async () => {
    const token = access_token;
    const response = await fetch(`${api}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    if (response.status === 200) {
        error.style.display = 'none'
        form.style.display = ''
        logout.style.display = 'none'
        access_token = ''
        const box = document.querySelector('#container-box')
        box.style.display = 'none'
        document.querySelector('#admin').style.display = 'none'
        document.querySelector('#hidden-item').style.display = 'none'
        document.querySelector('#username').value = ''
        document.querySelector('#password').value = ''
        data_admin = []
    }
})