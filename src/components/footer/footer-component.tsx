import Image from 'next/image';

import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Image alt="Marvel logo" height={52} src="/logo.svg" width={130} />
      <div>
        <p>Author: Lisa Fernandez</p>
        <p>Data provided by Marvel. © 2014 Marvel</p>
      </div>
    </footer>
  );
}
