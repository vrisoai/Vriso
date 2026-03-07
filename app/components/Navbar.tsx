'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import './Navbar.css';

export function Navbar() {
  const [open, setOpen] = useState(false);

  const setOpenState = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
  }, []);

  const toggle = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenState(false);
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [setOpenState]);

  return (
    <header
      className={`siteHeader ${open ? 'navOpen' : ''}`}
      aria-label="Site header"
    >
      <div
        className="navBackdrop"
        aria-hidden
        onClick={() => setOpenState(false)}
      />
      <div className="siteHeaderInner">
        {/* Left: Logo (clickable, goes to home) */}
        <div className="navLeft">
          <Link
            href="/"
            className="siteLogo"
            aria-label="VRISO home"
          >
            <span className="siteLogoMark" aria-hidden />
            <span>VRISO</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="navToggle"
          aria-label="Toggle primary navigation"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={toggle}
        >
          <span className="navToggleBar" aria-hidden />
          <span className="navToggleBar" aria-hidden />
          <span className="navToggleBar" aria-hidden />
        </button>

        <div className="navMain">
          {/* Center: Primary navigation */}
          <nav className="navCenter" id="primary-nav" aria-label="Primary navigation">
            <ul className="primaryNavList">
              <li>
                <Link href="/services" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/insights" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  About
                </Link>
              </li>
              <li className="primaryNavCta">
                <Link
                  href="/contact"
                  className="navCta"
                  aria-label="Open contact form to talk with VRISO"
                  onClick={() => setOpenState(false)}
                >
                  Let&apos;s Talk
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right: CTA button */}
          <div className="navRight">
            <Link
              href="/contact"
              className="navCta"
              aria-label="Open contact form to talk with VRISO"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
