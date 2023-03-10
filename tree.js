const prettyPrint = require("./prettyPrint");
const randomArray = require("./randomArray");

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

  /* using iteration

  levelOrder(fn) {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      fn(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  */

  levelOrder(fn) {
    let values = [];

    if (!fn) {
      fn = (node) => {
        values.push(node.value);
      };
    }
    this._levelOrder(this.root, fn);

    console.log(values);
    return values;
  }

  _levelOrder(node, fn) {
    if (!node) return;
    fn(node);

    this._levelOrder(node.left, fn);
    this._levelOrder(node.right, fn);
  }

  logNodeValue(node) {
    console.log(node.value);
  }

  preorder(root, fn = null) {
    let result = [];
    if (root === null) return result;

    if (fn === null) {
      result.push(root.value);
    } else {
      fn(root.value);
    }
    result = result.concat(this.preorder(root.left, fn));
    result = result.concat(this.preorder(root.right, fn));
    return result;
  }

  inorder(root, fn = null) {
    let result = [];
    if (root === null) return result;

    result = result.concat(this.inorder(root.left, fn));
    if (fn === null) {
      result.push(root.value);
    } else {
      fn(root.value);
    }
    result = result.concat(this.inorder(root.right, fn));

    return result;
  }

  postorder(root, fn = null) {
    let result = [];
    if (root === null) return result;

    result = result.concat(this.postorder(root.left));
    result = result.concat(this.postorder(root.right));
    if (fn === null) {
      result.push(root.value);
    } else {
      fn(root.value);
    }

    return result;
  }

  max(root) {
    if (root === null) {
      console.log("Error: Tree is empty.");
      return -1;
    } else if (root.right === null) {
      return root.value;
    }
    return this.max(root.right);
  }

  height(node = this.root) {
    if (node === null) return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, value, level = 0) {
    if (node === null) return -1;
    if (node.value === value) return level;
    let left = this.depth(node.left, value, level + 1);
    if (left !== -1) return left;
    return this.depth(node.right, value, level + 1);
  }

  isBalanced(root) {
    if (this.height(root.left) - this.height(root.right) <= 1) {
      return true;
    } else return false;
  }

  reBalance() {
    const inOrderList = this.inorder();
    this.root = this.buildTree(inOrderList);
  }
}

const bst = new Tree(randomArray);

const driver = () => {
  // bst.insert(10);
  // bst.insert(5);
  // bst.insert(15);
  // bst.insert(3);
  // bst.insert(7);
  // bst.insert(21);

  prettyPrint(bst.root);

  bst.delete(21);
  prettyPrint(bst.root);

  console.log("Is value present in BST?:");
  console.log(bst.find(bst.root, 30));

  console.log("Levelorder:");
  bst.levelOrder();

  console.log("<--preorder-->");
  console.log(bst.preorder(bst.root));

  console.log("<--inorder-->");
  console.log(bst.inorder(bst.root));

  console.log("<--postorder-->");
  console.log(bst.postorder(bst.root));
  console.log("Max value of bst:");
  console.log(bst.max(bst.root));
  console.log("Height of tree:");
  console.log(bst.height());
  console.log("Depth of node value:");
  console.log(bst.depth(bst.root, 5));
  console.log("Is BST balanced?:");
  console.log(bst.isBalanced(bst.root));
};

driver();
