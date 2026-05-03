'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm Invisigent's AI assistant. Ask me anything about our services, enterprise AI infrastructure, or book a consultation with the team.",
};

/* ── Markdown renderer ───────────────────────────────────────────────────── */
function renderMarkdown(text: string): React.ReactNode[] {
  // Split into blocks by double newline (paragraphs) or single newline
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Numbered list item: "1. ", "2. " etc.
    if (/^\d+\.\s/.test(line)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(
          <li key={i} style={{ marginBottom: '4px' }}>{inlineFormat(lines[i].replace(/^\d+\.\s/, ''))}</li>
        );
        i++;
      }
      nodes.push(<ol key={`ol-${i}`} style={{ paddingLeft: '18px', margin: '6px 0' }}>{listItems}</ol>);
      continue;
    }

    // Bullet list item: "- " or "* "
    if (/^[-*]\s/.test(line)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        listItems.push(
          <li key={i} style={{ marginBottom: '4px' }}>{inlineFormat(lines[i].replace(/^[-*]\s/, ''))}</li>
        );
        i++;
      }
      nodes.push(<ul key={`ul-${i}`} style={{ paddingLeft: '18px', margin: '6px 0' }}>{listItems}</ul>);
      continue;
    }

    // Empty line → small gap
    if (line.trim() === '') {
      nodes.push(<br key={`br-${i}`} />);
      i++;
      continue;
    }

    // Regular paragraph line
    nodes.push(<p key={i} style={{ margin: '0 0 4px' }}>{inlineFormat(line)}</p>);
    i++;
  }

  return nodes;
}

function inlineFormat(text: string): React.ReactNode[] {
  // Handle **bold** inline
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) =>
    /^\*\*[^*]+\*\*$/.test(part)
      ? <strong key={idx}>{part.slice(2, -2)}</strong>
      : part
  );
}

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
  const [booked, setBooked]     = useState(false);

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
    if (!text || loading || booked) return;

    const userMsg: Message = { role: 'user', content: text };
    setInput('');
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Send the full conversation history so the API has context (stateless)
      const history = messages.filter(m => m !== INITIAL_MESSAGE);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json() as { reply: string; booked?: boolean };
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      if (data.booked) setBooked(true);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong. Please try again or visit our contact page.',
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, booked, messages]);

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
              {msg.role === 'assistant'
                ? <div style={{ lineHeight: '1.55' }}>{renderMarkdown(msg.content)}</div>
                : <p style={{ margin: 0 }}>{msg.content}</p>
              }
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
        {booked ? (
          <div className="chatbot-input-row" style={{ justifyContent: 'center', padding: '12px 16px' }}>
            <p style={{ fontSize: '12px', color: 'var(--color-accent, #6ee7b7)', margin: 0, textAlign: 'center' }}>
              ✓ Booking submitted — we&apos;ll be in touch within 24 hours
            </p>
          </div>
        ) : (
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
        )}
      </div>

      {/* ── WhatsApp button ─────────────────────────────────────────────── */}
      <a
        href="https://wa.me/919982346893?text=Hey%2C%20i%20need%20help%20with%20tech%20solution.%20Let's%20talk!"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-trigger"
        aria-label="Chat with us on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>

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
