import React from 'react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import ASCIIText from './ASCIIText';
import type { LegalLanguage } from './legalContent';

type LegalInfoProps = { language: LegalLanguage };

const LegalInfo: React.FC<LegalInfoProps> = ({ language }) => {
  const copy = language === 'de'
    ? {
        title: 'Impressum & Datenschutz',
        intro: 'Rechtliche Informationen zu diesem Angebot.',
        cards: [
          { kind: 'impressum', title: 'Impressum', body: 'Anbieter, Kontakt und rechtliche Angaben.', cta: 'Impressum' },
          { kind: 'datenschutz', title: 'Datenschutz', body: 'Informationen zur Datenverarbeitung auf dieser Website.', cta: 'Datenschutz' },
        ],
      }
    : {
        title: 'Legal Notice & Privacy',
        intro: 'Legal information for this website.',
        cards: [
          { kind: 'impressum', title: 'Legal notice', body: 'Provider details, contact information, and legal notice.', cta: 'Legal notice' },
          { kind: 'datenschutz', title: 'Privacy', body: 'Information about data processing on this website.', cta: 'Privacy' },
        ],
      };

  return (
    <section className="border-t border-[color:var(--border-subtle)] pt-12" aria-label={language === 'de' ? 'Rechtliche Informationen' : 'Legal information'}>
      <VStack gap={8}>
        <VStack gap={3}>
          <Text type="code" color="accent" display="block"><ASCIIText text="// LEGAL" /></Text>
          <Heading level={2}><ASCIIText text={copy.title} /></Heading>
          <Text type="supporting" color="secondary" display="block">{copy.intro}</Text>
        </VStack>
        <Grid columns={{ minWidth: 260, max: 2, repeat: 'fit' }} gap={6}>
          {copy.cards.map((card) => (
            <React.Fragment key={card.kind}>
              <Card padding={6}>
                <VStack gap={4}>
                  <Heading level={3}>{card.title}</Heading>
                  <Text type="supporting" color="secondary" display="block">{card.body}</Text>
                  <Link href={`/${card.kind}`} isStandalone>{card.cta}</Link>
                </VStack>
              </Card>
            </React.Fragment>
          ))}
        </Grid>
      </VStack>
    </section>
  );
};

export default LegalInfo;