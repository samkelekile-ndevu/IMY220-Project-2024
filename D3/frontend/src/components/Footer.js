import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <p>&copy; 2023 Your Company</p>
                <p><a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
            </footer>
        );
    }
}

export { Footer };