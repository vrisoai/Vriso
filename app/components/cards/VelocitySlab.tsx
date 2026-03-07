'use client';

export function VelocitySlab() {
  return (
    <div
      className="rounded-md border border-border backdrop-blur-[12px]"
      style={{
        width: 180,
        height: 110,
        paddingLeft: 20,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        background: 'rgba(31, 31, 31, 0.80)',
        borderTop: '1px solid #3B5BDB',
      }}
    >
      <p
        className="uppercase text-[#6B7280]"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: '0.12em',
          margin: 0,
          marginBottom: 6,
        }}
      >
        DEPLOYMENT_VELOCITY
      </p>
      <p
        className="text-[#E5E7EB]"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 13,
          fontWeight: 700,
          margin: 0,
          marginBottom: 4,
        }}
      >
        PILOT_TO_LIVE: 30_DAYS
      </p>
      <p
        className="text-[#4B5563]"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 9,
          fontWeight: 400,
          margin: 0,
        }}
      >
        LATENCY_TARGET: &lt;200ms · 99.9%_RESILIENCE
      </p>
    </div>
  );
}
