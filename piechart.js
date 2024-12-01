const chartData = [30, 20, 15, 15, 10, 10];
const chartLabels = ['Food', 'Bills', 'Gas', 'School', 'Leisure', 'Other'];
const chartColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#FFA500', '#800080'];

// Wait for the DOM to load before accessing the canvas
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myPieChart').getContext('2d');

    // Initialize the pie chart
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: chartColors
            }]
        }
    });
});