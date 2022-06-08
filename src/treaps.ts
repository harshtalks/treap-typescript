class TreapNode {
  key: string;
  priority: number;
  left: TreapNode;
  right: TreapNode;
  parent: TreapNode;

  constructor(key: string, priority: number) {
    this.key = key;
    this.priority = priority;

    this.left = this.right = this.parent = null;
  }

  setLeft(node: TreapNode) {
    this.left = node;
    if (node !== null) {
      node.parent = this;
    }
  }

  setRight(node: TreapNode) {
    this.right = node;
    if (node !== null) {
      node.parent = this;
    }
  }

  isRoot() {
    return this.parent === null;
  }

  isLeaf() {
    return this.left === null && this.right === null;
  }
}

class Treap {
  root: TreapNode;

  constructor() {
    this.root = null;
  }

  rightRotation(node: TreapNode) {
    if (node === null || node.parent === null) {
      throw new Error("Error, node should have a parent, and cant be null. ");
    }

    const parentNode = node.parent;
    const parentParentNode = parentNode.parent;

    if (parentNode.left !== node) {
      throw new Error("right rotation only on the left child");
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

    parentNode.setLeft(node.right);
    node.setRight(parentNode);
  }

  leftRotation(node: TreapNode) {
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

  search(node: TreapNode, key: string): null | TreapNode {
    if (node === null) {
      return null;
    }

    if (node.key === key) {
      return node;
    } else if (node.key > key) {
      return this.search(node.left, key);
    } else return this.search(node.right, key);
  }

  insert(key: string, priority: number) {
    let node = this.root;
    let parent: TreapNode = null;

    const newNode = new TreapNode(key, priority);

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

  // removing method

  remove(key: string) {
    /**
     *  Searches for the keyinthe treap
     */
    const nodeToDelete = this.search(this.root, key);
    console.log(nodeToDelete);

    /**
     * If search returned null, then there is no such key stored, and hence it can’t be deleted.
     */

    if (!nodeToDelete) {
      return false;
    }

    /**
     *  If the treap only contained one node, then removing it will just leave an empty tree.
     *  We can check that by either testing if the treap’s size is 1,
     *  or equivalently if node is both a leaf and the root.
     */

    if (nodeToDelete.isRoot() && nodeToDelete.isLeaf()) {
      this.root = null;
      return true;
    }

    /**
     * we need to push down this node all the way to the leaves level.
     */

    // now we will go down the tree
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

  preview() {
    console.log(this.root);
  }

  top() {
    if (this.root === null) {
      throw new Error("Error, as the treap is empty");
    }

    const key = this.root.key;
    this.remove(key);

    return key;
  }

  peek() {
    return this.root;
  }

  min() {
    if (this.root === null) {
      throw new Error("Error, as the treap is empty");
    }
    let node = this.root;

    while (node.left) {
      node = node.left;
    }

    return node.key;
  }

  max() {
    if (this.root === null) {
      throw new Error("Error, as the treap is empty");
    }
    let node = this.root;

    while (node.right) {
      node = node.right;
    }

    return node.key;
  }
}

export default Treap;
