import React, { useMemo } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { CartItem } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const SHIPPING_COST = 1.5;

const WHATSAPP_NUMBER = "34640834686";
const BIZUM_PHONE = "34640834686";
const BIZUM_NAME = "Maria Antigua Garcia";

const Cart: React.FC<Props> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity
}) => {
  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const whatsappMessage = useMemo(() => {
    if (items.length === 0) return "";

    const now = new Date();
    const orderCode = `HQF-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate()
    ).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(
      now.getMinutes()
    ).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;

    const lines = items.map(
      (item) =>
        `• #${item.number} ${item.name} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)}€`
    );

    const text = `Hola, quiero comprar en Huele Que Flipas.

Pedido: ${orderCode}

Productos:
${lines.join("\n")}

Subtotal: ${subtotal.toFixed(2)}€
Envío: ${shipping.toFixed(2)}€
Total: ${total.toFixed(2)}€

Pagaré por Bizum a ${BIZUM_PHONE} (${BIZUM_NAME}).`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [items, subtotal, shipping, total]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-sky-600" />
            <h2 className="text-2xl font-black uppercase tracking-tighter font-syne">
              Tu cesta
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center px-6">
              <div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Tu cesta está vacía
                </p>
                <p className="text-sm text-gray-500">
                  Añade tu perfume y te preparamos el pedido.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border border-gray-100 rounded-2xl p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-gray-50"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black tracking-widest text-gray-400 mb-1">
                      #{item.number}
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">{item.size}</p>

                    <div className="flex items-center justify-between mt-3 gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="text-sm font-bold min-w-[16px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-sm font-black text-sky-600 whitespace-nowrap">
                        {(item.price * item.quantity).toFixed(2)}€
                      </p>

                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-6 py-5 bg-white">
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">{subtotal.toFixed(2)}€</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Envío</span>
              <span className="font-bold">{shipping.toFixed(2)}€</span>
            </div>

            <div className="flex justify-between text-lg pt-2 border-t border-gray-100">
              <span className="font-black uppercase">Total</span>
              <span className="font-black text-sky-600">{total.toFixed(2)}€</span>
            </div>
          </div>

          {items.length > 0 ? (
            <>
              <a
                href={whatsappMessage}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center py-4 rounded-2xl bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-sky-600 transition"
              >
                Enviar pedido por WhatsApp
              </a>

              <p className="text-[11px] text-center text-gray-400 mt-3 leading-5">
                Te llevamos a WhatsApp con el pedido completo. Después te confirmamos el pago por Bizum.
              </p>
            </>
          ) : (
            <button
              type="button"
              disabled
              className="w-full py-4 rounded-2xl bg-gray-100 text-gray-400 text-sm font-black uppercase tracking-widest"
            >
              Tu cesta está vacía
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Cart;
