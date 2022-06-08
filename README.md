# Treaps

Treap1 is just the portmanteau of tree and heap. Binary search trees, in fact, offer
the best average performance across all standard operations: insert, remove, and search (and also min and max).

Heaps, on the other hand, allow us to efficiently keep track of priorities using a tree-like structure. Since binary heaps are also binary trees, the two structures seem compatible; we only need to find a way to make them co-exist in the same structure, and we could get the best of both.

#### It’s easier said than done, however! If we have a set of unidimensional data, we can’t enforce BST’s and heap’s invariants at the same time:

- Either we add a “horizontal” constraint (given a node N, with two children L, its left child, and R, its right child, then all keys in the left subtree—rooted at L— must be smaller than N’s key, and all keys in the right subtree—rooted at R— must be larger than N’s key).
- Or we add a “vertical” constraint: the key in the root of any subtree must be the smallest of the subtree.

# Randomized BST:

Randomized Treaps are the main application for treaps. In general, we can use a Randomized Treap everywhere we would use a BST. In particular, they are indicated for situations where we need a balanced tree, but we are
fine with having guarantees on the average case only, not on the worst case.
