'use client';

/**
 * ChatbotWidget — floating chat button + slide-up panel, site-wide.
 * Powered by n8n webhook → /api/chat.
 * Session ID is generated once per browser session so n8n's AI Agent
 * memory node can maintain conversation context across messages.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/** Stable session ID — persists for the browser tab lifetime */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  const key = 'invisigent_chat_session';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm Invisigent's AI assistant. Ask me anything about enterprise AI infrastructure, our services, or how we can help your organization.",
};

/* ── Icons ───────────────────────────────────────────────────────────────── */
function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M16 2L2 7l5 3 3 5 6-13z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TypingDots() {
  return (
    <span className="chatbot-typing-dots" aria-label="Thinking">
      <span /><span /><span />
    </span>
  );
}

/* ── Component ───────────────────────────────────────────────────────────── */
export function ChatbotWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);

  const panelRef      = useRef<HTMLDivElement>(null);
  const bottomRef     = useRef<HTMLDivElement>(null);
  const inputRef      = useRef<HTMLInputElement>(null);
  const triggerRef    = useRef<HTMLButtonElement>(null);

  /* ── Panel open / close animation ───────────────────────────────────── */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      gsap.set(panel, { display: 'flex' });
      gsap.fromTo(panel,
        { opacity: 0, scale: 0.88, y: 18, transformOrigin: 'bottom right' },
        { opacity: 1, scale: 1,    y: 0,  duration: 0.38, ease: 'back.out(1.6)' }
      );
      setTimeout(() => inputRef.current?.focus(), 400);
    } else {
      gsap.to(panel, {
        opacity: 0, scale: 0.88, y: 18,
        duration: 0.22, ease: 'power2.in',
        onComplete: () => { gsap.set(panel, { display: 'none' }); },
      });
    }
  }, [open]);

  /* ── Trigger button pulse on mount ──────────────────────────────────── */
  useEffect(() => {
    const btn = triggerRef.current;
    if (!btn) return;
    gsap.fromTo(btn,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', delay: 1.2 }
    );
  }, []);

  /* ── Scroll to latest message ────────────────────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* ── Send message ────────────────────────────────────────────────────── */
  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // sessionId lets n8n's AI Agent memory node track this conversation
        body: JSON.stringify({ message: text, sessionId: getSessionId() }),
      });
      const data = await res.json() as { reply: string };
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong. Please try again or visit our contact page.',
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── Chat panel ─────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        className="chatbot-panel"
        role="dialog"
        aria-label="Invisigent AI assistant"
        aria-modal="true"
        style={{ display: 'none' }}
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-avatar" aria-hidden="true">
              <span>AI</span>
            </div>
            <div>
              <p className="chatbot-name">Invisigent AI</p>
              <p className="chatbot-status">
                <span className="chatbot-status-dot" aria-hidden="true" />
                Online
              </p>
            </div>
          </div>
          <button
            className="chatbot-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-bubble chatbot-bubble--${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="chatbot-bubble chatbot-bubble--assistant">
              <TypingDots />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input-row">
          <input
            ref={inputRef}
            className="chatbot-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about enterprise AI…"
            aria-label="Chat message"
            disabled={loading}
            maxLength={500}
          />
          <button
            className="chatbot-send-btn"
            onClick={send}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>

      {/* ── Trigger button ──────────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        className={`chatbot-trigger${open ? ' chatbot-trigger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
        style={{ opacity: 0 }} /* GSAP animates in */
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open && <span className="chatbot-trigger-pulse" aria-hidden="true" />}
      </button>
    </>
  );
}
