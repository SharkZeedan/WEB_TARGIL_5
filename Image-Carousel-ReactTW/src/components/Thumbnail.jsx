import React from 'react';

class Thumbnail extends React.Component {
    render() {
        return (
            <img id={this.props.id} className={this.props.className} src={this.props.src} alt={this.props.alt} height="100px" width="100px" onClick={this.props.onClick} />
        );
    }
}

export default Thumbnail;