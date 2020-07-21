import React from 'react'
import PropTypes from 'prop-types'

const Message = ( { success, message } ) => {
    const alertColor = success ? 'alert-success' : 'alert-danger';
    return (
        <div className={`alert fade show ${alertColor}`} role="alert">
            {message}
        </div>
    )
}

Message.propTypes = {
    success : PropTypes.bool.isRequired,
    message : PropTypes.string.isRequired
}

export default Message
