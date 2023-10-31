import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from '../../../config/axios';

function DoughnutChart() {
  const [serviceData, setServiceData] = useState({
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

        // Initialize an object to store the count of orders for each service
        const serviceCounts = {};

        orders.forEach((order) => {
          const serviceName = order.serviceName;

          // Increment the count for the serviceName
          if (serviceCounts[serviceName]) {
            serviceCounts[serviceName]++;
          } else {
            serviceCounts[serviceName] = 1;
          }
        });

        // Sort the services by order count in descending order
        const sortedServices = Object.keys(serviceCounts).sort(
          (a, b) => serviceCounts[b] - serviceCounts[a]
        );

        // Select the top 5 services
        const top5Services = sortedServices.slice(0, 5);

        // Extract labels (service names) and data (order counts) for the top 5 services
        const labels = top5Services;
        const data = top5Services.map((service) => serviceCounts[service]);

        // Set the data in the state
        setServiceData({ labels, data });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (serviceData.labels.length === 0) {
      return; // Wait for data to be available
    }

    const ctxDoughnut = document.getElementById('myDoughnutChart');
    new Chart(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: serviceData.labels,
        datasets: [
          {
            label: 'Total Order',
            data: serviceData.data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(255, 159, 64)',
            ],
          },
        ],
      },
      options: options,
    });
  }, [serviceData]);

  return <canvas id="myDoughnutChart"></canvas>;
}

export default DoughnutChart;
