import { useEffect, useState } from "react";

function Usuarios() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);

    //Efeito colateral // executa apenas quando o componente monta
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("https://api.github.com/users");
                const data = await response.json();
                setUsers(data); //atualizando o estado de users
            } catch (error) {
                console.error("Erro ao buscar usuarios", error)
            } finally {
                setLoading(false)
            }

        } +
            fetchUsers();
    }, []); // dependências vazias = executa só uma vez

    return (
        <>
            <h1>Lista de Usuarios do GitHub</h1>
            {loading ? (<p>Carregando...</p>) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                width={40}
                                style={{ borderRadius: "50%", marginRight: "10px" }} />
                            {user.login}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );

}

export default Usuarios;