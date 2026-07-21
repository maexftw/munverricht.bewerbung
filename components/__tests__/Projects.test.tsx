import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Projects from '../Projects';

const establishedTitles = [
  'RLC 1952',
  'KOST Sicherheitstechnik',
  'Kaffee Faensen Commerce',
  'Baker & Charlie',
  'VR Air Bridge Fix',
  'Aim Trainer',
  'STALKER 2 Re Voice',
];

const wipTitles = ['KOST Sicherheitstechnik Shop', 'Totti Vertical Agent'];

describe('Projects', () => {
  it('renders every established project plus the two verified WIP projects', () => {
    render(<Projects language="de" />);

    [...establishedTitles, ...wipTitles].forEach((title) =>
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument(),
    );
    expect(screen.getAllByText('Work in Progress')).toHaveLength(2);
  });

  it('keeps established cards on Problem, Lösung, Ergebnis and WIP cards on Problem, Ansatz, belegter Stand', () => {
    const { container } = render(<Projects language="de" />);

    expect(container.querySelectorAll('span').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Problem:')).toHaveLength(establishedTitles.length + wipTitles.length);
    expect(screen.getAllByText('Lösung:')).toHaveLength(establishedTitles.length);
    expect(screen.getAllByText('Ergebnis:')).toHaveLength(establishedTitles.length);
    expect(screen.getAllByText('Ansatz:')).toHaveLength(wipTitles.length);
    expect(screen.getAllByText('Belegter Stand:')).toHaveLength(wipTitles.length);
  });

  it('pins each WIP card to the verified commit preview and date', () => {
    render(<Projects language="de" />);

    const shopLink = screen.getByRole('link', { name: /KOST Sicherheitstechnik Shop.*WIP-Preview/i });
    const tottiLink = screen.getByRole('link', { name: /Totti Vertical Agent.*WIP-Preview/i });

    expect(shopLink).toHaveAttribute('href', 'https://c95787f1.kost-9h6.pages.dev/shop/');
    expect(tottiLink).toHaveAttribute('href', 'https://c95787f1.kost-9h6.pages.dev/shop/totti/');
    expect(screen.getAllByText(/Stand 20\.07\.2026 · KOST-Repository · Commit 7e52176/)).toHaveLength(2);
  });

  it('keeps conservative WIP wording in English', () => {
    render(<Projects language="en" />);

    expect(screen.getByText(/prepares order requests with a test-covered draft, approval, and payment-link contract/i)).toBeInTheDocument();
    expect(screen.getByText(/hands unclear, standards-critical, or planning-intensive cases off for personal KOST review/i)).toBeInTheDocument();
    expect(screen.queryByText(/production-ready|fully autonomous|completed checkout/i)).not.toBeInTheDocument();
  });

  it('does not invent a public URL for STALKER 2 Re Voice', () => {
    render(<Projects language="en" />);

    expect(screen.getByRole('heading', { name: 'STALKER 2 Re Voice' }).closest('a')).toBeNull();
  });
});
