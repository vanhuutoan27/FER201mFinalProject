import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from '../../../config/axios';

function BarChart() {
  const [orderData, setOrderData] = useState({
    labels: [],
    data: [],
  });

  const options = {
    responsive: true,
  };

  useEffect(() => {
    axios
      .get('/OrderManagements')
      .then((response) => {
        const orders = response.data;

        const labels = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(0, i, 1);
          return date.toLocaleDateString('default', { month: 'short' });
        });

        // Create an array to hold the total orders for each month
        const data = Array(12).fill(0);

        orders.forEach((order) => {
          const date = new Date(order.dateCreated);
          const month = date.getMonth();
          data[month]++;
        });

        // Set the total order data in the state
        setOrderData({ labels, data });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (orderData.labels.length === 0) {
      return; // Wait for data to be available
    }

    const ctxBar = document.getElementById('myChart');

    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: orderData.labels,
        datasets: [
          {
            label: '# of Orders in 2023',
            data: orderData.data,
            borderWidth: 1,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(0, 128, 128)',
              'rgb(128, 0, 128)',
              'rgb(255, 165, 0)',
              'rgb(0, 255, 0)',
              'rgb(128, 128, 128)',
              'rgb(0, 0, 0)',
            ],
          },
        ],
      },
      options: options,
    });
  }, [orderData]);

  return <canvas id="myChart"></canvas>;
}

export default BarChart;
