import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";

export default function Subscription() {
    const navigate = useNavigate();

    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const data = JSON.parse(
            localStorage.getItem("subscription")
        );

        if (data) {
            setSubscription(data);
        }
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            "es-ES",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );
    };

    const getCardName = (type) => {
        switch (type) {
            case "visa":
                return "Visa";
            case "mastercard":
                return "Mastercard";
            case "amex":
                return "American Express";
            default:
                return "Tarjeta";
        }
    };

    if (!subscription) {
    return (
        <div className="no-subscription-card">

            <div className="no-subscription-icon">
                ★
            </div>

            <span className="no-subscription-badge">
                PREMIUM
            </span>

            <h2>
                No tienes una suscripción activa
            </h2>

            <p>
                Obtén RECOIL Premium para acceder a beneficios
                exclusivos, insignia de crítico verificado y
                funciones avanzadas dentro de la comunidad.
            </p>

            <button
                className="no-subscription-btn"
                onClick={() => navigate("/payment")}
            >
                Obtener Premium
            </button>

            <div className="subscription-benefits">
                <h3>¿Por qué Premium?</h3>

                <ul>
                    <li>✓ Crítico Verificado</li>
                    <li>✓ Listas ilimitadas</li>
                    <li>✓ Funciones avanzadas</li>
                    <li>✓ Acceso anticipado a novedades</li>
                </ul>
            </div>

            <div className="subscription-links">
                <button
                    className="subscription-nav-btn"
                    onClick={() => navigate("/")}
                >
                    Ir al Inicio
                </button>

                <button
                    className="subscription-nav-btn"
                    onClick={() => navigate("/genders")}
                >
                    Explorar Juegos
                </button>
            </div>

        </div>
    );
}

    const canModifyPlan =
        new Date() >=
        new Date(subscription.expiresAt);

    return (
        <main className="subscription-page">

            <div className="subscription-container">

                <div className="subscription-header">

                    <div className="premium-medal">
                        ★
                    </div>

                    <span className="subscription-status">
                        PREMIUM ACTIVO
                    </span>

                    <h1>
                        Tu suscripción RECOIL Premium
                    </h1>

                    <p>
                        Gestiona tu membresía y revisa
                        toda la información de tu plan.
                    </p>

                </div>

                <div className="subscription-top-grid">
                    
                    <div className="subscription-card">

                        <div className="subscription-row">
                            <span>Plan actual</span>

                            <strong>
                                {subscription.plan === "monthly"
                                    ? "Mensual"
                                    : "Anual"}
                            </strong>
                        </div>

                        <div className="subscription-row">
                            <span>Estado</span>

                            <strong className="active">
                                Activa
                            </strong>
                        </div>

                        <div className="subscription-row">
                            <span>Tarjeta</span>

                            <strong>
                                {getCardName(
                                    subscription.cardType
                                )}
                                {" "}
                                ••••
                                {subscription.cardLastDigits}
                            </strong>
                        </div>

                        <div className="subscription-row">
                            <span>Próxima facturación</span>

                            <strong>
                                {formatDate(
                                    subscription.nextBillingDate
                                )}
                            </strong>
                        </div>

                        <div className="subscription-row">
                            <span>Vence</span>

                            <strong>
                                {formatDate(
                                    subscription.expiresAt
                                )}
                            </strong>
                        </div>

                    </div>

                    <div className="benefits-card">

                        <h2>
                            Beneficios incluidos
                        </h2>

                        <div className="benefit-item">
                            ✓ Insignia exclusiva de crítico verificado
                        </div>

                        <div className="benefit-item">
                            ✓ Publicación ilimitada de reseñas
                        </div>

                        <div className="benefit-item">
                            ✓ Acceso anticipado a nuevas funciones
                        </div>

                        <div className="benefit-item">
                            ✓ Mayor visibilidad dentro de la comunidad
                        </div>

                    </div>
                </div>

                <div className="actions-card">

                    <h2>
                        Gestión de suscripción
                    </h2>

                    {!canModifyPlan && (
                        <div className="subscription-warning">
                            Podrás cambiar o cancelar tu
                            plan cuando finalice el periodo
                            actual.
                        </div>
                    )}

                    <div className="subscription-actions">

                        <button
                            disabled={!canModifyPlan}
                            className="secondary-btn"
                        >
                            Cambiar de plan
                        </button>

                        <button
                            disabled={!canModifyPlan}
                            className="danger-btn"
                        >
                            Cancelar suscripción
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}