import React, { PropTypes } from 'react';

import { OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';

const Tooltip = ({children, position, text}) => {
    return position === 'none'
        ? children
        : (
            <OverlayTrigger
                delayHide={150}
                delayShow={300}
                overlay={
                    <BootstrapTooltip id="tooltip">
                        {text}
                    </BootstrapTooltip>
                }
                placement={position}
            >
                {children}
            </OverlayTrigger>
        );
};

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    position: PropTypes
        .oneOf(['top', 'right', 'bottom', 'left', 'none']).isRequired,
    text: PropTypes.string.isRequired
};

export default Tooltip;
