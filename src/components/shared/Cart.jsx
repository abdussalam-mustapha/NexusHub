import { useCart } from '../../contexts/CartContext'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import './Cart.css'

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isCartOpen,
    toggleCart
  } = useCart()

  if (!isCartOpen) return null

  const handleCheckout = () => {
    alert('Proceeding to checkout...')
    // Here you would implement actual checkout logic
  }

  return (
    <div className="cart-overlay" onClick={toggleCart}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag className="cart-icon" />
            <h2>Shopping Cart ({getCartItemCount()})</h2>
          </div>
          <button className="close-cart-btn" onClick={toggleCart}>
            <X className="close-icon" />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      {(typeof item.image === 'string' && !item.image.includes('/assets/')) ? (
                        <div className="cart-image-placeholder">{item.image}</div>
                      ) : (
                        <img src={item.image} alt={item.name} />
                      )}
                    </div>
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-brand">{item.brand}</p>
                      <div className="cart-item-price">${item.price}</div>
                    </div>

                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="quantity-icon" />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="quantity-icon" />
                        </button>
                      </div>
                      
                      <button 
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="remove-icon" />
                      </button>
                    </div>

                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span className="total-label">Total: </span>
                    <span className="total-amount">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
