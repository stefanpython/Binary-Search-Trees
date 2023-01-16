const Node = require("./node");

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
}

let arr = [1, 4, 6, 7, 2, 2, 1, 3];

function buildTree(arr, start, end) {
  let sortedArr = [...new Set(arr.sort())];

  if (start > end) {
    return null;
  }

  let mid = parseInt((start + end) / 2);
  let node = new Node(sortedArr[mid]);

  node.left = buildTree(sortedArr, start, mid - 1);
  node.right = buildTree(sortedArr, mid + 1, end);
  return node;
}

buildTree();
