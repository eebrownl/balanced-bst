class Node {
    constructor(data) {
        this.data = data;
        this.left = null; 
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.array = [...removeDuplicates(mergeSort(array))];
        this.root = this.buildTree(this.array, 0, this.array.length -1);

    }

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = parseInt((start + end) /2); //do I need Math.floor?
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }

    findValue(value, root = this.root) {
        if(root === null) {
            return false;
        }
        
        if(value === root) {
            return root;
        }

        if(value < root.data) {
            return this.findValue(value, root.left)
        } else if(value > root.data) {
            return this.findValue(value, root.right)
        }
        
        return root;
    }

    insertNew(value, root = this.root) {
        if(root == null) {
            return (root = new Node(value));
        }

        if(root.data > value) {
            root.left = this.insertNew(value, root.left)
        } else {
            root.right = this.insertNew(value, root.right);
        }

        return root
    }

    inOrder() {
        let visited = [];
        let current = this.root;

        let traverse = node => {
            if(node.left) traverse(node.left);
            visited.push(node.data);

            if(node.right) traverse(node.right);
        };

        traverse(current);
        return visited;
    }

    preOrder() {
        let visited = [];
        let current = this.root;

        let traverse = node => {
            visited.push(node.data);
            if (node.left) {
                traverse(node.left)
            }
            if (node.right) {
                traverse(node.right)
            }
        }

        traverse(current);
        return visited;
    }

    postOrder() {
        let visited = [];
        let current = this.root; 

        let traverse = node => {
            if(node.left) {
                traverse(node.left);
            }
            if(node.right) {
                traverse(node.right);
            }
            visited.push(node.data)
        };
        traverse(current);
        return visited;
    }

    BreadthFirstSearch() {
        let visited = [],
        queue = [], 
        current = this.root;

        queue.push(current);
        while (queue.length) {
            current = queue.shift();
            visited.push(current.data);

            if(current.left) {
                queue.push(current.left)
            }
            if(current.right) {
                queue.push(current.right);
            }
        }
        return visited;
    }
    


}
function mergeSort(unsortedArray) {
    if (unsortedArray.length < 2) {
        return unsortedArray;
    } else {
        const middle = Math.floor(unsortedArray.length / 2);
        const left = unsortedArray.slice(0, middle); 
        const right = unsortedArray.slice(middle)

        function merge(left, right) {
            let resultArray = []
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    resultArray.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    resultArray.push(right[rightIndex]);
                    rightIndex++;
                }
            } return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        } return merge(mergeSort(left), mergeSort(right));
    }
}

function removeDuplicates(array) {
    return [...new Set(array)];
}

let testArray = [4,1,2,9,5,3,7,8]
let testTree = new Tree(testArray)

console.log(testTree)
console.log(testTree.postOrder())
console.log(testTree.BreadthFirstSearch())


