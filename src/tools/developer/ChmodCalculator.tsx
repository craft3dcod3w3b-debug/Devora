import { useState } from 'react';

type Permission = {
  read: boolean;
  write: boolean;
  execute: boolean;
};

export default function ChmodCalculator() {
  const [owner, setOwner] = useState<Permission>({ read: true, write: true, execute: true });
  const [group, setGroup] = useState<Permission>({ read: true, write: false, execute: true });
  const [publicPerm, setPublicPerm] = useState<Permission>({ read: true, write: false, execute: true });

  const calcOctal = (p: Permission) => (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
  const calcSymbolic = (p: Permission) => `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;

  const octal = `${calcOctal(owner)}${calcOctal(group)}${calcOctal(publicPerm)}`;
  const symbolic = `-${calcSymbolic(owner)}${calcSymbolic(group)}${calcSymbolic(publicPerm)}`;

  const PermissionBlock = ({ title, perm, setPerm }: { title: string, perm: Permission, setPerm: (p: Permission) => void }) => (
    <div style={{ flex: 1, padding: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', minWidth: '200px' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={perm.read} onChange={(e) => setPerm({ ...perm, read: e.target.checked })} style={{ accentColor: 'var(--color-primary)' }} />
          <span>Read (4)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={perm.write} onChange={(e) => setPerm({ ...perm, write: e.target.checked })} style={{ accentColor: 'var(--color-primary)' }} />
          <span>Write (2)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={perm.execute} onChange={(e) => setPerm({ ...perm, execute: e.target.checked })} style={{ accentColor: 'var(--color-primary)' }} />
          <span>Execute (1)</span>
        </label>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <PermissionBlock title="Owner" perm={owner} setPerm={setOwner} />
        <PermissionBlock title="Group" perm={group} setPerm={setGroup} />
        <PermissionBlock title="Public" perm={publicPerm} setPerm={setPublicPerm} />
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', padding: '1.5rem', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-fg-secondary)', marginBottom: '0.5rem' }}>Octal Notation</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>
            {octal}
          </div>
        </div>
        
        <div style={{ flex: 1, minWidth: '250px', padding: '1.5rem', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-fg-secondary)', marginBottom: '0.5rem' }}>Symbolic Notation</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>
            {symbolic}
          </div>
        </div>
      </div>

      <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Linux Command Examples</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <code style={{ padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            chmod {octal} file.txt
          </code>
          <code style={{ padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            chmod -R {octal} /path/to/directory
          </code>
        </div>
      </div>

    </div>
  );
}
