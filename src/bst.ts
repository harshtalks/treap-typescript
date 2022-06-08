type BST = {
  key: number;
  left: BST;
  right: BST;
} | null;

class Tree {
  root: BST;
  constructor() {
    this.root = null;
  }

  preview() {
    console.log(this.root);
  }

  insert(node: BST) {
    if (!node) {
      throw new Error("error");
    }

    let temp: BST = this.root;
    let p: BST = null;
    while (temp !== null) {
      p = temp;
      if (node.key < temp.key) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }

    if (p === null) {
      this.root = node;
    } else if (node.key < p.key) {
      p.left = node;
    } else p.right = node;
  }

  min(x: BST) {
    if (x === null) {
      throw new Error("error");
    }
    while (x.left !== null) {
      x = x.left;
    }
    return x;
  }

  max(x: BST) {
    if (x === null) {
      throw new Error("error");
    }
    while (x.right !== null) {
      x = x.right;
    }
    return x;
  }

  search(node: BST, key: number): BST | null {
    if (!node) {
      return null;
    }

    if (node.key === key) {
      return node;
    }

    if (node.key > key) {
      return this.search(node.left, key);
    } else return this.search(node.right, key);
  }

  rootValue() {
    return this.root;
  }

  inOrderTreeWalk(node: BST) {
    if (node) {
      this.inOrderTreeWalk(node.left);
      console.log(node.key);
      this.inOrderTreeWalk(node.right);
    }
  }

  preOrderTraversal(node: BST) {
    if (node) {
      console.log(node.key);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  postOrderTraversal(node: BST) {
    if (node) {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.key);
    }
  }
}

export default Tree;
