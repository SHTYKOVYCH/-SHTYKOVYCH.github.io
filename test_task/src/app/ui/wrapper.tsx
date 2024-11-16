import { memo } from 'react';

import styles from './styles.module.scss';

export default memo(({ children }: { children: React.ReactNode }) => <div className={styles.wrapper}>{children}</div>);
