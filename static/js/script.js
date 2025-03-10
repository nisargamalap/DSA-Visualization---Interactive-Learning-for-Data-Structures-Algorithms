document.addEventListener("DOMContentLoaded", () => {
    // Data structure selection
    const dsBtns = document.querySelectorAll(".ds-btn")
    const stackOperations = document.getElementById("stack-operations")
    const queueOperations = document.getElementById("queue-operations")
    const stackVisual = document.getElementById("stack-visual")
    const queueVisual = document.getElementById("queue-visual")
    const codeDisplay = document.getElementById("code-display")
    const messageElement = document.getElementById("message")
  
    // Stack implementation code
    const stackCode = `class Stack:
      def __init__(self):
          self.items = []
      
      def push(self, item):
          self.items.append(item)
      
      def pop(self):
          if not self.is_empty():
              return self.items.pop()
      
      def peek(self):
          if not self.is_empty():
              return self.items[-1]
      
      def is_empty(self):
          return len(self.items) == 0
      
      def size(self):
          return len(self.items)`
  
    // Queue implementation code
    const queueCode = `class Queue:
      def __init__(self):
          self.items = []
      
      def enqueue(self, item):
          self.items.append(item)
      
      def dequeue(self):
          if not self.is_empty():
              return self.items.pop(0)
      
      def peek(self):
          if not self.is_empty():
              return self.items[0]
      
      def is_empty(self):
          return len(self.items) == 0
      
      def size(self):
          return len(self.items)`
  
    // Switch between data structures
    dsBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        dsBtns.forEach((b) => b.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")
  
        const ds = this.getAttribute("data-ds")
  
        // Show/hide operation panels
        if (ds === "stack") {
          stackOperations.style.display = "block"
          queueOperations.style.display = "none"
          stackVisual.style.display = "block"
          queueVisual.style.display = "none"
          codeDisplay.textContent = stackCode
        } else if (ds === "queue") {
          stackOperations.style.display = "none"
          queueOperations.style.display = "block"
          stackVisual.style.display = "none"
          queueVisual.style.display = "block"
          codeDisplay.textContent = queueCode
        }
  
        messageElement.textContent = `Select an operation to begin with ${ds}`
      })
    })
  
    // Stack operations
    const stackValue = document.getElementById("stack-value")
    const stackPush = document.getElementById("stack-push")
    const stackPop = document.getElementById("stack-pop")
    const stackPeek = document.getElementById("stack-peek")
    const stackSize = document.getElementById("stack-size")
    const stackItems = document.getElementById("stack-items")
  
    stackPush.addEventListener("click", () => {
      const value = stackValue.value.trim()
      if (value) {
        fetch("/api/stack/push", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: value }),
        })
          .then((response) => response.json())
          .then((data) => {
            updateStackVisualization(data.items)
            messageElement.textContent = data.message
            stackValue.value = ""
          })
      }
    })
  
    stackPop.addEventListener("click", () => {
      fetch("/api/stack/pop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          updateStackVisualization(data.items)
          messageElement.textContent = data.message
        })
    })
  
    stackPeek.addEventListener("click", () => {
      fetch("/api/stack/peek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          messageElement.textContent = data.message
        })
    })
  
    stackSize.addEventListener("click", () => {
      fetch("/api/stack/size", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          messageElement.textContent = data.message
        })
    })
  
    // Queue operations
    const queueValue = document.getElementById("queue-value")
    const queueEnqueue = document.getElementById("queue-enqueue")
    const queueDequeue = document.getElementById("queue-dequeue")
    const queuePeek = document.getElementById("queue-peek")
    const queueSize = document.getElementById("queue-size")
    const queueItems = document.getElementById("queue-items")
  
    queueEnqueue.addEventListener("click", () => {
      const value = queueValue.value.trim()
      if (value) {
        fetch("/api/queue/enqueue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: value }),
        })
          .then((response) => response.json())
          .then((data) => {
            updateQueueVisualization(data.items)
            messageElement.textContent = data.message
            queueValue.value = ""
          })
      }
    })
  
    queueDequeue.addEventListener("click", () => {
      fetch("/api/queue/dequeue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          updateQueueVisualization(data.items)
          messageElement.textContent = data.message
        })
    })
  
    queuePeek.addEventListener("click", () => {
      fetch("/api/queue/peek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          messageElement.textContent = data.message
        })
    })
  
    queueSize.addEventListener("click", () => {
      fetch("/api/queue/size", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          messageElement.textContent = data.message
        })
    })
  
    // Update visualizations
    function updateStackVisualization(items) {
      stackItems.innerHTML = ""
      items.forEach((item) => {
        const stackItem = document.createElement("div")
        stackItem.className = "stack-item"
        stackItem.textContent = item
        stackItems.appendChild(stackItem)
      })
    }
  
    function updateQueueVisualization(items) {
      queueItems.innerHTML = ""
      items.forEach((item) => {
        const queueItem = document.createElement("div")
        queueItem.className = "queue-item"
        queueItem.textContent = item
        queueItems.appendChild(queueItem)
      })
    }
  // Add these functions after the existing ones

// Sorting Visualization
function initializeSorting() {
    const arrayContainer = document.getElementById('array-container');
    const generateArrayBtn = document.getElementById('generate-array');
    const startSortBtn = document.getElementById('start-sort');
    const resetSortBtn = document.getElementById('reset-sort');
    const sortingArray = document.getElementById('sorting-array');
    const sortSpeed = document.getElementById('sort-speed');
    
    let currentArray = [];
    let sortingSteps = [];
    let animationInterval;
    
    function generateRandomArray() {
        currentArray = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 1);
        sortingArray.value = currentArray.join(', ');
        displayArray(currentArray);
    }
    
    function displayArray(arr, comparing = [], swapping = [], sorted = []) {
        arrayContainer.innerHTML = '';
        const maxValue = Math.max(...arr);
        
        arr.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${(value / maxValue) * 250}px`;
            bar.textContent = value;
            
            if (comparing.includes(index)) bar.classList.add('comparing');
            if (swapping.includes(index)) bar.classList.add('swapping');
            if (sorted.includes(index)) bar.classList.add('sorted');
            
            arrayContainer.appendChild(bar);
        });
    }
    
    generateArrayBtn.addEventListener('click', generateRandomArray);
    
    startSortBtn.addEventListener('click', function() {
        const array = sortingArray.value.split(',').map(x => parseInt(x.trim()));
        if (array.some(isNaN)) {
            alert('Please enter valid numbers');
            return;
        }
        
        currentArray = array;
        fetch('/api/sorting/bubble', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ array: currentArray }),
        })
        .then(response => response.json())
        .then(data => {
            sortingSteps = data.steps;
            let stepIndex = 0;
            
            clearInterval(animationInterval);
            animationInterval = setInterval(() => {
                if (stepIndex >= sortingSteps.length) {
                    clearInterval(animationInterval);
                    return;
                }
                
                const step = sortingSteps[stepIndex];
                displayArray(
                    step.array,
                    step.comparing,
                    step.swapping ? step.comparing : []
                );
                
                if (step.done) {
                    displayArray(step.array, [], [], Array.from(step.array.keys()));
                }
                
                stepIndex++;
            }, 1000 / sortSpeed.value);
        });
    });
    
    resetSortBtn.addEventListener('click', function() {
        clearInterval(animationInterval);
        displayArray(currentArray);
    });
    
    // Initialize with random array
    generateRandomArray();
}

// Binary Search Visualization
function initializeBinarySearch() {
    const searchContainer = document.getElementById('search-container');
    const generateArrayBtn = document.getElementById('generate-sorted-array');
    const startSearchBtn = document.getElementById('start-search');
    const resetSearchBtn = document.getElementById('reset-search');
    const searchArray = document.getElementById('search-array');
    const searchTarget = document.getElementById('search-target');
    
    let currentArray = [];
    let searchSteps = [];
    let animationInterval;
    
    function generateRandomSortedArray() {
        currentArray = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 1)
            .sort((a, b) => a - b);
        searchArray.value = currentArray.join(', ');
        displaySearchArray(currentArray);
    }
    
    function displaySearchArray(arr, left = -1, right = -1, mid = -1, target = -1) {
        searchContainer.innerHTML = '';
        
        arr.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'search-element';
            element.textContent = value;
            
            if (index === mid) element.classList.add('mid');
            if (index >= left && index <= right) element.classList.add('range');
            if (value === target) element.classList.add('target');
            
            searchContainer.appendChild(element);
        });
    }
    
    generateArrayBtn.addEventListener('click', generateRandomSortedArray);
    
    startSearchBtn.addEventListener('click', function() {
        const array = searchArray.value.split(',').map(x => parseInt(x.trim()));
        const target = parseInt(searchTarget.value);
        
        if (array.some(isNaN) || isNaN(target)) {
            alert('Please enter valid numbers');
            return;
        }
        
        currentArray = array.sort((a, b) => a - b);
        searchArray.value = currentArray.join(', ');
        
        fetch('/api/search/binary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ array: currentArray, target: target }),
        })
        .then(response => response.json())
        .then(data => {
            searchSteps = data.steps;
            let stepIndex = 0;
            
            clearInterval(animationInterval);
            animationInterval = setInterval(() => {
                if (stepIndex >= searchSteps.length) {
                    clearInterval(animationInterval);
                    return;
                }
                
                const step = searchSteps[stepIndex];
                displaySearchArray(
                    step.array,
                    step.left,
                    step.right,
                    step.mid,
                    step.target
                );
                
                if (step.found) {
                    messageElement.textContent = `Found ${step.target} at index ${step.mid}!`;
                } else if (step.done) {
                    messageElement.textContent = `${step.target} not found in the array.`;
                }
                
                stepIndex++;
            }, 1000);
        });
    });
    
    resetSearchBtn.addEventListener('click', function() {
        clearInterval(animationInterval);
        displaySearchArray(currentArray);
        messageElement.textContent = 'Enter a target number to search';
    });
    
    // Initialize with random sorted array
    generateRandomSortedArray();
}

// Graph Visualization
function initializeGraph() {
    const graphContainer = document.getElementById('graph-container');
    const startBfsBtn = document.getElementById('start-bfs');
    const resetGraphBtn = document.getElementById('reset-graph');
    const startVertex = document.getElementById('start-vertex');
    const bfsQueue = document.getElementById('bfs-queue');
    
    const vertices = {
        'A': { x: 200, y: 50 },
        'B': { x: 100, y: 150 },
        'C': { x: 300, y: 150 },
        'D': { x: 150, y: 250 },
        'E': { x: 250, y: 250 }
    };
    
    const edges = [
        ['A', 'B'], ['A', 'C'],
        ['B', 'D'], ['C', 'D'],
        ['C', 'E'], ['D', 'E']
    ];
    
    function drawGraph(visited = [], current = null) {
        graphContainer.innerHTML = '';
        
        // Draw edges
        edges.forEach(([v1, v2]) => {
            const edge = document.createElement('div');
            edge.className = 'edge';
            
            const x1 = vertices[v1].x;
            const y1 = vertices[v1].y;
            const x2 = vertices[v2].x;
            const y2 = vertices[v2].y;
            
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            edge.style.width = `${length}px`;
            edge.style.left = `${x1}px`;
            edge.style.top = `${y1 + 20}px`;
            edge.style.transform = `rotate(${angle}deg)`;
            
            graphContainer.appendChild(edge);
        });
        
        // Draw vertices
        Object.entries(vertices).forEach(([id, pos]) => {
            const vertex = document.createElement('div');
            vertex.className = 'vertex';
            if (visited.includes(id)) vertex.classList.add('visited');
            if (id === current) vertex.classList.add('current');
            
            vertex.style.left = `${pos.x - 20}px`;
            vertex.style.top = `${pos.y - 20}px`;
            vertex.textContent = id;
            
            graphContainer.appendChild(vertex);
        });
    }
    
    function updateQueue(queue) {
        bfsQueue.innerHTML = '';
        queue.forEach(vertex => {
            const item = document.createElement('div');
            item.className = 'queue-item';
            item.textContent = vertex;
            bfsQueue.appendChild(item);
        });
    }
    
    startBfsBtn.addEventListener('click', function() {
        const start = startVertex.value;
        
        fetch('/api/graph/bfs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: start }),
        })
        .then(response => response.json())
        .then(data => {
            const steps = data.steps;
            let stepIndex = 0;
            
            const interval = setInterval(() => {
                if (stepIndex >= steps.length) {
                    clearInterval(interval);
                    return;
                }
                
                const step = steps[stepIndex];
                drawGraph(step.visited, step.current);
                updateQueue(step.queue);
                
                if (step.done) {
                    messageElement.textContent = 'BFS traversal complete!';
                } else {
                    messageElement.textContent = `Visiting vertex ${step.current}`;
                }
                
                stepIndex++;
            }, 1000);
        });
    });
    
    resetGraphBtn.addEventListener('click', function() {
        drawGraph();
        updateQueue([]);
        messageElement.textContent = 'Select a starting vertex for BFS';
    });
    
    // Initialize graph
    drawGraph();
}

// Add these to the existing data structure selection handler
dsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // ... existing code ...
        
        const ds = this.getAttribute('data-ds');
        
        if (ds === 'sorting') {
            stackOperations.style.display = 'none';
            queueOperations.style.display = 'none';
            sortingOperations.style.display = 'block';
            stackVisual.style.display = 'none';
            queueVisual.style.display = 'none';
            sortingVisual.style.display = 'block';
            binarySearchVisual.style.display = 'none';
            graphVisual.style.display = 'none';
            initializeSorting();
        } else if (ds === 'binary-search') {
            stackOperations.style.display = 'none';
            queueOperations.style.display = 'none';
            sortingOperations.style.display = 'none';
            stackVisual.style.display = 'none';
            queueVisual.style.display = 'none';
            sortingVisual.style.display = 'none';
            binarySearchVisual.style.display = 'block';
            graphVisual.style.display = 'none';
            initializeBinarySearch();
        } else if (ds === 'graph') {
            stackOperations.style.display = 'none';
            queueOperations.style.display = 'none';
            sortingOperations.style.display = 'none';
            stackVisual.style.display = 'none';
            queueVisual.style.display = 'none';
            sortingVisual.style.display = 'none';
            binarySearchVisual.style.display = 'none';
            graphVisual.style.display = 'block';
            initializeGraph();
        }
    });
});
})
  
  