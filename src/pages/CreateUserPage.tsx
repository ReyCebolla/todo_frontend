import { useState } from "react";
import { useNavigate } from "react-router";
import { crearUsuari } from "../services/api";
import type { User } from "../types/models";
 
function CreateUserPage() {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState<User>({
    nif: "",
    name: "",
    email: "",
  });
 
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const validate = (): string[] => {
    const newErrors: string[] = [];
 
    if (!formData.nif.trim()) {
      newErrors.push("El NIF és obligatori.");
    } else if (formData.nif.length > 9) {
      newErrors.push("El NIF no pot tenir més de 9 caràcters.");
    }
 
    if (!formData.name.trim()) {
      newErrors.push("El nom és obligatori.");
    } else if (formData.name.length > 50) {
      newErrors.push("El nom no pot tenir més de 50 caràcters.");
    }
 
    if (!formData.email.trim()) {
      newErrors.push("L'email és obligatori.");
    } else if (formData.email.length > 100) {
      newErrors.push("L'email no pot tenir més de 100 caràcters.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push("El format de l'email no és vàlid.");
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
      await crearUsuari(formData);
      setSuccess(true);
      setFormData({ nif: "", name: "", email: "" });
    } catch (error: any) {
      setErrors([error.message]);
    }
  };
 
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>
            <i className="bi bi-person-plus me-2"></i>
            Nou usuari
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
              Usuari creat correctament!
            </div>
          )}
 
          <div className="card mt-3">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nif" className="form-label">
                    NIF
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nif"
                    name="nif"
                    maxLength={9}
                    value={formData.nif}
                    onChange={handleChange}
                  />
                  <div className="form-text">Màxim 9 caràcters</div>
                </div>
 
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    maxLength={50}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
 
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    maxLength={100}
                    value={formData.email}
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
 
export default CreateUserPage;