import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import legal from '@/data/legal.json';

type LegalType = 'privacy' | 'offer' | 'returns';

const LegalPage = ({ type }: { type: LegalType }) => {
  const doc = legal[type];
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Helmet>
        <title>{doc.title} — Полимер-проект</title>
        <meta name="description" content={doc.description} />
        <link rel="canonical" href={`https://proekt-polimer.ru/${type}`} />
      </Helmet>
      <h2 className="text-2xl sm:text-3xl font-bold">{doc.title}</h2>
      <Card className="p-4 sm:p-8 space-y-6">
        {doc.sections.map(section => (
          <section key={section.h} className="space-y-2">
            <h3 className="text-lg font-semibold">{section.h}</h3>
            {section.p.map((text, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{text}</p>
            ))}
          </section>
        ))}
      </Card>
    </div>
  );
};

export default LegalPage;
