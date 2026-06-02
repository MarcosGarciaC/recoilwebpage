import { useState, useEffect } from "react";
import "./LoginRegister.css";
import { useLocation, useNavigate } from "react-router-dom";

function LoginRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  //Register
  const [active, setActive] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  //Login
  const [loginEmail, setLoginEmail] = useState("");
  const[loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    setActive(location.pathname === "/register");
  }, [location.pathname]);

  const handleRegister = () => {
    if (!registerName || !registerEmail || !registerPassword) {
        alert("Completa todos los campos");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
        user => user.email === registerEmail
    );

    if (userExists) {
        alert("El correo ya fue registrado");
        return;
    }

    const newUser = {
        name: registerName,
        email: registerEmail,
        password: registerPassword
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado correctamente");

    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");

    navigate("/login");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user =>
            user.email === loginEmail &&
            user.password === loginPassword
    );
    if (!user) {
        alert("Correo o contraseña incorrectos");
        return;
    }
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );
    localStorage.setItem(
      "justLoggedIn", 
      "true"
    );
    alert(`Bienvenido ${user.name}`);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className={`container ${active ? "active" : ""}`}>
        <div className="form-container sign-up">
          <form>
            <h1>Crea Una Cuenta</h1>

            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google"></i>
              </a>

              <a href="#" className="icon">
                <i className="fa-brands fa-facebook"></i>
              </a>

              <a href="#" className="icon">
                <i className="fa-brands fa-discord"></i>
              </a>
            </div>

            <div className="divider">
              <span></span>
            </div>

            <input type="text" placeholder="Nombre" value={registerName} onChange={(e) => setRegisterName(e.target.value)}/>
            <input type="email" placeholder="Correo" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}/>
            <input type="password" placeholder="Contraseña" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>

            <button type="button" onClick={handleRegister}>
              Registrarse
            </button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Iniciar Sesión</h1>

            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google"></i>
              </a>

              <a href="#" className="icon">
                <i className="fa-brands fa-facebook"></i>
              </a>

              <a href="#" className="icon">
                <i className="fa-brands fa-discord"></i>
              </a>
            </div>

            <div className="divider">
              <span></span>
            </div>

            <input type="email" placeholder="Correo" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
            <input type="password" placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>

            <a href="#">
              ¿Olvidaste la contraseña?
            </a>

            <button type="button" onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Que bueno verte otra vez!</h1>

              <p>
                Inicia Sesión Con Tu Correo & Contraseña
              </p>

              <button
                type="button"
                className="hidden"
                onClick={() => {
                  setActive(false);
                  navigate("/login");
                }}
              >
                Iniciar Sesión
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>¡Hola, amiguito!</h1>

              <p>
                Registrate Ahora Para Disfrutar Todas Las Funciones
              </p>

              <button
                type="button"
                className="hidden"
                onClick={() => {
                  setActive(true);
                  navigate("/register");
                }}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;