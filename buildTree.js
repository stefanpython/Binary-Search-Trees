const Node = require("./node");

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
}

function buildTree(arr) {
  // Sort and remove duplicates from the array
  arr = [...new Set(arr)].sort((a, b) => a - b);

  // Helper function to create the tree
  function createNode(arr, start, end) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const node = new Node(arr[middle]);

    node.left = createNode(arr, start, middle - 1);
    node.right = createNode(arr, middle + 1, end);

    return node;
  }

  // Create the tree
  return console.log(createNode(arr, 0, arr.length - 1));
}

buildTree([5, 3, 5, 6, 8, 15, 4, 32]);
