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

    remove(value) {
        const removeNode = (node, value) => {
            if(!node) {
                return null;
            }

            if(value === node.data) {
                if(!node.left && !node.right) {
                    return null;
                }

                if(!node.left) {
                    return node.right;
                }

                if(!node.right) {
                    return node.left
                }
                //I've handled the easy cases. Need to insert code for when there are two children.

                
            } else if (value < node.data) {
                node.left = removeNode(node.left, value);
                return node;
            } else {
                node.right = removeNode(node.right, value);
                return node;
            }
        }
        this.root = removeNote(this.root, value)
    }


}


// function minValue(root) {
//     let min = root.data; 
//     while(root !== null) {
//         min = root.data; 
//         root = root.left
//     }
//     return min;
// }

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


