import React, { useEffect, useRef } from 'react';
import {
    Chart,
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register components with Chart.js
Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function PriceChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        // Clean up the chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('priceChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((_, index) => `Order ${index + 1}`),
                datasets: [
                    {
                        label: 'Matched Price',
                        data: data.map(order => order.price),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                        tension: 0.1,
                    },
                    {
                        label: 'Quantity',
                        data: data.map(order => order.qty),
                        borderColor: 'rgba(153, 102, 255, 1)',
                        fill: false,
                        tension: 0.1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Price and Quantity over Completed Orders',
                    },
                },
            },
        });

        // Cleanup function to destroy the chart on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas id="priceChart"></canvas>;
}

export default PriceChart;
