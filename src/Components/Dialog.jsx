import React, { useEffect } from 'react'


const Dialog = (props) => {
    const {
        isDialogOpen,
        onCancel,
        children,
        title,
        footer,
        className,
        zIndex,
        width,
        overlayClass,
      } = props;
    
      useEffect(() => {
        if (document && document.getElementById('body')) {
          if (isDialogOpen) {
            document.getElementById('body').style.overflowY = 'hidden';
          } else {
            document.getElementById('body').style.overflowY = '';
          }
        }
        return () => {
          document.getElementById('body').style.overflowY = '';
        };
      }, [isDialogOpen]);
    
      const commonStyles = { width: width };
      return isDialogOpen ? (
        <>
          <div
            className={``   `__container ${className ? `${className}` : ''}`}
            style={zIndex ? { zIndex: zIndex, ...commonStyles } : commonStyles}
          >
            {title ? (
              <div className={``    `__header-container`}>
                <div className={``  `__header-title`}>{title}</div>
                <button className={``   `__header-close-btn`} onClick={onCancel}>
                  &times;
                </button>
              </div>
            ) : null}
            <div className={``  `__content`}>tests</div>
            {/* <div className={``  `__content`}>{children}</div> */}
            {footer && <div className={``   `__footer`}>{footer}</div>}
          </div>
          <div
            className={``   `_overlay ` `_overlay-ative`}
            style={zIndex ? { zIndex: zIndex - 1 } : {}}
          ></div>
        </>
      ) : null;
}

export default Dialog