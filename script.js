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

let testArray = [4,1,2,9,5,7,3,8,8,8,8]
let testTree = new Tree(testArray)


console.log(testTree)

