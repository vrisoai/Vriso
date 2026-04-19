'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import './Navbar.css';

import vrisoLogo from '@/app/assets/Invisigent.png';

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
            aria-label="Invisigent home"
          >
            <Image
              src={vrisoLogo}
              alt="Invisigent"
              className="siteLogoImg"
              height={90}
              width={320}
              priority
              sizes="(max-width: 480px) 38vw, (max-width: 1024px) 30vw, 220px"
            />
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
                <Link href="/" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/insights" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/interactive-demo" className="primaryNavLink" onClick={() => setOpenState(false)}>
                  Interactive Demo
                </Link>
              </li>
              <li className="primaryNavCta">
                <Link
                  href="/contact"
                  className="navCta"
                  aria-label="Open contact form to talk with Invisigent"
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
              aria-label="Open contact form to talk with Invisigent"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
