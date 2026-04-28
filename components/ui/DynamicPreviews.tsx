import type { ButtonHTMLAttributes, ReactNode, PropsWithChildren } from "react";

type BaseProps = {
  className?: string;
  title?: string;
};

export function CssVarBox({ cssVar, fgVar, className = "", title }: { cssVar: string; fgVar?: string } & BaseProps) {
  return (
    <div className={className} style={{ backgroundColor: `var(${cssVar})` }} title={title}>
      {fgVar ? (
        <span className="text-xs select-none opacity-70" style={{ color: `var(${fgVar})` }}>
          Aa
        </span>
      ) : null}
    </div>
  );
}

export function HexButton({ hex, className = "", title, children, ...props }: { hex: string; children: ReactNode } & BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={className} style={{ backgroundColor: hex }} title={title}>
      {children}
    </button>
  );
}

export function FontFamilyText({ fontFamily, fontWeight, className = "", children }: { fontFamily: string; fontWeight?: string; children: ReactNode } & BaseProps) {
  return (
    <p className={className} style={{ fontFamily, fontWeight }}>
      {children}
    </p>
  );
}

export function RadiusBox({ value, className = "", title, children }: PropsWithChildren<{ value: string } & BaseProps>) {
  return <div className={className} style={{ borderRadius: value }} title={title}>{children}</div>;
}

export function ShadowBox({ cssVar, className = "", title, children }: PropsWithChildren<{ cssVar: string } & BaseProps>) {
  return <div className={className} style={{ boxShadow: `var(${cssVar})` }} title={title}>{children}</div>;
}

export function ContrastDot({ color, className = "", title }: { color: string } & BaseProps) {
  return <div className={className} style={{ backgroundColor: color }} title={title} />;
}
