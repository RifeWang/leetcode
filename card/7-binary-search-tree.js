// ----------------------------
// ----------------------------
//          二叉搜索树
// ----------------------------
// ----------------------------



// ----------- 验证二叉搜索树 -----------
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    // 中序遍历的结果有序递增
    function inorderTraversal (root) {
        const result = [];
        if (root != null) {
            result.push(...inorderTraversal(root.left));
            result.push(root.val);
            result.push(...inorderTraversal(root.right));
        }
        return result;
    }
    const arr = inorderTraversal(root);
    for(let i=0; i<arr.length-1; i++) {
        if(arr[i] >= arr[i+1]) {
            return false;
        }
    }
    return true;
};




// ----------- 二叉搜索树迭代器 -----------
/**
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
    function midTravel(root) {
        const result = [];
        if (root != null) {
            result.push(...midTravel(root.left));
            result.push(root.val);
            result.push(...midTravel(root.right));
        }
        return result;
    }
    this._queue = midTravel(root);
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    return this._queue.shift();
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this._queue.length > 0;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */



// ----------- Search in a Binary Search Tree -----------
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
    while(root != null && root.val != val) {
        root = root.val < val ? root.right : root.left;
    }
    return root;
};



// ----------- Insert into a Binary Search Tree -----------
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    const node = new TreeNode(val);
    if (root == null) {
        root = node;
        return root;
    }
    let cur = root;
    while (1) {
        if (cur.val > val) {
            if (cur.left == null) {
                cur.left = node;
                break;
            } else {
                cur = cur.left;
            }
        } else {
            if (cur.right == null) {
                cur.right = node;
                break;
            } else {
                cur = cur.right;
            }
        }
    }
    return root;
};



// ----------- Delete Node in a BST -----------
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    if (root == null) {
        return null;
    }

    let father = null; // 需要删除节点的父节点
    let cur = root; // 需要删除的节点
    while(cur != null) {
        if (cur.val === key) {
            break;
        }
        if (cur.val < key) {
            father = cur;
            cur = cur.right;
        }
        if (cur.val > key) {
            father = cur;
            cur = cur.left;
        }
    }
    if (cur == null) { // 无需删除
        return root;
    }

    if (cur.left == null && cur.right == null) { // 删除的节点没有叶子节点
        if (father == null) { // 删除的是根节点
            return null;
        }
        if (father.val < cur.val) {
            father.right = null;
        } else {
            father.left = null;
        }
        return root;
    }

    else if (cur.left == null || cur.right == null) { // 删除的节点有一个叶子节点
        if (father == null) { // 删除的是根节点
            root = cur.left == null ? cur.right : cur.left;
        } else {
            if (father.val > cur.val) {
                father.left = cur.left == null ? cur.right : cur.left;
            } else {
                father.right = cur.left == null ? cur.right : cur.left;
            }
        }
        return root;
    }

    else { // 删除的节点有两个叶子节点
        // 找到中序后继节点及其父节点
        let cfather = cur; // 中序后继父节点
        let rc = cur.right; // 中序后继节点
        while (rc.left != null) {
            cfather = rc;
            rc = rc.left;
        }

        // 替换节点
        cur.val = rc.val;
        // 删除中序后继，后继节点可能是左子节点，也可能是子根节点，需判断其是否有右子节点，有则需要连接
        if (cfather.val > rc.val) {
            cfather.left = rc.right != null ? rc.right : null;
        } else {
            cfather.right = rc.right != null ? rc.right : null;
        }
        return root;
    }
};



// ----------- Kth Largest Element in a Stream -----------
/**
 * @param {number} k
 * @param {number[]} nums
 */
class TreeNode {
    constructor(val) {
        this.val = val;
        this.count = 1;
        this.left = this.right = null;
    }
}
class BST {
    constructor() {
        this.root = null;
    }

    add(val) {
        const node = new TreeNode(val);
        if (this.root == null) {
            this.root = node;
        } else {
            let cur = this.root;
            while (1) {
                cur.count++;
                if (cur.val > val) {
                    if (cur.left != null) {
                        cur = cur.left;
                    } else {
                        cur.left = node;
                        break;
                    }
                } else {
                    if (cur.right != null) {
                        cur = cur.right;
                    } else {
                        cur.right = node;
                        break;
                    }
                }
            }
        }
    }

    searchK(k) {
        function s (k, root) {
            if (k == 1 && root.count == 1) {
                return root.val;
            }
            if ((root.right && root.right.count + 1 == k) || (root.right == null && k == 1 ) ) { // 当前子树的根
                return root.val;
            }
            if (root.right && root.right.count >= k) {
                return s(k, root.right);
            } else {
                return s(k - (root.right ? root.right.count : 0) - 1, root.left);
            }
        }
        return s(k, this.root);
    }
}
var KthLargest = function(k, nums) {
    this._k = k;
    this._bst = new BST();
    nums.map(val => this._bst.add(val) );
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    this._bst.add(val);
    return this._bst.searchK(this._k);
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */




// ----------- 二叉搜索树的最近公共祖先 -----------
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root == null) {
        return null;
    }
    if (root.val == p.val || root.val == q.val) {
        return root;
    }
    if ((p.val - root.val) * (q.val - root.val) < 0) {
        return root;
    }
    return p.val > root.val ? lowestCommonAncestor(root.right, p, q) : lowestCommonAncestor(root.left, p, q);
};




// ----------- 存在重复元素 III -----------
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j <= i+k && j < nums.length; j++) {
            if (Math.abs(nums[i] - nums[j]) <= t) {
                return true;
            }
        }
    }
    return false;
};




// ----------- 平衡二叉树 -----------
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    function height(root) {
        if (root == null) {
            return 0;
        }
        if (root.left == null && root.right == null) {
            return 1;
        }
        return 1 + Math.max(height(root.left), height(root.right));
    }

    if (root == null) {
        return true;
    }
    if (Math.abs(height(root.left) - height(root.right)) > 1) {
        return false;
    }
    return isBalanced(root.left) && isBalanced(root.right);
};




// ----------- 将有序数组转换为二叉搜索树 -----------
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if (nums.length == 0) {
        return null;
    }
    if (nums.length == 1) {
        return new TreeNode(nums[0]);
    }
    if (nums.length == 2) {
        const root = new TreeNode(nums[1]);
        root.left = new TreeNode(nums[0]);
        return root;
    }
    if (nums.length == 3) {
        const root = new TreeNode(nums[1]);
        root.left = new TreeNode(nums[0]);
        root.right = new TreeNode(nums[2]);
        return root;
    }

    const mid = Math.floor(nums.length / 2);
    const root = new TreeNode(nums[mid]);
    root.left = sortedArrayToBST(nums.slice(0, mid));
    root.right = sortedArrayToBST(nums.slice(mid+1));
    return root;
};
