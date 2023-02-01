import type { FC, PropsWithChildren } from 'react';
import styles from './AppContainer.module.css';

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.appContainer}>{children}</div>
    );
}
