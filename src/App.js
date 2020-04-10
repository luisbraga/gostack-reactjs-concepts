import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data)
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
      const project = response.data;
      setProjects([
        ...projects,
        project
      ])
    } catch (error) {}
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setProjects([
        ...projects.filter(project => project.id !== id)
      ])
    } catch (error) {}
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(({id, title}) => (
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
