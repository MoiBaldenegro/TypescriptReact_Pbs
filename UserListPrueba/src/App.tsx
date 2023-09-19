import { useEffect, useState } from "react";
import { sortBy, type Users } from "./types.d"
import "./App.css";
import UsersList from "./components/userList";

function App () {

  const [users, setUsers] = useState<Users[]>([]);
  const [colorActive, setcolorActive] = useState(false);
  const [sorting, setSorting] = useState<sortBy>(sortBy.NONE);
  const [filterString, setFilterString ] = useState("");

  const toggleColor = ()=>{
    setcolorActive(!colorActive)
    console.log(colorActive);
  }
  
  const sortByCountries = ()=>{
    const sortingValue: sortBy = sorting === sortBy.NONE ? sortBy.COUNTRY : sortBy.NONE;
    setSorting(sortingValue)

  }

  const filterByCountries = filterString != null && filterString.length > 0 
      ?  users.filter(user => { 
         return user.location.country.toLowerCase().includes(filterString.toLowerCase())
        })
      : users; 
     const handleSorting = (sortType: sortBy) => {
        setSorting(sortType);
     } 

    const sortedUsers = sorting === sortBy.COUNTRY
      ? filterByCountries.toSorted((a, b) => { return a.location.country.localeCompare(b.location.country)}) 
      : sorting === sortBy.FIRST
      ? filterByCountries.toSorted((a, b) => { return a.name.first.localeCompare(b.name.first)})
      : sorting === sortBy.LAST
      ? filterByCountries.toSorted((a, b) => { return a.name.last.localeCompare(b.name.last)})
      : filterByCountries;

    const deleteUser = (email: string) => {
      const userDeleted = users.filter(user => user.email !=  email)
      setUsers(userDeleted);
    }
    
    const handleChange = (value: string) =>{
      setFilterString(value)
    }
  

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
    .then(res => res.json())
    .then( res => setUsers(res.results))
    .catch((error)=> console.error(error))
  }, [])

  return (
    <>
      <h1> empezando si señor</h1> 
      <header> 
        <button onClick={toggleColor}> Colorear Filas </button>
        <button onClick={sortByCountries}> { sorting === sortBy.COUNTRY ? "Ordenar por pais " : "Dejar de ordenar" } </button>
        <button>Reestablecer usuarios</button>
        <input onChange={(e)=>{handleChange(e.target.value)}} type="text" name="" id="" />

        </header>
      <UsersList colorActive={colorActive}
                 users={sortedUsers}
                 deleteUser={deleteUser}
                 handleSorting={handleSorting}
                  />
      
    
    </>
  )
}

export default App
