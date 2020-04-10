import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        url: "https://github.com/josepholiveira",
        title: `Desafio ReactJS  ${Date.now()}`,
        techs: ["React", "Node.js"],
        }
      );
      const repository = response.data;
      setRepositories([
        ...repositories,
        repository
      ])
    } catch (error) {}
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(
        repositories.filter(repository => repository.id !== id)
      )
    } catch (error) {}
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}) => (
        <li key={id}>
          {title}
          <button onClick={() => handleRemoveRepository(id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
