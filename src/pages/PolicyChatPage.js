import ChatBox from "../components/ChatBox";

const PolicyChatPage = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <div style={{
                width: "60%",
                height: "80vh",
                background: "#1e293b",
                borderRadius: "10px",
                boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}>
                <div style={{
                    padding: "15px",
                    borderBottom: "1px solid #334155",
                    fontWeight: "bold",
                    fontSize: "18px"
                }}>
                    🏢 Company Policy Assistant
                </div>

                <ChatBox />
            </div>
        </div>
    );
};

export default PolicyChatPage;