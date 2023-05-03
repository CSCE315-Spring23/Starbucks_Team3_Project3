import React, { useState } from 'react';

function ReportManager() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState('');

    const handleXReport = async () => {
        const requestData = {start: startDate, end: endDate};
        const response = await fetch('http://localhost:5000/management/x-report', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const responseData = await response.json()
        const reportArr = Object.entries(responseData).map(([category, amount]) => `${category}: $${amount.toFixed(2)}`);
        setReportData(reportArr)
    };

    const handleZReport = async () => {
        // const requestData = {start: startDate, end: endDate};
        const response = await fetch('http://localhost:5000/management/z-report');
        const responseData = await response.json()
        setReportData(responseData)
    };

    return (
        <div>
            <div>Browse Reports</div>
            <label>
                Start Date:
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </label>
            <label>
                End Date:
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </label>
            <div>
                <button onClick={handleXReport}>X Report</button>
                <button onClick={handleZReport}>Z Report</button>
            </div>
            <div>
                {reportData && (
                    <div>
                        <div>Report Data:</div>
                        {reportData.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReportManager;
