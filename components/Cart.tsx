import React from 'react';
import { X, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[80] shadow-2xl transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-sky-500" />
              <h2 className="text-xl font-black uppercase tracking-widest font-syne">Tu Cesta</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                <ShoppingBag className="w-16 h-16" />
                <p className="font-bold text-lg">
                  Tu cesta está vacía.
                  <br />
                  ¡Añade algo que flipe!
                </p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex space-x-4 animate-in fade-in duration-300">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        #{item.number} {item.name}
                      </h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brand}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-gray-100 px-3 py-1 rounded-full">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-lg font-bold hover:text-sky-600 transition-colors"
                          aria-label="Restar cantidad"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-lg font-bold hover:text-sky-600 transition-colors"
                          aria-label="Sumar cantidad"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-sky-600">
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center text-xl font-black">
                <span className="uppercase tracking-widest font-syne">Total</span>
                <span className="text-sky-600">{subtotal.toFixed(2)}€</span>
              </div>

              <p className="text-[10px] text-gray-500 text-center font-bold uppercase tracking-widest">
                Envío desde San Martín de la Vega
              </p>

              <button className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-sky-600 hover:scale-[1.02] transition-all duration-300 shadow-xl group">
                <CreditCard className="w-5 h-5 group-hover:animate-bounce" />
                <span>Pagar con Bizum</span>
              </button>

              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#00AAFF] flex items-center justify-center">
                  <span className="text-white text-[10px] font-black italic">B</span>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase">Bizum seguro</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
