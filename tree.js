const prettyPrint = require("./prettyPrint");

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
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
    return createNode(arr, 0, arr.length - 1);
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (!root) return null;
    if (value < root.value) root.left = this.deleteNode(root.left, value);
    else if (value > root.value)
      root.right = this.deleteNode(root.right, value);
    else if (!root.left) return root.right;
    else if (!root.right) return root.left;
    else {
      let minRight = root.right;
      while (minRight.left) minRight = minRight.left;
      root.value = minRight.value;
      root.right = this.deleteNode(root.right, minRight.value);
    }
    return root;
  }

  find(root, value) {
    if (!root) {
      return false;
    } else {
      if (root.value === value) {
        return true;
      } else if (value < root.left) {
        return this.find(root.left, value);
      } else {
        return this.find(root.right, value);
      }
    }
  }
}

const bst = new Tree();

bst.insert(12);
bst.insert(30);
bst.insert(45);
bst.insert(50);

prettyPrint(bst.root);

bst.delete(45);
prettyPrint(bst.root);

console.log(bst.find(bst.root, 30));
