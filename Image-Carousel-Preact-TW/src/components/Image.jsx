import React from 'react';

class Image extends React.Component {
    render() {
        return (
            <img src={this.props.src} alt={this.props.alt} className={this.props.className ?? ""} />
        );
    }
}

export default Image;