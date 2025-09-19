const { useState, useEffect } = React;

function App() {
    const [helloData, setHelloData] = useState(null);
    const [statusData, setStatusData] = useState(null);

    const fetchHello = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/hello/');
            const data = await response.json();
            setHelloData(data);
        } catch (error) {
            setHelloData({ error: 'Failed to fetch' });
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/status/');
            const data = await response.json();
            setStatusData(data);
        } catch (error) {
            setStatusData({ error: 'Failed to fetch' });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Django API Frontend</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <button onClick={fetchHello}>Call Hello API</button>
                {helloData && (
                    <div>Response: {JSON.stringify(helloData)}</div>
                )}
            </div>

            <div>
                <button onClick={fetchStatus}>Call Status API</button>
                {statusData && (
                    <div>Response: {JSON.stringify(statusData)}</div>
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));