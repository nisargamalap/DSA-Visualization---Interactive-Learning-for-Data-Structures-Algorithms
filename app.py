from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
import random
import time
from collections import deque

# Data structures implementations
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
        return {"items": self.items, "message": f"Pushed {item} to stack"}
    
    def pop(self):
        if not self.is_empty():
            item = self.items.pop()
            return {"items": self.items, "message": f"Popped {item} from stack"}
        return {"items": self.items, "message": "Stack is empty"}
    
    def peek(self):
        if not self.is_empty():
            return {"items": self.items, "message": f"Top item is {self.items[-1]}"}
        return {"items": self.items, "message": "Stack is empty"}
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return {"items": self.items, "message": f"Stack size is {len(self.items)}"}

class Queue:
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        self.items.append(item)
        return {"items": self.items, "message": f"Enqueued {item} to queue"}
    
    def dequeue(self):
        if not self.is_empty():
            item = self.items.pop(0)
            return {"items": self.items, "message": f"Dequeued {item} from queue"}
        return {"items": self.items, "message": "Queue is empty"}
    
    def peek(self):
        if not self.is_empty():
            return {"items": self.items, "message": f"Front item is {self.items[0]}"}
        return {"items": self.items, "message": "Queue is empty"}
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return {"items": self.items, "message": f"Queue size is {len(self.items)}"}
class SortingAlgorithms:
    @staticmethod
    def bubble_sort(arr):
        steps = []
        n = len(arr)
        for i in range(n):
            swapped = False
            for j in range(0, n - i - 1):
                # Record comparison step
                steps.append({
                    'array': arr.copy(),
                    'comparing': [j, j + 1],
                    'swapping': False
                })
                
                if arr[j] > arr[j + 1]:
                    # Record swap step
                    steps.append({
                        'array': arr.copy(),
                        'comparing': [j, j + 1],
                        'swapping': True
                    })
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swapped = True
            
            if not swapped:
                break
        
        # Record final state
        steps.append({
            'array': arr.copy(),
            'comparing': [],
            'swapping': False,
            'done': True
        })
        
        return steps

class BinarySearch:
    @staticmethod
    def search(arr, target):
        steps = []
        left, right = 0, len(arr) - 1
        
        while left <= right:
            mid = (left + right) // 2
            
            # Record current step
            steps.append({
                'array': arr,
                'left': left,
                'right': right,
                'mid': mid,
                'target': target,
                'found': False
            })
            
            if arr[mid] == target:
                steps.append({
                    'array': arr,
                    'left': left,
                    'right': right,
                    'mid': mid,
                    'target': target,
                    'found': True
                })
                return steps
            
            if arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        
        # Target not found
        steps.append({
            'array': arr,
            'left': -1,
            'right': -1,
            'mid': -1,
            'target': target,
            'found': False,
            'done': True
        })
        
        return steps

class Graph:
    def __init__(self):
        self.graph = {}
    
    def add_vertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = []
    
    def add_edge(self, v1, v2):
        if v1 not in self.graph:
            self.add_vertex(v1)
        if v2 not in self.graph:
            self.add_vertex(v2)
        
        self.graph[v1].append(v2)
        self.graph[v2].append(v1)  # For undirected graph
    
    def bfs(self, start):
        steps = []
        visited = set()
        queue = deque([start])
        visited.add(start)
        
        while queue:
            current = queue.popleft()
            
            # Record current step
            steps.append({
                'graph': dict(self.graph),
                'visited': list(visited),
                'queue': list(queue),
                'current': current
            })
            
            for neighbor in self.graph[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        # Record final state
        steps.append({
            'graph': dict(self.graph),
            'visited': list(visited),
            'queue': list(queue),
            'current': None,
            'done': True
        })
        
        return steps
        
# Initialize data structures
stack = Stack()
queue = Queue()

# Initialize new data structures
sorting = SortingAlgorithms()
binary_search = BinarySearch()
graph = Graph()

# Initialize sample graph
graph.add_edge('A', 'B')
graph.add_edge('A', 'C')
graph.add_edge('B', 'D')
graph.add_edge('C', 'D')
graph.add_edge('C', 'E')
graph.add_edge('D', 'E')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/stack/<action>', methods=['POST'])
def stack_operations(action):
    data = request.get_json()
    
    if action == 'push':
        return jsonify(stack.push(data.get('value')))
    elif action == 'pop':
        return jsonify(stack.pop())
    elif action == 'peek':
        return jsonify(stack.peek())
    elif action == 'size':
        return jsonify(stack.size())
    
    return jsonify({"error": "Invalid action"})

@app.route('/api/queue/<action>', methods=['POST'])
def queue_operations(action):
    data = request.get_json()
    
    if action == 'enqueue':
        return jsonify(queue.enqueue(data.get('value')))
    elif action == 'dequeue':
        return jsonify(queue.dequeue())
    elif action == 'peek':
        return jsonify(queue.peek())
    elif action == 'size':
        return jsonify(queue.size())
    
    return jsonify({"error": "Invalid action"})

# Add these new routes after the existing ones

@app.route('/api/sorting/bubble', methods=['POST'])
def bubble_sort():
    data = request.get_json()
    arr = data.get('array', [])
    if not arr:
        arr = random.sample(range(1, 101), 10)  # Generate random array if none provided
    
    steps = sorting.bubble_sort(arr.copy())
    return jsonify({'steps': steps})

@app.route('/api/search/binary', methods=['POST'])
def binary_search_route():
    data = request.get_json()
    arr = sorted(data.get('array', []))  # Ensure array is sorted
    target = data.get('target')
    
    if not arr:
        arr = sorted(random.sample(range(1, 101), 10))
    
    steps = binary_search.search(arr, target)
    return jsonify({'steps': steps})

@app.route('/api/graph/bfs', methods=['POST'])
def bfs_traversal():
    data = request.get_json()
    start = data.get('start', 'A')  # Default start vertex
    
    steps = graph.bfs(start)
    return jsonify({'steps': steps})

if __name__ == '__main__':
    app.run(debug=True)

