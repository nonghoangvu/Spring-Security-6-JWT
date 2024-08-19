import './App.css'
import { useState, useEffect } from 'react'
import { Login } from './components/authentication/Login'
import { Admin } from './components/page/Admin'
import { User } from './components/page/User'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      getUser(token);
    } else {
      setIsLogin(false);
    }
    console.log(user);
  }, [isLogin])

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  useEffect(() => {
    if (user) {
      setIsLogin(user.role === 'ADMIN' || user.role === 'USER');
    }
  }, [user]);

  const handleLogoutSuccess = () => {
    setIsLogin(false);
    setUser(null);
  };

  const getUser = (token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:8080/auth/info", requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setUser(result)
        // console.log(result)
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {
        isLogin ?
          ((user && user.role === 'ADMIN') ?
            <Admin value='admin' handleLogoutSuccess={handleLogoutSuccess} data={user} /> :
            <User value='User' handleLogoutSuccess={handleLogoutSuccess} data={user}/>
          ) :
          <Login onLoginSuccess={handleLoginSuccess} />
      }
    </>
  )
}

export default App
