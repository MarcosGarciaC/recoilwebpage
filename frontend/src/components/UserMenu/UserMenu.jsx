import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = ({ currentUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
        window.location.reload();
    };

    const handleProfile = () => {
        navigate("/profile");
    };

  return (
    <div className="user-menu">
        <div className="user-menu-header">
            <div className="user-avatar-large">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  currentUser.name.charAt(0).toUpperCase()
                )}
            </div>
            <div>
                <h4>{currentUser.name}</h4>
                <p>{currentUser.email}</p>
            </div>
        </div>
        <hr />
        <button className="menu-item" onClick={handleProfile}>
            <i className="fa-solid fa-user"></i>
            Perfil
        </button>

        <button className="menu-item">
            <i className="fa-solid fa-credit-card"></i>
            Métodos de pago
        </button>

        <button className="menu-item">
            <i className="fa-solid fa-gear"></i>
            Ajustes
        </button>
        <hr />
        <button className="menu-item logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Cerrar Sesión
        </button>
    </div>
  );
};

export default UserMenu;