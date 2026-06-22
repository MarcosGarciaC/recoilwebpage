import { useState, useEffect } from "react";

import "./Paymentmethods.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faCcVisa,
    faCcMastercard,
    faCcAmex
} from "@fortawesome/free-brands-svg-icons";

function PaymentMethods() {

    const [showForm, setShowForm] = useState(false);
    const [holder, setHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [editingCardId, setEditingCardId] = useState(null);
    const [cardType, setCardType] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);

    const [cards, setCards] = useState(() => {
        return JSON.parse(
            localStorage.getItem("paymentMethods")
        ) || [];
    }
    );

    const handleSaveCard = () => {
        if (!holder ||
            !cardNumber ||
            !expiry ||
            !cvv
        ) {
            alert("Completa todos los campos");
            return;
            
        }

        const digits = cardNumber.replace(/\s/g, "");

        if (!/^\d+$/.test(cvv)) {
    alert("CVV inválido");
    return;
}

if (
    (cardType === "amex" && cvv.length !== 4) ||
    (cardType !== "amex" && cvv.length !== 3)
) {
    alert("Longitud de CVV inválida");
    return;
}

if (!validateLuhn(digits)) {
    alert("Número de tarjeta inválido");
    return;
}

if (!validateExpiryDate(expiry)) {
    alert("La tarjeta está vencida");
    return;
}

        if (editingCardId) {
            const updatedCards = cards.map(card =>

                card.id === editingCardId
                ? {
                    ...card,
                    holder,
                    lastDigits: digits.slice(-4),
                    expiry
                }
                : card
            );
            setCards(updatedCards);
            setEditingCardId(null);
        } else {

            const cardExists = cards.some(
                card =>
                    card.lastDigits === digits.slice(-4) &&
                card.holder.toLowerCase() === holder.toLowerCase()
            );
            if (cardExists) {
                alert("Esta tarjeta ya está registrada");
                return;
            }

            const newCard = {
                id: Date.now(),
                type: cardType || "visa",
                holder,
                lastDigits: digits.slice(-4),
                expiry,
                isDefault: cards.length === 0
            };
            setCards(
                [
                    ...cards,
                    newCard
                ]
            )
        }
        setHolder("");
        setCardNumber("");
        setExpiry("");
        setCvv("");

        setEditingCardId(null);
        
        setShowForm(false);
    };

    const handleDeleteClick = (cardId) => {
    const card = cards.find(c => c.id === cardId);

    setCardToDelete(card);
    setShowDeleteModal(true);
};

const confirmDelete = () => {
    if (!cardToDelete) return;
    const updatedCards = cards.filter(
        card => card.id !== cardToDelete.id
    );

    setCards(updatedCards);

    setCardToDelete(null);
    setShowDeleteModal(false);
};

const cancelDelete = () => {
    setCardToDelete(null);
    setShowDeleteModal(false);
};

    const handleSetDefault = (cardId) => {

    const updatedCards = cards.map(card => ({
        ...card,
        isDefault: card.id === cardId
    }));

    setCards(updatedCards);
};

    useEffect(() => {
        localStorage.setItem(
            "paymentMethods",
            JSON.stringify(cards)
        );
    }, [cards]
    );

    const handleEditCard = (card) => {
        setHolder(card.holder);
        setExpiry (card.expiry);
        setCardNumber(card.lastDigits);
        setCvv("");
        setEditingCardId(card.id);
        setShowForm(true);
    }

    const handleCancelEdit = () => {
        setHolder ("");
        setCardNumber("");
        setExpiry("");
        setCvv("");

        setEditingCardId(null);
        setShowForm(false);
    }

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
    const cleaned = value
        .replace(/\D/g, "")
        .slice(0, 16);

    const groups = cleaned.match(/.{1,4}/g);

    return groups
        ? groups.join(" ")
        : "";
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

const validateExpiryDate = (date) => {
    if (date.length !== 5) {
        return false;
    }

    const [month, year] = date.split("/");

    const expMonth = parseInt(month);
    const expYear = 2000 + parseInt(year);

    const today = new Date();

    const currentMonth =
        today.getMonth() + 1;

    const currentYear =
        today.getFullYear();

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

const formatExpiryDate = (value) => {
    let cleaned = value
        .replace(/\D/g, "")
        .slice(0, 4);

    if (cleaned.length >= 2) {
        let month = parseInt(
            cleaned.slice(0, 2)
        );

        if (month === 0) month = 1;
        if (month > 12) month = 12;

        cleaned =
            String(month).padStart(2, "0") +
            cleaned.slice(2);
    }

    if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    return cleaned;
};

    return (
        <main className="payment-methods-page">
            <div className="payment-methods-container">
                {cards.length === 0 &&(
                <div className="empty-payment-state">
                    <h3>No tienes métodos de pago registrados</h3>

                    <p>
                        Agrega una tarjeta para realizar compras de forma más rápida.
                    </p>
                </div>
    )
}
                <div className="payment-methods-header">
                    <div>
                        <h1>Métodos de pago</h1>
                        <p className="payment-methods-subtitle">
                            Administra tus tarjetas guardadas y agrega nuevos métodos de pago.
                        </p>
                    </div>
                    <button className="add-card-header-btn" onClick={() => setShowForm(!showForm)}>
                        + Agregar tarjeta
                    </button>
                </div>
                 {
                        showForm &&(
                            <div className="payment-form-card">
                                <input 
                                type="text"
                                placeholder="Nombre del titular"
                                value={holder}
                                onChange={(e) => setHolder(e.target.value)}
                                />

                                <input 
                                type="text"
                                placeholder="Número de tarjeta" 
                                value={cardNumber}
                                onChange={(e) => {
                                    const formatted = formatCardNumber(
                                        e.target.value
                                    );
                                    setCardNumber(formatted);
                                    setCardType(
                                        detectCardType(
                                            formatted.replace(/\s/g, "")
                                        )
                                    );
                                }}
                                />

                                <div className="payment-form-row">
                                    <input 
                                    type="text"
                                    placeholder="MM/AA"
                                    value={expiry}
                                    onChange={(e) =>
                                        setExpiry(
                                            formatExpiryDate(e.target.value)
                                        )
                                    }
                                    />

                                    <input
    type="text"
    placeholder="CVV"
    value={cvv}
    maxLength={cardType === "amex" ? 4 : 3}
    onChange={(e) =>
        setCvv(
            e.target.value.replace(/\D/g, "")
        )
    }
/>
                                </div>
                                <div className="payment-form-actions">
                                <button className="save-card-btn" onClick={handleSaveCard}>
                                    {
                                        editingCardId
                                        ? "Guardar cambios"
                                        : "Guardar tarjeta"
                                    }
                                </button>
                                {
                                    editingCardId && (
                                        <button className="cancel-edit-btn" onClick={handleCancelEdit}>
                                            Cancelar
                                        </button>
                                    )
                                }
                                </div>
                            </div>
                        )
                    }
                {
                    cards.length > 0 &&(
                <div className="saved-cards">
                    {cards.map(card =>(
                        <div
                        key={card.id}
                        className={`saved-card ${
                            card.isDefault ? "default-card" : ""
                            } ${card.type}`}
                            >
                                {
                                card.isDefault && (
                                <span className="default-card-badge-floating">
                                    MÉTODO PRINCIPAL
                                    </span>
                                )
                                }
                            <div className="saved-card-header">
                                <div className="saved-card-brand">
                                    {card.type === "visa" && (
                                        <FontAwesomeIcon icon={faCcVisa} />
                                        )}
                                        {card.type === "mastercard" && (
                                            <FontAwesomeIcon icon={faCcMastercard} />
                                            )}
                                            {card.type === "amex" && (
                                                <FontAwesomeIcon icon={faCcAmex} />
                                                )}
                                                </div>
                                <span>
                                    **** {card.lastDigits}
                                </span>
                            </div>
                            <div className="saved-card-info">

    <div className="mini-card-number">
        **** **** **** {card.lastDigits}
    </div>

    <div className="mini-card-footer">

        <div>
            <span>TITULAR</span>
            <p>{card.holder}</p>
        </div>

        <div>
            <span>EXPIRA</span>
            <p>{card.expiry}</p>
        </div>

    </div>

</div>
                             
                            <div className="saved-card-actions">
                                {
                                !card.isDefault && (
                                <button
                                className="primary-btn"
                                onClick={() => handleSetDefault(card.id)}
                                >
                                    Hacer principal
                                    </button>
                                )
                                }
                                <button className="delete-btn" onClick={() => 
                                    handleDeleteClick(card.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                    )
                }
            </div>
            {showDeleteModal && (
    <div className="modal-overlay">
        <div className="delete-modal">

            <h3>Eliminar tarjeta</h3>

            <p>
                ¿Seguro que deseas eliminar esta tarjeta?
            </p>

            {cardToDelete && (
                <div className="modal-card-preview">
                    <strong>
                        **** {cardToDelete.lastDigits}
                    </strong>
                    <span>{cardToDelete.holder}</span>
                </div>
            )}

            <div className="modal-actions">
                <button
                    className="cancel-btn"
                    onClick={cancelDelete}
                >
                    Cancelar
                </button>

                <button
                    className="confirm-delete-btn"
                    onClick={confirmDelete}
                >
                    Eliminar
                </button>
            </div>

        </div>
    </div>
)}
        </main>
    );
}

export default PaymentMethods;