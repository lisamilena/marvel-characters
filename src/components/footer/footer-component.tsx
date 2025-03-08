import Image from 'next/image';

import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Image priority alt="Marvel logo" height={52} src="/logo.svg" width={130} />
      <p className="text-white">Lisa Fernandez</p>
    </footer>
  );
}
