const MessageBubble = ({ message }) => {
    const isUser = message.type === "user";

    return (
        <div style={{
            display: "flex",
            justifyContent: isUser ? "flex-end" : "flex-start",
            marginBottom: "10px"
        }}>
            <div style={{
                background: isUser ? "#3b82f6" : "#334155",
                padding: "12px",
                borderRadius: "10px",
                maxWidth: "70%",
                color: "#fff",
                fontSize: "14px"
            }}>
                <div>{message.text}</div>

                
            </div>
        </div>
    );
};

export default MessageBubble;