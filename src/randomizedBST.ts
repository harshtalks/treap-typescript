class BSTNode {
  key: string;
  priority: number;
  left: BSTNode;
  right: BSTNode;
  parent: BSTNode;

  constructor(key: string, priority: number) {
    this.key = key;
    this.priority = priority;
    this.parent = this.left = this.right = null;
  }

  setLeft(node: BSTNode) {
    this.left = node;
    if (node !== null) {
      node.parent = this;
    }
  }

  setRight(node: BSTNode) {
    this.right = node;
    if (node !== null) {
      node.parent = this;
    }
  }

  isRoot() {
    return this.parent === null;
  }

  isChild() {
    return this.left === null && this.right === null;
  }
}

class BalancedBST {
  root: BSTNode;

  constructor() {
    this.root = null;
  }

  rightRotation(node: BSTNode) {
    if (node === null || node.parent === null) {
      throw new Error("node has to be an indermediatory one.");
    }

    const parentNode = node.parent;
    if (parentNode.left !== node) {
      throw new Error("node has to be a left child of a parent.");
    }
    const grandPaNode = parentNode.parent;

    if (grandPaNode) {
      if (grandPaNode.left === parentNode) {
        grandPaNode.setLeft(node);
      } else {
        grandPaNode.setRight(node);
      }
    } else {
      this.root = node;
    }

    parentNode.setLeft(node.right);
    node.setRight(parentNode);
  }

  leftRotation(node: BSTNode) {
    if (node === null || node.parent === null) {
      throw new Error("Error, node should have a parent, and cant be null. ");
    }

    const parentNode = node.parent;
    const parentParentNode = parentNode.parent;

    if (parentNode.right !== node) {
      throw new Error("left rotation only on the right child");
    }

    if (parentParentNode) {
      if (parentParentNode.left === parentNode) {
        parentParentNode.setLeft(node);
      } else {
        parentParentNode.setRight(node);
      }
    } else {
      this.root = node;
    }

    parentNode.setRight(node.left);
    node.setLeft(parentNode);
  }

  insert(key: string) {
    let node = this.root;
    let parent: BSTNode = null;

    const priority = Math.random() * 10000;

    const newNode = new BSTNode(key, priority);

    while (node !== null) {
      parent = node;

      if (node.key >= key) {
        node = node.left;
      } else node = node.right;
    }

    if (parent === null) {
      this.root = newNode;
      return;
    } else {
      if (parent.key >= newNode.key) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
      newNode.parent = parent;
    }

    while (
      newNode.parent !== null &&
      newNode.parent.priority > newNode.priority
    ) {
      if (newNode.parent.left === newNode) {
        this.rightRotation(newNode);
      } else {
        this.leftRotation(newNode);
      }
    }
  }

  search(node: BSTNode, key: string): null | BSTNode {
    if (node === null) {
      return null;
    }

    if (node.key === key) {
      return node;
    }

    if (node.key > key) {
      return this.search(node.left, key);
    } else {
      this.search(node.right, key);
    }
  }

  remove(key: string) {
    const nodeToDelete = this.search(this.root, key);

    if (!nodeToDelete) {
      return false;
    }

    if (nodeToDelete.isChild() && nodeToDelete.isRoot()) {
      this.root = null;
      return true;
    }

    while (nodeToDelete.left !== null || nodeToDelete.right !== null) {
      if (
        nodeToDelete.left !== null &&
        (nodeToDelete.right === null ||
          nodeToDelete.left.priority < nodeToDelete.right.priority)
      ) {
        this.rightRotation(nodeToDelete.left);
      } else {
        this.leftRotation(nodeToDelete.right);
      }
    }

    if (nodeToDelete.parent.left === nodeToDelete) {
      nodeToDelete.parent.left = null;
    } else {
      nodeToDelete.parent.right = null;
    }

    return true;
  }

  min() {
    if (this.root === null) {
      throw new Error("Error, as the treap is empty");
    }

    let node = this.root;

    while (node !== null) {
      node = node.left;
    }

    return node.key;
  }

  max() {
    if (this.root === null) {
      throw new Error("Error, as the treap is empty");
    }

    let node = this.root;

    while (node !== null) {
      node = node.right;
    }

    return node.key;
  }

  preview() {
    console.log(this.root);
  }
}

export default BalancedBST;
