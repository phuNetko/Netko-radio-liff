// Footer component
export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0',
        padding: '30px 0',
        marginTop: 'auto',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
          © 2026 Next Radio - Built with Next.js, TypeScript & Axios
        </p>
        <p style={{ margin: '10px 0 0 0', color: '#999', fontSize: '0.85rem' }}>
          Demo project using JSONPlaceholder API
        </p>
      </div>
    </footer>
  );
}
