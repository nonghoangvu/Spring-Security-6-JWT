import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
export const Admin = (props) => {
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


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First name', width: 150, editable: true },
        { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
        { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 29 },
    ];
    return (
        <>
            <h1>Welcome back to {props.value} page</h1>
            {props.data && (
                <div>
                    <p>Email: {props.data.email}</p>
                    <p>Fullname: {props.data.fullname}</p>
                    <p>Gender: {props.data.gender}</p>
                    <p>Address: {props.data.address}</p>
                    <p>Role: {props.data.role}</p>
                </div>
            )}
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
            <Button onClick={handleLogout} color='secondary' variant='contained'>Logout</Button>
            {/* <button className="btn-logout" onClick={handleLogout}>Logout</button> */}
        </>
    )
}