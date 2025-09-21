const { useState, useEffect } = React;

function App() {
    const [helloData, setHelloData] = useState(null);
    const [statusData, setStatusData] = useState(null);
    const [dbData, setDbData] = useState(null);
    const [thirdPartyData, setThirdPartyData] = useState(null);
    const [authData, setAuthData] = useState(null);
    const [monitoringData, setMonitoringData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [metrics, setMetrics] = useState({
        uptime: 0,
        totalRequests: 0,
        successRate: 100,
        avgResponseTime: 0,
        lastUpdate: new Date()
    });
    const [helloHealth, setHelloHealth] = useState('healthy');
    const [statusHealth, setStatusHealth] = useState('healthy');
    const [dbHealth, setDbHealth] = useState('healthy');
    const [thirdPartyHealth, setThirdPartyHealth] = useState('healthy');
    const [authHealth, setAuthHealth] = useState('healthy');
    const [monitoringHealth, setMonitoringHealth] = useState('healthy');

    const fetchHello = async () => {
        const startTime = Date.now();
        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/hello/`);
            const data = await response.json();
            const responseTime = Date.now() - startTime;
            setHelloData(data);
            setHelloHealth('healthy');
            updateMetrics(responseTime, true);
        } catch (error) {
            setHelloData({ error: 'Service Unavailable' });
            setHelloHealth('error');
            updateMetrics(0, false);
        }
    };

    const fetchStatus = async () => {
        const startTime = Date.now();
        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/status/`);
            const data = await response.json();
            const responseTime = Date.now() - startTime;
            setStatusData(data);
            setStatusHealth('healthy');
            updateMetrics(responseTime, true);
        } catch (error) {
            setStatusData({ error: 'Service Unavailable' });
            setStatusHealth('error');
            updateMetrics(0, false);
        }
    };

    const updateMetrics = (responseTime, success) => {
        setMetrics(prev => ({
            uptime: prev.uptime + 2,
            totalRequests: prev.totalRequests + 1,
            successRate: success ? Math.min(100, prev.successRate + 0.1) : Math.max(0, prev.successRate - 5),
            avgResponseTime: responseTime > 0 ? Math.round((prev.avgResponseTime + responseTime) / 2) : prev.avgResponseTime,
            lastUpdate: new Date()
        }));
    };

    const fetchDatabase = async () => {
        const startTime = Date.now();
        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/database/`);
            const data = await response.json();
            const responseTime = Date.now() - startTime;
            setDbData(data);
            setDbHealth(data.health || 'healthy');
            updateMetrics(responseTime, true);
        } catch (error) {
            setDbData({ error: 'Service Unavailable' });
            setDbHealth('error');
            updateMetrics(0, false);
        }
    };

    const fetchThirdParty = async () => {
        const startTime = Date.now();
        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/third-party/`);
            const data = await response.json();
            const responseTime = Date.now() - startTime;
            setThirdPartyData(data);
            setThirdPartyHealth(data.health || 'healthy');
            updateMetrics(responseTime, true);
        } catch (error) {
            setThirdPartyData({ error: 'Service Unavailable' });
            setThirdPartyHealth('error');
            updateMetrics(0, false);
        }
    };

    const fetchAuth = async () => {
        const startTime = Date.now();
        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/auth/`);
            const data = await response.json();
            const responseTime = Date.now() - startTime;
            setAuthData(data);
            setAuthHealth(data.health || 'healthy');
            updateMetrics(responseTime, true);
        } catch (error) {
            setAuthData({ error: 'Service Unavailable' });
            setAuthHealth('error');
            updateMetrics(0, false);
        }
    };

    const fetchMonitoring = async () => {
        const startTime = Date.now();
        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/monitoring/`);
            const data = await response.json();
            const responseTime = Date.now() - startTime;
            setMonitoringData(data);
            setMonitoringHealth(data.health || 'healthy');
            updateMetrics(responseTime, true);
        } catch (error) {
            setMonitoringData({ error: 'Service Unavailable' });
            setMonitoringHealth('error');
            updateMetrics(0, false);
        }
    };

    const fetchAll = async () => {
        setIsLoading(true);
        await Promise.all([fetchHello(), fetchStatus(), fetchDatabase(), fetchThirdParty(), fetchAuth(), fetchMonitoring()]);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAll();
        const interval = setInterval(fetchAll, 2000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (health) => {
        switch(health) {

            case 'healthy': return '#207ef8ff';
            case 'warning': return '#d1ce25ff';
            case 'error': return '#9c0300ff';
            default: return '#757575';

        }
    };

    const metricCardStyle = {
        background: '#1e1e2e',
        borderRadius: '12px',
        padding: '20px',
        margin: '10px',
        color: 'white',
        border: '1px solid #313244',
        minWidth: '200px',
        textAlign: 'center'
    };

    const serviceCardStyle = {
        background: '#1e1e2e',
        borderRadius: '12px',
        padding: '20px',
        margin: '10px',
        color: 'white',
        border: '1px solid #00d4aa',
        minWidth: '300px',
        position: 'relative'
    };

    return (
        <div style={{ 
            fontFamily: 'Inter, system-ui, sans-serif',
            background: '#0f0f23',
            minHeight: '100vh',
            padding: '20px',
            color: 'white'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ 
                    color: '#cdd6f4', 
                    fontSize: '15px', 
                    margin: '0',
                    fontWeight: '600',
                    fontFamily: 'Arial, sans-serif'
                }}>⚡ API Health Monitor</h1>
                <p style={{ color: '#6c7086', fontSize: '1em', margin: '5px 0' }}>
                    Real-time monitoring • Last updated: {metrics.lastUpdate.toLocaleTimeString()}
                </p>
                <div style={{
                    display: 'inline-block',
                    background: isLoading ? '#ffa726' : '#00d4aa',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8em',
                    fontWeight: '500'
                }}>
                    {isLoading ? '🔄 Refreshing...' : '✅ Live'}
                </div>
            </div>

            {/* Metrics Overview */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                marginBottom: '30px'
            }}>
                <div style={metricCardStyle}>
                    <div style={{ fontSize: '2em', color: '#00d4aa', fontWeight: 'bold' }}>
                        {Math.floor(metrics.uptime / 60)}m {metrics.uptime % 60}s
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#6c7086' }}>Uptime</div>
                </div>
                <div style={metricCardStyle}>
                    <div style={{ fontSize: '2em', color: '#74c0fc', fontWeight: 'bold' }}>
                        {metrics.totalRequests}
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#1c3bebff' }}>Total Requests</div>
                </div>
                <div style={metricCardStyle}>
                    <div style={{ fontSize: '2em', color: metrics.successRate > 95 ? '#00d4aa' : '#ffa726', fontWeight: 'bold' }}>
                        {metrics.successRate.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#6c7086' }}>Success Rate</div>
                </div>
                <div style={metricCardStyle}>
                    <div style={{ fontSize: '2em', color: '#ff0048ff', fontWeight: 'bold' }}>
                        {metrics.avgResponseTime}ms
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#6c7086' }}>Avg Response</div>
                </div>
            </div>
            
            {/* Service Status */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                <div style={serviceCardStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '16px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: getStatusColor(helloHealth),
                        boxShadow: `0 0 10px ${getStatusColor(helloHealth)}`
                    }}></div>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#cdd6f4', fontFamily: 'Arial, sans-serif' }}>
                        📡 Hello Service
                    </h3>
                    <div style={{ 
                        background: '#313244', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '10px'
                    }}>
                        {helloData ? (
                            <div style={{ fontSize: '1.1em' }}>
                                {helloData.message || helloData.error}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.6 }}>Initializing...</div>
                        )}
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#6c7086' }}>
                        Status: <span style={{ color: getStatusColor(helloHealth), fontWeight: 'bold' }}>
                            {helloHealth.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div style={serviceCardStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: getStatusColor(statusHealth),
                        boxShadow: `0 0 10px ${getStatusColor(statusHealth)}`
                    }}></div>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#cdd6f4', fontFamily: 'Arial, sans-serif' }}>
                        🔧 Status Service
                    </h3>
                    <div style={{ 
                        background: '#313244', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '10px'
                    }}>
                        {statusData ? (
                            <div style={{ fontSize: '1.1em' }}>
                                {statusData.status || statusData.error}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.6 }}>Initializing...</div>
                        )}
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#6c7086' }}>
                        Status: <span style={{ color: getStatusColor(statusHealth), fontWeight: 'bold' }}>
                            {statusHealth.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div style={serviceCardStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: getStatusColor(dbHealth),
                        boxShadow: `0 0 10px ${getStatusColor(dbHealth)}`
                    }}></div>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#cdd6f4', fontFamily: 'Arial, sans-serif' }}>
                        🗄️ Database
                    </h3>
                    <div style={{ 
                        background: '#313244', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '10px'
                    }}>
                        {dbData ? (
                            <div>
                                <div style={{ fontSize: '1.1em', marginBottom: '8px' }}>
                                    {dbData.status || dbData.error}
                                </div>
                                {dbData.connections && (
                                    <div style={{ fontSize: '0.9em', color: '#a6adc8' }}>
                                        Connections: {dbData.connections} | Query: {dbData.query_time}ms
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.6 }}>Initializing...</div>
                        )}
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#6c7086' }}>
                        Status: <span style={{ color: getStatusColor(dbHealth), fontWeight: 'bold' }}>
                            {dbHealth.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div style={serviceCardStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: getStatusColor(thirdPartyHealth),
                        boxShadow: `0 0 10px ${getStatusColor(thirdPartyHealth)}`
                    }}></div>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#cdd6f4', fontFamily: 'Arial, sans-serif' }}>
                        🔗 Third Party
                    </h3>
                    <div style={{ 
                        background: '#313244', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '10px'
                    }}>
                        {thirdPartyData ? (
                            <div>
                                <div style={{ fontSize: '1.1em', marginBottom: '8px' }}>
                                    {thirdPartyData.status || thirdPartyData.error}
                                </div>
                                {thirdPartyData.response_time && (
                                    <div style={{ fontSize: '0.9em', color: '#a6adc8' }}>
                                        Response: {thirdPartyData.response_time}ms
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.6 }}>Initializing...</div>
                        )}
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#6c7086' }}>
                        Status: <span style={{ color: getStatusColor(thirdPartyHealth), fontWeight: 'bold' }}>
                            {thirdPartyHealth.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div style={serviceCardStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: getStatusColor(authHealth),
                        boxShadow: `0 0 10px ${getStatusColor(authHealth)}`
                    }}></div>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#cdd6f4', fontFamily: 'Arial, sans-serif' }}>
                        🔐 Authentication
                    </h3>
                    <div style={{ 
                        background: '#313244', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '10px'
                    }}>
                        {authData ? (
                            <div>
                                <div style={{ fontSize: '1.1em', marginBottom: '8px' }}>
                                    {authData.status || authData.error}
                                </div>
                                {authData.active_sessions && (
                                    <div style={{ fontSize: '0.9em', color: '#a6adc8' }}>
                                        Sessions: {authData.active_sessions} | Failed: {authData.failed_attempts}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.6 }}>Initializing...</div>
                        )}
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#6c7086' }}>
                        Status: <span style={{ color: getStatusColor(authHealth), fontWeight: 'bold' }}>
                            {authHealth.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div style={serviceCardStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: getStatusColor(monitoringHealth),
                        boxShadow: `0 0 10px ${getStatusColor(monitoringHealth)}`
                    }}></div>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#cdd6f4', fontFamily: 'Arial, sans-serif' }}>
                        📊 System Monitor
                    </h3>
                    <div style={{ 
                        background: '#313244', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '10px'
                    }}>
                        {monitoringData ? (
                            <div>
                                <div style={{ fontSize: '1.1em', marginBottom: '8px' }}>
                                    {monitoringData.status || monitoringData.error}
                                </div>
                                {monitoringData.cpu_usage && (
                                    <div style={{ fontSize: '0.9em', color: '#a6adc8' }}>
                                        CPU: {monitoringData.cpu_usage}% | RAM: {monitoringData.memory_usage}%
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.6 }}>Initializing...</div>
                        )}
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#6c7086' }}>
                        Status: <span style={{ color: getStatusColor(monitoringHealth), fontWeight: 'bold' }}>
                            {monitoringHealth.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ 
                textAlign: 'center', 
                marginTop: '30px'
            }}>
                <button 
                    onClick={fetchAll}
                    disabled={isLoading}
                    style={{
                        background: '#313244',
                        border: '1px solid #45475a',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        color: '#cdd6f4',
                        fontSize: '1em',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: isLoading ? 0.6 : 1
                    }}
                    onMouseOver={(e) => {
                        if (!isLoading) {
                            e.target.style.background = '#45475a';
                        }
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = '#313244';
                    }}
                >
                    {isLoading ? '⏳ Refreshing...' : '🔄 Manual Refresh'}
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));