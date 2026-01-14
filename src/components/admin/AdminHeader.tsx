import { Settings, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminHeader() {
  return (
    <header className="admin-header py-4 shadow-elevated">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Painel Admin</h1>
            <p className="text-xs text-primary-foreground/70">Gerenciar Produtos</p>
          </div>
        </div>
        
        <Link 
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Voltar ao Site</span>
        </Link>
      </div>
    </header>
  );
}
