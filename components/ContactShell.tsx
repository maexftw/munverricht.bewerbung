import React from 'react';
import { Mail, Phone, Terminal } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';

type Language = 'de' | 'en';

type ContactShellProps = {
  language: Language;
};

const ContactShell: React.FC<ContactShellProps> = ({ language }) => (
  <section id="contact-shell" className="scroll-mt-28 pb-20">
    <VStack gap={10}>
      <VStack gap={2} hAlign="center">
        <Text type="code" color="accent" display="block" justify="center" aria-hidden="true">
          // DIRECT_CONTACT
        </Text>
        <Heading level={2} justify="center" textWrap="balance">
          {language === 'de' ? 'Direkter Kontakt' : 'Direct Contact'}
        </Heading>
      </VStack>

      <Card className="mx-auto w-full max-w-3xl overflow-hidden" padding={0}>
        <HStack
          className="border-b border-[color:var(--color-border)] bg-[color:var(--color-background-muted)]"
          hAlign="between"
          vAlign="center"
          paddingInline={4}
          paddingBlock={2}
          aria-hidden="true"
        >
          <HStack gap={2} vAlign="center">
            <Terminal className="h-4 w-4 text-[color:var(--accent-color)]" />
            <Text type="code" color="secondary">CONTACT</Text>
          </HStack>
          <HStack gap={1}>
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-border-emphasized)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-border-emphasized)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent-color)] opacity-60" />
          </HStack>
        </HStack>

        <VStack gap={6} padding={6}>
          <Text type="body" color="secondary" display="block" textWrap="pretty">
            {language === 'de'
              ? 'Am einfachsten erreichst du mich direkt per E-Mail oder Telefon. Keine Formulare, keine Umwege.'
              : 'The easiest way to reach me is directly by email or phone. No forms, no detours.'}
          </Text>

          <Grid columns={{ minWidth: 240, max: 2, repeat: 'fit' }} gap={4}>
            <Card variant="muted" padding={4}>
              <VStack gap={2}>
                <HStack gap={2} vAlign="center">
                  <Mail className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <Text type="code" color="accent">E-Mail</Text>
                </HStack>
                <Link href="mailto:info@munverricht.org" isStandalone>info@munverricht.org</Link>
              </VStack>
            </Card>
            <Card variant="muted" padding={4}>
              <VStack gap={2}>
                <HStack gap={2} vAlign="center">
                  <Phone className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                  <Text type="code" color="accent">{language === 'de' ? 'Telefon' : 'Phone'}</Text>
                </HStack>
                <Link href="tel:+491633229892" isStandalone>+49 163 3229892</Link>
              </VStack>
            </Card>
          </Grid>

          <HStack gap={4} hAlign="between" vAlign="center" wrap="wrap" aria-hidden="true">
            <Text type="code" color="secondary">
              {language === 'de' ? 'DIREKTER KONTAKT // ANTWORTWEG: DIREKT' : 'DIRECT CONTACT // REPLY PATH: DIRECT'}
            </Text>
            <Text type="code" color="accent">MAXIMILIAN_UNVERRICHT // CONTACT</Text>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  </section>
);

export default ContactShell;