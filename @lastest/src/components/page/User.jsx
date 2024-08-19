export const User = (props) => {
    const handleLogout = () => {
        const token = localStorage.getItem('access_token');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:8080/auth/logout", requestOptions)
            .then((response) => {
                localStorage.removeItem('access_token')
                props.handleLogoutSuccess();
                response.text()
            })
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
    return (
        <>
            <h1 className="text-danger">Welcome back to {props.value} page</h1>
            {props.data && (
                <div>
                    <p>Email: {props.data.email}</p>
                    <p>Fullname: {props.data.fullname}</p>
                    <p>Gender: {props.data.gender}</p>
                    <p>Address: {props.data.address}</p>
                    <p>Role: {props.data.role}</p>
                </div>
            )}
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </>
    )
}