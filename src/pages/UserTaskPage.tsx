import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { User, TaskResponse } from "../types/models";
import {
  llistarUsuaris,
  llistarTasquesPerUsuari,
  marcarTascaCompletada,
  eliminarTasca,
} from "../services/api";
 
function UserTasksPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedNif, setSelectedNif] = useState("");
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
 
  useEffect(() => {
    llistarUsuaris()
      .then((data) => setUsers(data))
      .catch(() => setError("No s'han pogut carregar els usuaris."));
  }, []);
 
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSearched(false);
 
    if (!selectedNif) {
      setError("Has de seleccionar un usuari.");
      return;
    }
 
    try {
      const data = await llistarTasquesPerUsuari(selectedNif);
      setTasks(data);
      setSearched(true);
    } catch (err: any) {
      setError(err.message);
    }
  };
 const handleComplete = async (id: number) => {
    try {
      await marcarTascaCompletada(id);
      const data = await llistarTasquesPerUsuari(selectedNif);
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await eliminarTasca(id);
      const data = await llistarTasquesPerUsuari(selectedNif);
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>
        <i className="bi bi-search me-2"></i>
        Cercar tasques d'un usuari
      </h2>
 
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSearch} className="d-flex gap-2">
            <select
              className="form-select"
              value={selectedNif}
              onChange={(e) => setSelectedNif(e.target.value)}
            >
              <option value="">-- Selecciona un usuari --</option>
              {users.map((user) => (
                <option key={user.nif} value={user.nif}>
                  {user.name} ({user.nif})
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-success">
              <i className="bi bi-search me-1"></i>
              Cercar
            </button>
          </form>
        </div>
      </div>
 
      {error && <div className="alert alert-danger mt-3">{error}</div>}
 
      {searched && tasks.length === 0 && (
        <div className="alert alert-info mt-3">
          <i className="bi bi-info-circle me-2"></i>
          Aquest usuari no té tasques.
        </div>
      )}
 
      {tasks.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Títol</th>
                <th>Descripció</th>
                <th>Data límit</th>
                <th>Estat</th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td
                    className={
                      task.completed
                        ? "text-decoration-line-through text-muted"
                        : ""
                    }
                  >
                    {task.title}
                  </td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    {task.completed ? (
                      <span className="badge bg-success">Completada</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pendent
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      {!task.completed && (
                        <button
                          className="btn btn-sm btn-outline-success"
                          title="Marcar com a feta"
                          onClick={() => handleComplete(task.id!)}
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar"
                        onClick={() => handleDelete(task.id!)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
 
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Tornar
      </button>
    </div>
  );
}
 
export default UserTasksPage;