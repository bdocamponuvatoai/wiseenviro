interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
}

export function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow-line text-link">{children}</p>;
}

export function SectionHeading({ id, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className="text-h2 text-foreground mt-5 max-w-4xl uppercase">
        {title}
      </h2>
    </div>
  );
}
