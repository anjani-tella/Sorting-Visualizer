let array = [];
const barContainer = document.getElementById('barContainer');
const sizeDropdown = document.getElementById('size');
const algorithmDropdown = document.getElementById('algorithm');
const speedDropdown = document.getElementById('speed');
let speed = 100;

// Function to randomize array and create bars
function randomizeArray() {
    const arraySize = sizeDropdown.value;
    array = [];
    barContainer.innerHTML = '';

    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 5}px`;
        bar.innerText = value;
        barContainer.appendChild(bar);
    }
}

// Sleep function to control animation speed
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Algorithm
async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 5}px`;
                bars[j + 1].style.height = `${array[j + 1] * 5}px`;

                bars[j].innerText = array[j];
                bars[j + 1].innerText = array[j + 1];

                await sleep(speed);
            }
        }
    }
}

// Quick Sort Algorithm
async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        let pivot = await partition(low, high);
        await quickSort(low, pivot - 1);
        await quickSort(pivot + 1, high);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    const bars = document.getElementsByClassName('bar');
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i] * 5}px`;
            bars[j].style.height = `${array[j] * 5}px`;

            bars[i].innerText = array[i];
            bars[j].innerText = array[j];
            await sleep(speed);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1] * 5}px`;
    bars[high].style.height = `${array[high] * 5}px`;

    bars[i + 1].innerText = array[i + 1];
    bars[high].innerText = array[high];
    await sleep(speed);
    return i + 1;
}

// Heap Sort Algorithm
async function heapSort() {
    const bars = document.getElementsByClassName('bar');
    
    let n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        // Swap
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0] * 5}px`;
        bars[i].style.height = `${array[i] * 5}px`;
        bars[0].innerText = array[0];
        bars[i].innerText = array[i];

        await sleep(speed);

        // Heapify the reduced heap
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    const bars = document.getElementsByClassName('bar');
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        // Swap
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = `${array[i] * 5}px`;
        bars[largest].style.height = `${array[largest] * 5}px`;
        bars[i].innerText = array[i];
        bars[largest].innerText = array[largest];

        await sleep(speed);

        // Recursively heapify the affected subtree
        await heapify(n, largest);
    }
}

// Merge Sort Algorithm
async function mergeSort(low = 0, high = array.length - 1) {
    if (low < high) {
        const mid = Math.floor((low + high) / 2);

        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        await merge(low, mid, high);
    }
}

async function merge(low, mid, high) {
    const bars = document.getElementsByClassName('bar');
    const leftArr = array.slice(low, mid + 1);
    const rightArr = array.slice(mid + 1, high + 1);

    let i = 0, j = 0, k = low;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            bars[k].style.height = `${array[k] * 5}px`;
            bars[k].innerText = array[k];
            i++;
        } else {
            array[k] = rightArr[j];
            bars[k].style.height = `${array[k] * 5}px`;
            bars[k].innerText = array[k];
            j++;
        }
        await sleep(speed);
        k++;
    }

    // Copy the remaining elements
    while (i < leftArr.length) {
        array[k] = leftArr[i];
        bars[k].style.height = `${array[k] * 5}px`;
        bars[k].innerText = array[k];
        await sleep(speed);
        i++;
        k++;
    }

    while (j < rightArr.length) {
        array[k] = rightArr[j];
        bars[k].style.height = `${array[k] * 5}px`;
        bars[k].innerText = array[k];
        await sleep(speed);
        j++;
        k++;
    }
}

// Set speed based on user input
function setSpeed() {
    const selectedSpeed = speedDropdown.value;
    if (selectedSpeed === 'slow') speed = 300;
    else if (selectedSpeed === 'medium') speed = 100;
    else speed = 50;
}

// Event listeners
document.getElementById('randomizeArray').addEventListener('click', randomizeArray);
document.getElementById('sortArray').addEventListener('click', async () => {
    setSpeed();
    const selectedAlgorithm = algorithmDropdown.value;
    if (selectedAlgorithm === 'bubble') {
        await bubbleSort();
    } else if (selectedAlgorithm === 'quick') {
        await quickSort();
    } else if (selectedAlgorithm === 'heap') {
        await heapSort();
    } else if (selectedAlgorithm === 'merge') {
        await mergeSort();
    }
});
