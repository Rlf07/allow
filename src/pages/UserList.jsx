export default function UserList() {
  return (
    <>
      <div className="App">
        <h1>Lista de Usuários</h1>
        <input
          type="text"
          placeholder="Digite o ID do usuario"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleListStudents}>Listar</button>
        <ul>
          {result.map((student) => (
            <li key={student.id}>
              {`ID: ${student.id}, Email: ${student.email}, Nome: ${student.nome}, Idade: ${student.idade}`}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
