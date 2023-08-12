export const Footer = () => {
    const footerStyles = {
        footer: {
            height: '10vh',
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
            color: '#fff'
        } as React.CSSProperties,
    };

    return (
        <footer style={footerStyles.footer}>Spend wisely my friend &#128521;</footer>
      );
}
