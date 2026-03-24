import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: '¡Hola! Soy María ✨ Cuéntame qué tipo de perfume te gusta y te ayudo a encontrar una equivalencia que huela brutal.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSend = async () => {
    const userMsg = input.trim();

    if (!userMsg || isLoading) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: userMsg }
    ];

    setInput('');
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const history = updatedMessages.map((message) => ({
        role: message.role,
        text: message.text
      }));

      const response = await getChatResponse(userMsg, history);

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text:
            response ||
            'Ahora mismo no he podido responderte bien. Escríbeme qué aromas te gustan y lo intentamos otra vez.'
        }
      ]);
    } catch (error) {
      console.error('Error en el chat:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text:
            'Ups, he tenido un pequeño fallo. Prueba otra vez o dime si buscas algo dulce, fresco, intenso o elegante.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-sky-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>

              <div>
                <p className="font-bold text-sm">María te ayuda</p>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">
                  En línea • Huele Que Flipas
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-6 ${
                    message.role === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-lg'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                  <span className="text-xs text-gray-500 font-medium">
                    Buscando tu aroma ideal...
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              placeholder="Ej: quiero uno dulce que dure mucho"
              className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-sky-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center space-x-2 group"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap text-sm">
            ¿Dudas? Habla con María
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
