import { useState, useEffect } from "react";

import "./Paymentmethods.css";

function PaymentMethods() {

    const [showForm, setShowForm] = useState(false);
    const [holder, setHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [editingCardId, setEditingCardId] = useState(null);

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
        if (editingCardId) {
            const updatedCards = cards.map(card =>

                card.id === editingCardId
                ? {
                    ...card,
                    holder,
                    lastDigits: cardNumber.slice(-4),
                    expiry
                }
                : card
            );
            setCards(updatedCards);
            setEditingCardId(null);
        } else {
            const newCard = {
                id: Date.now(),
                type: "visa",
                holder,
                lastDigits: cardNumber.slice(-4),
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

    const handleDeleteCard = (cardId) => {
        const updateCards = cards.filter(
            card => card.id !== cardId
        );
        setCards(updateCards);
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
                                onChange={(e) => setCardNumber(e.target.value)}
                                />

                                <div className="payment-form-row">
                                    <input 
                                    type="text"
                                    placeholder="MM/AA"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    />

                                    <input 
                                    type="text"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
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
                        <div key={card.id} className="saved-card">
                            <div className="saved-card-header">
                                <h3>
                                    {card.type.toUpperCase()}
                                </h3>
                                <span>
                                    **** {card.lastDigits}
                                </span>
                            </div>
                            <div className="saved-card-info">
                                <p>{card.holder}</p>
                                <small>
                                    Expira {card.expiry}
                                </small>
                               
                            </div>
                             {
                                card.isDefault && (
                                    <div className="default-card-container">
                                <div className="default-card-badge">
                                    ★ Método principal
                                    </div>
                                    </div>
                                )
                                }
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
                                <button onClick={() => handleEditCard(card)}
                                    >
                                    Editar
                                </button>
                                <button className="delete-btn" onClick={() => 
                                    handleDeleteCard(card.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                    )
                }
            </div>
        </main>
    );
}

export default PaymentMethods;