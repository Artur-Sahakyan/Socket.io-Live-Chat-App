import ReactDOM from 'react-dom';

import classes from './index.module.css';

export const Modal = ({ children, open = true }) => {
    if (!open) return null;

    return ReactDOM.createPortal(
        <div className={classes.modal}>
            {children}
        </div>,
        document.getElementById('portal')
    );
};