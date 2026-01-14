import { ShoppingCart, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
            <Utensils className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Sabor & Arte</h1>
            <p className="text-xs text-muted-foreground">Restaurante</p>
          </div>
        </Link>
        
        <button 
          onClick={onCartClick}
          className="relative p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Abrir carrinho"
        >
          <ShoppingCart className="w-6 h-6 text-secondary-foreground" />
          {cartItemCount > 0 && (
            <span className="badge-cart">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
