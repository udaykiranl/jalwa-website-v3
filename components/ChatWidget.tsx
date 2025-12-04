
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Mic, MicOff, Sparkles } from 'lucide-react';
import { CONTACT_INFO, MENU_ITEMS } from '../constants';

// --- TYPES ---
interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

type Sender = "user" | "bot";

type Message = {
  id: number;
  from: Sender;
  text: string;
};

type KnowledgeItem = {
  id: string;
  category: string;
  triggers: string[];
  keywords?: string[];
  answer: string;
  followUps?: string[];
};

// --- STATIC KNOWLEDGE BASE (General Info) ---
const STATIC_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: "greeting",
    category: "general",
    triggers: ["hi", "hello", "hey", "namaste", "namaskar", "greetings", "start"],
    answer:
      "Namaste! Welcome to Jalwa: Modern Indian Dining. I can help with menu descriptions, dietary recommendations (Vegan, GF), catering info, and reservations. What are you craving today?",
    followUps: [
      "Suggest Chef Specials",
      "Show vegetarian starters",
      "Do you have vegan options?",
    ],
  },
  {
    id: "location",
    category: "info",
    triggers: ["where are you", "location", "address", "how to find jalwa"],
    answer:
      `Jalwa is located in Montclair, New Jersey at ${CONTACT_INFO.address}. We’re in the Glenridge Ave area of downtown Montclair, close to the train station.`,
    followUps: ["Do you have parking?", "What are your hours?"],
  },
  {
    id: "hours",
    category: "info",
    triggers: [
      "timing",
      "hours",
      "open today",
      "when do you open",
      "when do you close",
      "lunch time",
      "dinner time",
      "opening hours",
    ],
    answer:
      `We are open:\n${CONTACT_INFO.hours.join('\n')}\nHoliday or special-event hours can change, so checking Google is also a good idea!`,
    followUps: ["Do I need a reservation?", "Can I order online?"],
  },
  {
    id: "parking",
    category: "info",
    triggers: ["parking", "car park", "where can i park", "park my car"],
    answer:
      "For parking, guests usually use the nearby public parking decks (Midtown/Crescent Deck) and street parking around Glenridge Ave. Weekends can get busy, so arriving a little early is recommended.",
  },
  {
    id: "byob",
    category: "policies",
    triggers: ["byob", "bring my own alcohol", "bring wine", "bring beer", "alcohol", "drinks"],
    answer:
      "Yes! We are a BYOB establishment. You are welcome to bring your own wine or beer to enjoy with your meal. We offer soft drinks, lassi, and mocktails.",
  },
  {
    id: "halal",
    category: "dietary",
    triggers: ["halal", "is your meat halal", "do you serve halal"],
    answer:
      "Yes, our Chicken, Lamb, and Goat meats are 100% Halal.",
  },
  {
    id: "reservation",
    category: "booking",
    triggers: [
      "reservation",
      "book a table",
      "table booking",
      "how to reserve",
      "do i need reservation",
    ],
    answer:
      "You can book a table online by clicking the 'Book a Table' button in the menu or calling us directly. Weekends and peak dinner times get busy, so booking ahead is recommended.",
    followUps: ["What are good dishes to try?", "Do you do large parties?"],
  },
  {
    id: "online_order",
    category: "ordering",
    triggers: [
      "order online",
      "online order",
      "takeout",
      "pickup",
      "delivery",
      "do you deliver",
      "doordash",
      "uber eats",
      "grubhub",
    ],
    answer:
      "Yes, you can order for pickup and delivery directly through our website (click 'Order Online') for the best prices! We are also available on major delivery platforms.",
    followUps: ["Suggest some vegetarian dishes", "Show chicken specialties"],
  },
  {
    id: "catering",
    category: "catering",
    triggers: [
      "catering",
      "party trays",
      "events",
      "large order",
      "corporate lunch",
      "wedding",
      "birthday",
      "navratri",
      "garba",
    ],
    answer:
      "Yes, Jalwa specializes in catering and party trays for all occasions! We offer customizable menus including live stations. Check our 'Trays' or 'Catering' pages for details, or call us for a quote.",
    followUps: ["Popular catering items", "Do you have vegan options?"],
  },
  {
    id: "spice_level",
    category: "menu",
    triggers: [
      "spicy",
      "too spicy",
      "how spicy",
      "mild",
      "medium",
      "less spicy",
      "not spicy",
    ],
    answer:
      "We customize spice levels! You can request Mild, Medium, Hot, or 'Indian Hot'. If you prefer very mild, let us know and we'll guide you to creamy dishes like Korma or Butter Chicken.",
  },
  {
    id: "contact",
    category: "info",
    triggers: ["phone", "contact", "call you", "whats your number", "email"],
    answer:
      `You can reach us at ${CONTACT_INFO.phone} or email ${CONTACT_INFO.email}.`,
  },
  {
    id: "thanks",
    category: "smalltalk",
    triggers: ["thank you", "thanks", "great", "awesome", "perfect"],
    answer:
      "You’re most welcome! 🙏 Let me know if you need help picking a dessert or beverage to complete your meal.",
    followUps: [
      "What are your desserts?",
      "Do you have lassi?",
    ],
  },
];

// --- DYNAMIC CONTENT GENERATION ---

// 1. Generate Knowledge for each specific Menu Item
const MENU_ITEM_KNOWLEDGE: KnowledgeItem[] = MENU_ITEMS.map(item => ({
  id: `item_${item.id}`,
  category: 'menu_item',
  triggers: [
    item.name.toLowerCase(),
    `what is ${item.name.toLowerCase()}`,
    `describe ${item.name.toLowerCase()}`,
    `${item.name.toLowerCase()} ingredients`,
    `${item.name.toLowerCase()} price`
  ],
  keywords: item.name.toLowerCase().split(' '),
  answer: `**${item.name}** (${item.price})\n${item.description}\n\n` + 
          `${item.isVegetarian ? '🌿 Vegetarian' : ''} ` +
          `${item.isVegan ? '🌱 Vegan' : ''} ` +
          `${item.isGlutenFree ? '🌾 Gluten-Free' : ''} ` +
          `${item.isChefSpecial ? '👨‍🍳 Chef Special' : ''}`,
  followUps: ["Add to order", "Show more options"]
}));

// 2. Generate Lists for Dietary Preferences
const glutenFreeList = MENU_ITEMS.filter(i => i.isGlutenFree).map(i => i.name).slice(0, 8).join(', ') + "... and more!";
const GF_KNOWLEDGE: KnowledgeItem = {
  id: 'gluten_free_list',
  category: 'dietary',
  triggers: ['gluten free', 'gluten-free', 'gf options', 'wheat free', 'celiac'],
  answer: `We have excellent Gluten-Free options including:\n${glutenFreeList}.\n\n(Please always inform our staff of severe allergies).`,
  followUps: ['Show Vegan options', 'Suggest Chef Specials']
};

const veganList = MENU_ITEMS.filter(i => i.isVegan).map(i => i.name).slice(0, 8).join(', ') + "...";
const VEGAN_KNOWLEDGE: KnowledgeItem = {
  id: 'vegan_list',
  category: 'dietary',
  triggers: ['vegan', 'plant based', 'dairy free options', 'no dairy'],
  answer: `Our Vegan favorites include:\n${veganList}.\nMany other vegetarian curries can also be made vegan upon request!`,
  followUps: ['Show Gluten Free options', 'Show Vegetarian Appetizers']
};

const chefSpecialsList = MENU_ITEMS.filter(i => i.isChefSpecial).map(i => i.name).join(', ');
const SPECIALS_KNOWLEDGE: KnowledgeItem = {
  id: 'chef_specials',
  category: 'menu_highlight',
  triggers: ['chef special', 'recommendations', 'what is good', 'best dishes', 'signature', 'must try'],
  answer: `Here are Chef Mayur's signature recommendations:\n${chefSpecialsList}.\n\nThese dishes showcase the best of our modern Indian culinary style!`,
  followUps: ['Book a table', 'Order Online']
};

// 3. Combine Everything
const KNOWLEDGE_BASE: KnowledgeItem[] = [
  ...STATIC_KNOWLEDGE_BASE,
  ...MENU_ITEM_KNOWLEDGE,
  GF_KNOWLEDGE,
  VEGAN_KNOWLEDGE,
  SPECIALS_KNOWLEDGE
];

const DEFAULT_FALLBACK: KnowledgeItem = {
  id: "fallback",
  category: "fallback",
  triggers: [],
  answer:
    "I’m not fully sure about that yet 🤔. Please call the restaurant directly for specific inquiries. I can help with specific menu item descriptions, hours, reservations, or catering info!",
  followUps: ["View Menu", "Call Restaurant", "Opening Hours"]
};

const SUGGESTED_QUESTIONS = [
  "Suggest Chef Specials",
  "Do you have vegan options?",
  "What are your hours?",
  "Tell me about Catering",
];

// --- LOGIC ENGINE ---
function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function findBestKnowledgeMatch(input: string): KnowledgeItem | null {
  const normalized = normalize(input);
  let best: { item: KnowledgeItem | null; score: number } = { item: null, score: 0 };

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    // Check triggers
    for (const trigger of item.triggers) {
      if (normalized.includes(trigger.toLowerCase())) {
        // Boost score for exact matches or longer phrases
        score += trigger.split(" ").length * 3; 
      }
    }
    // Check keywords (optional extra boosting)
    if (item.keywords) {
      for (const kw of item.keywords) {
        if (normalized.includes(kw.toLowerCase())) {
          score += 1;
        }
      }
    }

    if (score > best.score) {
      best = { item, score };
    }
  }

  return best.score > 0 ? best.item : null;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const INITIAL_MESSAGE: Message = {
    id: 1,
    from: 'bot',
    text: "Namaste! I'm the Jalwa Assistant. Ask me about specific dishes, ingredients, dietary options, or catering!",
  };

  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pendingFollowUps, setPendingFollowUps] = useState<string[]>(SUGGESTED_QUESTIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const processMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text,
      from: 'user',
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setPendingFollowUps([]); // Clear old suggestions while thinking

    // Simulate AI processing delay
    setTimeout(() => {
      const match = findBestKnowledgeMatch(text);
      const item = match ?? DEFAULT_FALLBACK;
      
      const botMsg: Message = {
        id: Date.now() + 1,
        text: item.answer,
        from: 'bot',
      };
      
      setMessages(prev => [...prev, botMsg]);
      setPendingFollowUps(item.followUps ?? SUGGESTED_QUESTIONS);
      setIsTyping(false);
    }, 600);
  };

  const handleSendClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    processMessage(inputValue);
    setInputValue('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    processMessage(suggestion);
  };

  const handleToggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      // Reset chat state after close animation (300ms)
      setTimeout(() => {
        setMessages([INITIAL_MESSAGE]);
        setPendingFollowUps(SUGGESTED_QUESTIONS);
        setInputValue('');
        setIsTyping(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleVoiceInput = () => {
    const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
    const SpeechRecognitionAPI = SpeechRecognition || webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert("Your browser does not support voice input. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInputValue(transcript);
        processMessage(transcript);
        setInputValue('');
      }
    };

    recognition.start();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 group ${
          isOpen ? 'bg-neutral-800 text-white rotate-90' : 'bg-jalwa-gold text-black hover:scale-110'
        }`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] md:h-[600px] bg-neutral-900 border border-jalwa-gold/40 rounded-2xl shadow-2xl overflow-hidden z-50 transition-all duration-300 origin-bottom-right flex flex-col ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-neutral-950 p-4 flex items-center gap-3 border-b border-neutral-800">
          <div className="w-10 h-10 rounded-full bg-jalwa-gold flex items-center justify-center text-black relative">
            <Bot size={20} />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-neutral-900 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-white tracking-wide">Jalwa Assistant</h3>
            <p className="text-xs text-gray-400">Online • Menu & FAQs</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-neutral-900 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.from === 'user'
                    ? 'bg-jalwa-gold text-black rounded-br-sm'
                    : 'bg-neutral-800 text-gray-200 border border-neutral-700 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-neutral-800 p-3 rounded-2xl rounded-bl-none border border-neutral-700">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-0"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {pendingFollowUps.length > 0 && (
          <div className="p-3 bg-neutral-900/90 border-t border-neutral-800 flex gap-2 overflow-x-auto no-scrollbar">
            {pendingFollowUps.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-jalwa-gold/40 text-gray-300 hover:bg-jalwa-gold hover:text-black transition-colors bg-neutral-800"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800">
          <form
            onSubmit={handleSendClick}
            className="flex gap-2 items-center"
          >
             <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50' 
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800'
              }`}
              title="Voice Input"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask about menu..."}
              className="flex-grow bg-neutral-900 border border-neutral-700 text-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-jalwa-gold transition-colors placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() && !isListening}
              className="bg-jalwa-gold text-black p-2.5 rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
