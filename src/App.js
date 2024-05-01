import React, { useState } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([]);

  // Function to generate a new random array
  const generateArray = () => {
    const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 5);
    setArray(newArray);
  };

  // Function to reset the array
  const resetArray = () => {
    generateArray();
  };

  // Function to perform bubble sort
  const bubbleSort = async () => {
    const newArray = [...array];
    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          // Swap elements
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          // Update array state after each swap for visualization
          await new Promise(resolve => setTimeout(() => {
            setArray([...newArray]);
            resolve();
          }, 50));
        }
      }
    }
  };

  // Function to perform insertion sort
  const insertionSort = async () => {
    const newArray = [...array];
    for (let i = 1; i < newArray.length; i++) {
      let key = newArray[i];
      let j = i - 1;
      while (j >= 0 && newArray[j] > key) {
        newArray[j + 1] = newArray[j];
        j = j - 1;
        await new Promise(resolve => setTimeout(() => {
          setArray([...newArray]);
          resolve();
        }, 50));
      }
      newArray[j + 1] = key;
    }
  };

  // Function to perform selection sort
  const selectionSort = async () => {
    const newArray = [...array];
    for (let i = 0; i < newArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < newArray.length; j++) {
        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
      }
      // Swap elements
      [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
      // Update array state after each swap for visualization
      await new Promise(resolve => setTimeout(() => {
        setArray([...newArray]);
        resolve();
      }, 50));
    }
  };

  // Function to perform merge sort
  const mergeSort = async (arr) => {
    if (arr.length <= 1) return arr;

    const merge = async (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }

      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(await mergeSort(left), await mergeSort(right));
  };

  const mergeSortHandler = async () => {
    const sortedArray = await mergeSort(array);
    setArray(sortedArray);
  };

  // Function to perform quick sort
  const quickSort = async (arr) => {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...await quickSort(left), pivot, ...await quickSort(right)];
  };

  const quickSortHandler = async () => {
    const sortedArray = await quickSort(array);
    setArray(sortedArray);
  };

  // Function to handle manually setting the array
  const handleManualArray = () => {
    const inputArray = prompt('Enter comma-separated numbers:');
    if (inputArray) {
      const newArray = inputArray.split(',').map(str => parseInt(str.trim(), 10));
      setArray(newArray);
    }
  };

  return (
    <div className="container">
      <div className="controls">
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={mergeSortHandler}>Merge Sort</button>
        <button onClick={quickSortHandler}>Quick Sort</button>
        <button onClick={handleManualArray}>Set Manual Array</button>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
