import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

import {faCcVisa, faCcMastercard, faCcAmex} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Payment() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState ("");
    const [cardType, setCardType] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [cvv, setCvv] = useState("");
    const [shinePos, setShinePos] = useState({
        x: 50,
        y: 50
    });
    const [isCardValid, setCardValid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("monthly");
    const navigate = useNavigate();
    const [saveCard, setSaveCard] = useState(true);
    const [showAlreadySubscribed, setShowAlreadySubscribed] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState(null);

        useEffect(() => {
    const raw = localStorage.getItem("currentUser");

    if (!raw) return;

    const currentUser = JSON.parse(raw);

    if (currentUser.premium) {
        setShowAlreadySubscribed(true);

        const subscription = JSON.parse(
            localStorage.getItem("subscription")
        );

        if (subscription) {
            setSubscriptionData(subscription);
        }
    }
}, []);

    

    const detectCardType = (number) => {

        if (number.startsWith("4")) {
            return "visa";
        }

        if (
            number.startsWith("51") || 
            number.startsWith("52") ||
            number.startsWith("53") ||
            number.startsWith("54") ||
            number.startsWith("55")
) {
    return "mastercard";
            
        }

        if (
            number.startsWith("34") ||
            number.startsWith("37")
    ) {
        return "amex";            
        }
        return "";
    };

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\D/g, "")
        .slice(0, 16);

        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(" ") : "";
    };

    const maskCardNumber = (number) => {

    const digits = number.replace(/\s/g, "");

    if (digits.length < 16) {
        return number;
    }

    const first4 = digits.slice(0, 4);
    const last4 = digits.slice(-4);

    return `${first4} **** **** ${last4}`;
};

    const formatExpiryDate = (value) => {

    let cleaned = value
        .replace(/\D/g, "")
        .slice(0, 4);

    if (cleaned.length === 1) {

        const firstDigit = parseInt(cleaned);

        if (firstDigit > 1) {
            return `0${firstDigit}/`;
        }
    }

    if (cleaned.length >= 2) {

        let month = parseInt(
            cleaned.slice(0, 2)
        );

        if (month === 0) {
            month = 1;
        }

        if (month > 12) {
            month = 12;
        }

        const monthString = String(month)
            .padStart(2, "0");

        cleaned =
            monthString +
            cleaned.slice(2);
    }

    if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    return cleaned;
};

const validateLuhn = (number) => {
    const digits = number.replace(/\D/g, "");

    let sum = 0;
    let shouldDouble = false;

    for (
        let i = digits.length - 1;
        i >= 0;
        i--
    ) {
        let digit = parseInt(digits[i]);

        if (shouldDouble) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;

        shouldDouble = !shouldDouble;
        
    }

    return (
        digits.length > 0 &&
        sum % 10 === 0
    );
};

const validateCardBrand = (number, type) => {
    const digits = number.replace(/\D/g, "");

    switch(type){
        case "visa":
            return digits.length === 13 ||
            digits.length === 16;

            case "mastercard":
                return digits.length === 16;

                case "amex":
                    return digits.length === 15;

                    default:
                        return false;
    }
};

const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
    ((e.clientX - rect.left) / rect.width) * 100;

    const y =
    ((e.clientY - rect.top) / rect.height) * 100;

    setShinePos({x, y});
};

const validateExpiryDate = (date) =>{
    if (date.length !== 5) {
        return false;
    }

    const [month, year] = date.split("/");

    const expMonth = parseInt(month);
    const expYear = 2000 + parseInt(year);

    const today = new Date();

    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (expYear < currentYear) {
        return false;
    }
    if (
        expYear === currentYear &&
        expMonth < currentMonth
    ) {
        return false;
    }
    return true;
};

const canPay =
isCardValid &&
cardName.trim().length > 0 &&
validateExpiryDate(expiryDate) &&
(
    (cardType === "amex" && cvv.length === 4) ||
    (cardType !== "amex" && cvv.length === 3)
);

const handlePayment = () => {
    if (!canPay || isProcessing) return;

    setIsProcessing(true);

    setTimeout(() =>{
        setIsProcessing(false);
        setIsSuccess(true);

        // Marcar usuario como premium 
        try {
            const raw = localStorage.getItem("currentUser");
            if (raw) {
                
                const currentUser = JSON.parse(raw);

                // Crear suscripción
                const subscription = {
    id: Date.now(),
    userId: currentUser.id,

    plan: selectedPlan,
    status: "active",

    cardType: cardType || "visa",
    cardLastDigits: cardNumber.replace(/\s/g, "").slice(-4),

    holderName: cardName,

    startDate: new Date().toISOString(),

    price:
        selectedPlan === "monthly"
            ? 7
            : 96,

    billingCycle:
        selectedPlan === "monthly"
            ? "monthly"
            : "yearly",

    expiresAt:
        selectedPlan === "monthly"
            ? new Date(
                new Date().setMonth(
                    new Date().getMonth() + 1
                )
            ).toISOString()
            : new Date(
                new Date().setFullYear(
                    new Date().getFullYear() + 1
                )
            ).toISOString(),

    nextBillingDate:
        selectedPlan === "monthly"
            ? new Date(
                new Date().setMonth(
                    new Date().getMonth() + 1
                )
            ).toISOString()
            : new Date(
                new Date().setFullYear(
                    new Date().getFullYear() + 1
                )
            ).toISOString()
};

                // Guardar suscripción
                localStorage.setItem(
                    "subscription",
                    JSON.stringify(subscription)
                );

                // Actualizar usuario a premium
                const updatedUser = {
                    ...currentUser,
                    premium: true
                };

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(updatedUser)
                );

                // También actualizar en la lista "users" para que persista tras re-login
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = users.map(u =>
                    u.email === currentUser.email ? { ...u, premium: true } : u
                );
                localStorage.setItem("users", JSON.stringify(updatedUsers));

                if (saveCard){
                const savedCards =
                JSON.parse(
                    localStorage.getItem("paymentMethods")
                ) || [];

                const cardAlreadyExists = savedCards.some(
                    card =>
                        card.lastDigits === cardNumber.slice(-4) &&
                    card.holder === cardName
                );
                if (!cardAlreadyExists) {
                    const newCard = {
                        id: Date.now(),
                        type: cardType || "visa",
                        holder: cardName,
                        lastDigits: cardNumber.slice(-4),
                        expiry: expiryDate
                    };
                    localStorage.setItem(
                        "paymentMethods",
                        JSON.stringify([
                            ...savedCards,
                            newCard
                        ])
                    );
                }
            }

                window.dispatchEvent(new Event('userUpdated'));
            }
        } catch (e) {
            console.error("Error al actualizar premium:", e);
        }

        setTimeout(() => {
            navigate("/profile");
        }, 5000);
        
    }, 2000);
        
    };

    if (isSuccess) {
        return (
            <main className="payment-success-page">
                <div className="payment-succes-card">
                    <div className="premium-medal">
                        ★
                        </div>
                        <span className="success-badge">
                            MEMBRESÍA ACTIVADA
                            </span>
                    <h1>
                        ¡Bienvenido a Recoil Premium!
                    </h1>
                    <p>
                        Ya puedes disfrutar de todos los beneficios.
                    </p>
                    <small>
                        Redirigiendo a tu perfil...
                    </small>
                </div>
            </main>
        );
    }

    const isExpired =
    expiryDate.length === 5 &&
    !validateExpiryDate(expiryDate);


    return (
        <main className="payment-page">
            <div className="payment-container">
                <div className="payment-layout">
                    <div className="payment-info">

    <span className="premium-badge">
        PREMIUM
    </span>

    <h2>RECOIL Premium</h2>

        <div className="plan-highlight">
    {selectedPlan === "monthly"
        ? "MÁS POPULAR"
        : "AHORRO DEL 20%"}
</div>

    <div className="plan-selector">

    <div
        className={`selector-pill ${
            selectedPlan === "yearly"
                ? "right"
                : ""
        }`}
    />

    <button
        className={
            selectedPlan === "monthly"
                ? "active"
                : ""
        }
        onClick={() => setSelectedPlan("monthly")}
    >
        Mensual
    </button>

    <button
        className={
            selectedPlan === "yearly"
                ? "active"
                : ""
        }
        onClick={() => setSelectedPlan("yearly")}
    >
        Anual
    </button>

</div>

    <div className="premium-price">

    <h3>
        {selectedPlan === "monthly"
            ? "$7"
            : "$96"}
    </h3>

    <span>
        {selectedPlan === "monthly"
            ? "Primer mes"
            : "Facturación anual"}
    </span>

    <small>
        {selectedPlan === "monthly"
            ? "Luego $9.99/mes"
            : "Ahorra 20% frente al plan mensual"}
    </small>

</div>

    <p className="premium-description">
        Conviértete en un crítico verificado y desbloquea
        herramientas exclusivas para destacar dentro de
        la comunidad.
    </p>

    <div className="premium-benefits">

    <div className="benefit-item">
        <span className="benefit-check">✓</span>
        Insignia exclusiva de crítico verificado
    </div>

    <div className="benefit-item">
        <span className="benefit-check">✓</span>
        Publicación ilimitada de reseñas
    </div>

    <div className="benefit-item">
        <span className="benefit-check">✓</span>
        Acceso anticipado a nuevas funciones
    </div>

    <div className="benefit-item">
        <span className="benefit-check">✓</span>
        Mayor visibilidad dentro de la comunidad
    </div>

</div>

</div>
                    <div className="payment-checkout">
                        <div
    className={`card-preview ${
        isFlipped ? "flipped" : ""
    } ${cardType}`}
    onMouseMove={handleCardMove}
    style={{
        "--x": `${shinePos.x}%`,
        "--y": `${shinePos.y}%`
    }}
>

    <div className="card-front">

        <div className="card-shine"></div>

        <div className="card-chip"></div>

        <div className="card-brand">
            {cardType === "visa" && (
                <FontAwesomeIcon icon={faCcVisa} />
            )}

            {cardType === "mastercard" && (
                <FontAwesomeIcon icon={faCcMastercard} />
            )}

            {cardType === "amex" && (
                <FontAwesomeIcon icon={faCcAmex} />
            )}
        </div>

        <div className="card-number">
            {cardNumber ? maskCardNumber(cardNumber) : "**** **** **** ****"}
        </div>

        <div className="card-footer">

            <div>
                <span>TITULAR</span>
                <h4>
                    {cardName || "NOMBRE EN TARJETA"}
                </h4>
            </div>

            <div>
                <span>EXPIRA</span>
                <h4>
                    {expiryDate || "MM/AA"}
                </h4>
            </div>

        </div>

    </div>

    <div className="card-back">

        <div className="magnetic-strip"></div>

        <div className="cvv-container">

    <div className="signature-strip">
        <div className="cvv-box">
            {cvv || "***"}
        </div>
    </div>

</div>

    </div>

</div>
{/*<p className={isCardValid ? "card-valid" : "card-invalid"}>
    {isCardValid
        ? "Tarjeta válida"
        : "Tarjeta inválida"}
</p>*/}
                <form className="payment-form">
                    <div className="card-input-wrapper">

    <input
        disabled={showAlreadySubscribed}
        type="text"
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChange={(e) => {
            const formatted = formatCardNumber(
                e.target.value
            );

            setCardNumber(formatted);

            const detectedType = detectCardType(
                formatted.replace(/\s/g, "")
            );

            setCardType(detectedType);

            setCardValid(
                validateLuhn(formatted) &&
                validateCardBrand(
                    formatted,
                    detectedType
                )
            );
        }}
    />

    {!cardNumber && (
        <div className="card-icons">
            <FontAwesomeIcon icon={faCcVisa} />
            <FontAwesomeIcon icon={faCcMastercard} />
            <FontAwesomeIcon icon={faCcAmex} />
        </div>
    )}

</div>

                    <input
                        disabled={showAlreadySubscribed}
                        type="text"
                        placeholder="Nombre del titular"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                    <div className="row">

    <div className="expiry-group">

        <input
            disabled={showAlreadySubscribed}
            type="text"
            placeholder="MM/AA"
            value={expiryDate}
            onChange={(e) =>
                setExpiryDate(
                    formatExpiryDate(e.target.value)
                )
            }
        />

        {isExpired && (
            <span className="expiry-error">
                Tarjeta vencida
            </span>
        )}

    </div>

                    <input
                        disabled={showAlreadySubscribed}
                        type="text"
                        placeholder="CVV"
                        maxLength={cardType === "amex" ? 4 : 3}
                        value={cvv}
                        onChange={(e) =>
                            setCvv(
                                e.target.value.replace(/\D/g, "")
                            )
                        }
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                    />
                    </div>

                        {/*<div className="payment-summary">

    {selectedPlan === "monthly" ? (

        <>
            <div className="summary-row">
                <span>RECOIL Premium Mensual</span>
                <strong>$7.00</strong>
            </div>

            <div className="summary-note">
                Luego $9.99/mes
            </div>
        </>

    ) : (

        <>
            <div className="summary-row">
                <span>RECOIL Premium Anual</span>
                <strong>$120.00</strong>
            </div>

            <div className="summary-row discount">
                <span>Descuento 20%</span>
                <strong>-$24.00</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
                <span>Total a pagar hoy</span>
                <strong>$96.00</strong>
            </div>
        </>


</div>
    )} */}
<div className="save-card-option">
    <label>
        <input type="checkbox"
        checked={saveCard}
        onChange={(e) =>
            setSaveCard(e.target.checked)
        } 
        />
        Guardar esta tarjeta para compras futuras
    </label>
</div>
    <button
    type="button"
    disabled={!canPay || isProcessing || isSuccess || showAlreadySubscribed}
    onClick={handlePayment}
    className={`
        payment-btn
        ${isProcessing ? "processing" : ""}
        ${isSuccess ? "success" : ""}
    `}
>
    {isProcessing ? (
        <>
            <span className="spinner"></span>
            PROCESANDO...
        </>
    ) : isSuccess ? (
        <>
    <span className="success-check">
        ✓
    </span>

    PAGO APROBADO
</>
    ) : (
        "PAGAR"
    )}
</button>

<div className="security-note">
    Tus datos se transmiten mediante conexión cifrada SSL.
</div>
                </form>
                    </div>
                </div>
            </div>


            {showAlreadySubscribed && (
    <div className="subscription-modal-overlay">

        <div className="subscription-modal">

            <div className="subscription-modal-icon">
                ★
            </div>

            <span className="subscription-badge">
                PREMIUM ACTIVO
            </span>

            <h2>
                Ya tienes una suscripción activa
            </h2>

            <p>
                Detectamos que tu cuenta ya dispone de
                una membresía RECOIL Premium activa.
            </p>

            <p className="subscription-small">
                No es posible adquirir otra suscripción
                mientras tu plan actual permanezca vigente.
            </p>

            <div className="subscription-actions">

                <button
                    className="subscription-btn secondary"
                    onClick={() =>
                        navigate("/profile")
                    }
                >
                    Entendido
                </button>

                <button
                    className="subscription-btn primary"
                    onClick={() =>
                        navigate("/subscription")
                    }
                >
                    Ver mi suscripción
                </button>

            </div>

        </div>

    </div>
)}
        </main>
    );

}