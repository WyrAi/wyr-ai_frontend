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
            className={`${ROOT}__container ${className ? `${className}` : ''}`}
            style={zIndex ? { zIndex: zIndex, ...commonStyles } : commonStyles}
          >
            {title ? (
              <div className={`${ROOT}__header-container`}>
                <div className={`${ROOT}__header-title`}>{title}</div>
                <button className={`${ROOT}__header-close-btn`} onClick={onCancel}>
                  &times;
                </button>
              </div>
            ) : null}
            <div className={`${ROOT}__content`}>tests</div>
            {/* <div className={`${ROOT}__content`}>{children}</div> */}
            {footer && <div className={`${ROOT}__footer`}>{footer}</div>}
          </div>
          <div
            className={`${ROOT}_overlay ${ROOT}_overlay-ative`}
            style={zIndex ? { zIndex: zIndex - 1 } : {}}
          ></div>
        </>
      ) : null;
}

export default Dialog