'use client';

export function EconomicSlab() {
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
        borderTop: '1px solid #FBBF24',
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
        ECONOMIC_ARCHITECTURE
      </p>
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 13,
          fontWeight: 700,
          margin: 0,
          marginBottom: 4,
        }}
      >
        <span
          style={{
            color: '#FBBF24',
            textShadow: '0 0 12px rgba(251,191,36,0.25)',
          }}
        >
          4.2X
        </span>
        <span style={{ color: '#E5E7EB' }}>_YIELD (EST.)</span>
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
        MARGIN_PRESERVATION: ACTIVE · TOKEN_OPTIMIZATION: 60%
      </p>
    </div>
  );
}
