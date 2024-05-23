document.addEventListener('DOMContentLoaded', () => {
    const ctxBar = document.getElementById('barChart').getContext('2d');
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    const ctxLine = document.getElementById('lineChart').getContext('2d');

    const originalData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 3, 5, 2],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderWidth: 1
        }]
    };

    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: JSON.parse(JSON.stringify(originalData)),
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true,
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                    },
                    zoom: {
                        enabled: true,
                        mode: 'x',
                        speed:0.05,
                        senstivity: 200
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: JSON.parse(JSON.stringify(originalData)),
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true,
                }
            }
        }
    });

    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: JSON.parse(JSON.stringify(originalData)),
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true,
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                    },
                    zoom: {
                        enabled: true,
                        mode: 'x',
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('monthFilter').addEventListener('change', (event) => {
        const selectedMonth = event.target.value;
        updateCharts(selectedMonth);
    });

    function updateCharts(month) {
        let filteredData = JSON.parse(JSON.stringify(originalData));

        if (month !== 'all') {
            const monthIndex = originalData.labels.indexOf(month);
            filteredData.labels = [originalData.labels[monthIndex]];
            filteredData.datasets[0].data = [originalData.datasets[0].data[monthIndex]];
        }

        barChart.data = filteredData;
        pieChart.data = filteredData;
        lineChart.data = filteredData;

        barChart.update();
        pieChart.update();
        lineChart.update();
    }
});
