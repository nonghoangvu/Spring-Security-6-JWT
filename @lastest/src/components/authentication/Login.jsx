import { useState } from 'react'
export const Login = ({ onLoginSuccess }) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        platform: 'WEB'
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": user.username,
            "password": user.password,
            "platform": "WEB"
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/auth/access", requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)

            })
            .then((result) => {
                console.log(result)
                localStorage.setItem('access_token', result.access_token)
                onLoginSuccess();
                alert('Login success')
            })
            .catch((error) => {
                alert('Login failed')
                console.error(error)
            });

    }

    return (
        <>
            <div className='container'>
                <h1 className='title-login'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" placeholder='Enter your username'
                        value={user.username} onChange={handleChange} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder='Enter your password'
                        value={user.password} onChange={handleChange} />
                    </div>
                    <div className='form-control'>
                        <button className='btn-login' type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}