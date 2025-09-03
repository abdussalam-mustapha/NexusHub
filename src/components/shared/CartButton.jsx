import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

function CartButton() {
  const { getCartItemCount, toggleCart } = useCart()
  
  return (
    <button className="cart-btn" onClick={toggleCart}>
      <ShoppingCart className="cart-icon" />
      {getCartItemCount() > 0 && (
        <span className="cart-badge">{getCartItemCount()}</span>
      )}
    </button>
  )
}

export default CartButton
