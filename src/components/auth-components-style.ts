export const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f5f5",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "300px",
    },
    title: {
        textAlign: "center",
        marginBottom: "1rem",
    },
    input: {
        padding: "0.5rem",
        margin: "0.5rem 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "1rem",
    },
    button: {
        marginTop: "1rem",
        padding: "0.75rem",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
        textAlign: "center",
    },
};
