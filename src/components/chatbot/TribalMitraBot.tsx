'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Minimize2,
  Maximize2,
  Languages,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Bot,
  Search,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import {
  ALL_INDIAN_LANGUAGES,
  SupportedLanguage,
  GREETINGS_BY_LANG,
  POPULAR_QUESTIONS_BY_LANG,
  ActionLink
} from '@/lib/chatbotKnowledge';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text?: string;
  title?: string;
  body?: string[];
  tip?: string;
  actionLinks?: ActionLink[];
  timestamp: string;
}

export default function TribalMitraBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(ALL_INDIAN_LANGUAGES[0]); // Default Hindi
  const [langSearch, setLangSearch] = useState('');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Welcome Message
  useEffect(() => {
    const greeting = GREETINGS_BY_LANG[selectedLang.code] || GREETINGS_BY_LANG['hi'];
    const initialMsg: Message = {
      id: 'welcome-1',
      sender: 'bot',
      title: `${selectedLang.nativeName} - जनजातीय साथी (TribalMitra AI)`,
      body: [
        greeting.welcome,
        'मैं TribalSetu पोर्टल का सम्पूर्ण ज्ञान रखता हूँ। आप NFST/NOS छात्रवृत्ति, आवेदन प्रक्रिया, दस्तावेज़ सत्यापन, कमी (Deficiency), स्टाइपेंड भुगतान अथवा मेरिट गणना से जुड़ा कोई भी प्रश्न पूछ सकते हैं।'
      ],
      tip: 'भारत की सभी 32+ भाषाओं में सहायता उपलब्ध है। माइक बटन दबाकर बोलें या नीचे सुझावों पर क्लिक करें।',
      actionLinks: [
        { label: 'नई अर्जी भरें (Apply)', href: '/student/apply' },
        { label: 'छात्र लॉगिन (Login)', href: '/student/login' },
        { label: 'कमी समाधान (Deficiency)', href: '/student/deficiencies' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMsg]);
  }, [selectedLang]);

  // Scroll to bottom on message update
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLang.speechCode || 'hi-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedLang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = selectedLang.speechCode || 'hi-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang.speechCode || 'hi-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend.trim(),
          langCode: selectedLang.code
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          title: json.data.title,
          body: json.data.body,
          tip: json.data.tip,
          actionLinks: json.data.actionLinks,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        title: 'संपर्क त्रुटि / Error',
        body: ['क्षमा करें, संदेश प्रोसेस करने में तकनीकी समस्या आई। कृपया पुनः प्रयास करें या हेल्पलाइन 1800-11-7777 पर कॉल करें।'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const greeting = GREETINGS_BY_LANG[selectedLang.code] || GREETINGS_BY_LANG['hi'];
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        title: `${selectedLang.nativeName} - जनजातीय साथी (TribalMitra AI)`,
        body: [greeting.welcome],
        tip: 'वार्तालाप रीसेट कर दिया गया है। नया प्रश्न पूछें।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const filteredLanguages = ALL_INDIAN_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.region.toLowerCase().includes(langSearch.toLowerCase())
  );

  const popularQuestions =
    POPULAR_QUESTIONS_BY_LANG[selectedLang.code] || POPULAR_QUESTIONS_BY_LANG['hi'];
  const currentGreeting = GREETINGS_BY_LANG[selectedLang.code] || GREETINGS_BY_LANG['hi'];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <div className="hidden sm:flex items-center bg-[#0a2540] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl border border-emerald-500/30 backdrop-blur-md animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
            <span className="text-emerald-300 font-bold mr-1">जनजातीय साथी</span> • 32+ भाषाएँ
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
              setUnreadCount(0);
            }}
            aria-label="Open TribalMitra AI Assistant"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-700 to-[#0a2540] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-400"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
            <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-[#0a2540] font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-white shadow">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-300 font-sans ${
            isMinimized ? 'h-16' : 'h-[640px] max-h-[90vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#061c33] via-[#0a2540] to-emerald-900 text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-emerald-500/40 select-none">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-2 border-amber-400 shadow">
                  <span className="text-base font-bold text-[#0a2540]">🏛️</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a2540] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    जनजातीय साथी <span className="text-amber-300 text-xs font-normal">| TribalMitra AI</span>
                  </h3>
                </div>
                <p className="text-[10px] text-emerald-200 flex items-center space-x-1">
                  <span>MoTA 24x7 32-Language Portal Assistant</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-300">
              <button
                onClick={handleClearChat}
                title="Reset Conversation"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Maximize' : 'Minimize'}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 hover:text-white hover:bg-red-500/30 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Language Selector Bar (All 32 Indian Languages) */}
              <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 relative flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-slate-700 font-medium">
                  <Languages className="w-3.5 h-3.5 text-emerald-700" />
                  <span>सक्रिय भाषा (Active Language):</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center space-x-1.5 bg-white border border-slate-300 hover:border-emerald-600 px-2.5 py-1 rounded-md text-slate-900 font-bold text-xs shadow-sm"
                  >
                    <span>{selectedLang.nativeName}</span>
                    <span className="text-[10px] text-slate-500">({selectedLang.name})</span>
                    <span className="text-[10px]">▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isLangDropdownOpen && (
                    <div className="absolute right-0 top-8 z-50 w-72 max-h-80 bg-white border border-slate-300 rounded-xl shadow-2xl p-2 flex flex-col">
                      <div className="relative mb-2">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search 32 languages..."
                          value={langSearch}
                          onChange={(e) => setLangSearch(e.target.value)}
                          className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      <div className="overflow-y-auto flex-1 divide-y divide-slate-100 pr-1 text-xs">
                        {filteredLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLang(lang);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between transition ${
                              selectedLang.code === lang.code
                                ? 'bg-emerald-50 text-emerald-900 font-bold'
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{lang.nativeName}</div>
                              <div className="text-[10px] text-slate-500">{lang.name} • {lang.region}</div>
                            </div>
                            {selectedLang.code === lang.code && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0a2540] text-white rounded-br-xs'
                          : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                      }`}
                    >
                      {/* Bot Header */}
                      {msg.sender === 'bot' && msg.title && (
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                          <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>{msg.title}</span>
                          </div>
                          <button
                            onClick={() => {
                              const fullText = `${msg.title}. ${msg.body ? msg.body.join(' ') : ''}`;
                              speakText(fullText);
                            }}
                            title="Listen to this response"
                            className="text-slate-400 hover:text-emerald-700 p-0.5"
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}

                      {/* User Simple Text */}
                      {msg.sender === 'user' && <p className="text-white font-medium">{msg.text}</p>}

                      {/* Bot Body Paragraphs */}
                      {msg.body && (
                        <div className="space-y-1.5 text-slate-700">
                          {msg.body.map((p, idx) => (
                            <p key={idx} className="whitespace-pre-line">
                              {p}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Tip Box */}
                      {msg.tip && (
                        <div className="mt-2.5 p-2 bg-amber-50/90 border-l-2 border-amber-500 rounded-r text-[11px] text-amber-900 font-medium">
                          💡 <strong>सूचना:</strong> {msg.tip}
                        </div>
                      )}

                      {/* Action Links Buttons */}
                      {msg.actionLinks && msg.actionLinks.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.actionLinks.map((action, i) => (
                            <Link
                              key={i}
                              href={action.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-md border border-emerald-300 text-[11px] transition shadow-xs"
                            >
                              <span>{action.label}</span>
                              <ExternalLink className="w-3 h-3 text-emerald-600" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center space-x-2 p-2.5 bg-white border border-slate-200 rounded-xl w-32 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] text-slate-500 font-medium ml-1">AI सोच रहा है...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Topics Pills */}
              <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[10px] text-slate-500 font-bold shrink-0 flex items-center">
                  <HelpCircle className="w-3 h-3 mr-1 text-emerald-700" />
                  सुझाव:
                </span>
                {popularQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 px-2 py-0.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-800 rounded-full text-[10px] font-medium transition"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="p-2.5 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center space-x-1.5"
                >
                  <button
                    type="button"
                    onClick={toggleListening}
                    title={isListening ? 'Stop Listening' : 'Speak in your language'}
                    className={`p-2 rounded-xl transition ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder={currentGreeting.placeholder}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition placeholder:text-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isLoading}
                    className="p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-[#0a2540] text-white hover:opacity-95 disabled:opacity-40 transition shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1 px-1">
                  <span>MoTA AI Helpline • 1800-11-7777</span>
                  <span className="text-emerald-700 font-semibold">32 भारतीय भाषाएँ समर्थित</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
