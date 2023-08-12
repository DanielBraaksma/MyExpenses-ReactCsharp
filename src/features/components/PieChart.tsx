import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { categories } from "../../constants/constants";
import { useSelector } from 'react-redux';
import { BillType, selectBills } from '../slices/billSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {

const bills = useSelector(selectBills);

const sortedAlphabeticalCategories = Object.values(categories).sort();
let categoryTotals: {category: string; total: number;}[] = [];


bills.forEach((bill: BillType) => {
    const existingCategoryIndex = categoryTotals.findIndex(total => total.category === bill.category);
    if (existingCategoryIndex === -1) {
        categoryTotals.push({category: bill.category, total: bill.amount});
    } else {
        categoryTotals[existingCategoryIndex].total += bill.amount;
    }
});

// console.log(categoryTotals);

const sortedCategoryTotals = categoryTotals.sort((a, b) => a.category.localeCompare(b.category));

// console.log(sortedCategoryTotals);
const categoryNames = categoryTotals.map(total => total.category);
const associatedDataForNames = categoryTotals.map(total => total.total)

const data = {
  labels: categoryNames,
  datasets: [
    {
      label: '$',
      data: associatedDataForNames,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  return <Pie data={data} />;
}
