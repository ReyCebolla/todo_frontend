import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { User, Task } from "../types/models";
import { llistarUsuaris, crearTasca } from "../services/api";
 
function CreateTaskPage() {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    dueDate: "",
    user: "",
  });
 
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
 
  // Carregar la llista d'usuaris quan es munta el component
  useEffect(() => {
    llistarUsuaris()
      .then((data) => setUsers(data))
      .catch(() => setErrors(["No s'han pogut carregar els usuaris."]));
  }, []);
 
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const validate = (): string[] => {
    const newErrors: string[] = [];
 
    if (!formData.title.trim()) {
      newErrors.push("El títol és obligatori.");
    } else if (formData.title.length > 100) {
      newErrors.push("El títol no pot tenir més de 100 caràcters.");
    }
 
    if (!formData.user) {
      newErrors.push("Has de seleccionar un usuari.");
    }
 
    return newErrors;
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);
 
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
 
    try {
      await crearTasca(formData);
      setSuccess(true);
      setFormData({ title: "", description: "", dueDate: "", user: "" });
    }catch (error) {
      setErrors([error instanceof Error ? error.message : "S'ha produït un error desconegut"]);
    }
  };
 
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">  
        <div className="col-md-6">
          <h2>
            <i className="bi bi-plus-circle me-2"></i>
            Nova tasca
          </h2>
 
          {errors.length > 0 && (
            <div className="alert alert-danger mt-3">
              {errors.map((err, i) => (
                <div key={i}>{err}</div>
              ))}
            </div>
          )}
 
          {success && (
            <div className="alert alert-success mt-3">
              Tasca creada correctament!
            </div>
          )}
 
          <div className="card mt-3">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    Usuari
                  </label>
                  <select
                    className="form-select"
                    id="user"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                  >
                    <option value="">-- Selecciona un usuari --</option>
                    {users.map((user) => (
                      <option key={user.nif} value={user.nif}>
                        {user.name} ({user.nif})
                      </option>
                    ))}
                  </select>
                </div>
 
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Títol
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    maxLength={100}
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
 
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripció
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
 
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Data límit
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
 
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-lg me-1"></i>
                    Crear
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                  >
                    Tornar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CreateTaskPage;