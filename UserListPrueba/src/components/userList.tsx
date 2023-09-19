import { sortBy, type Users } from "../types.d";


interface Props {
    handleSorting: (sortType: sortBy) => void
    deleteUser: (email: string) => void
    colorActive: boolean,
    users: Users[]
}
export default function UsersList({ users, colorActive, deleteUser, handleSorting }: Props){
    return (
        <table width="85%">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th onClick={()=>{handleSorting(sortBy.FIRST)}}>Nombre</th>
                    <th onClick={()=>{handleSorting(sortBy.LAST)}}>Apellido</th>
                    <th onClick={()=>{handleSorting(sortBy.COUNTRY)}}>Pais</th>
                    <th>Acciones</th>   
                </tr>
            </thead>
            <tbody>
                {
                    
                        users.map((user, index)=>{
                            const backGround = index % 2 === 0 ? "#333" : "#555";
                            const rowColor = colorActive ? backGround : "transparent";
                            return(
                                <tr key={user.email} style={{backgroundColor: rowColor}}>
                                    <td><img src={user.picture.thumbnail} alt="picture" /></td>
                                    <td >{user.name.first}</td>
                                    <td >{user.name.last}</td>
                                    <td >{user.location.country}</td>
                                    <td><button onClick={()=>{deleteUser(user.email)}}>Eliminar</button></td>
                                </tr>
                            )

                        })
                }
            </tbody>
        </table>
    )
}

