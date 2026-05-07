import { Link } from 'react-router'

function Home() {
  return (
    <div className="container mt-5">
      {/* Capçalera */}
      <div className="text-center mb-5">
        <i className="bi bi-check2-square text-primary" style={{ fontSize: '3rem' }}></i>
        <h1 className="mt-3">Todo List</h1>
        <p className="text-muted">Gestiona usuaris i tasques de manera senzilla</p>
      </div>

      {/* Targetes */}
      <div className="row g-4 justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <i className="bi bi-person-plus text-primary fs-2"></i>
              <div>
                <h5 className="card-title mb-1">Nou usuari</h5>
                <p className="card-text text-muted small mb-2">
                  Donar d'alta un nou usuari al sistema.
                </p>
                <Link to="/users/new" className="btn btn-primary btn-sm">
                  Crear usuari
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <i className="bi bi-plus-circle text-success fs-2"></i>
              <div>
                <h5 className="card-title mb-1">Nova tasca</h5>
                <p className="card-text text-muted small mb-2">
                  Assignar una tasca a un usuari existent.
                </p>
                <a href="#" className="btn btn-success btn-sm">
                  Crear tasca
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <i className="bi bi-search text-warning fs-2"></i>
              <div>
                <h5 className="card-title mb-1">Cercar tasques</h5>
                <p className="card-text text-muted small mb-2">
                  Veure i gestionar les tasques d'un usuari.
                </p>
                <a href="#" className="btn btn-warning btn-sm">
                  Cercar
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <i className="bi bi-clock-history text-info fs-2"></i>
              <div>
                <h5 className="card-title mb-1">Tasques pendents</h5>
                <p className="card-text text-muted small mb-2">
                  Totes les tasques no completades.
                </p>
                <a href="#" className="btn btn-info btn-sm">
                  Veure pendents
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;