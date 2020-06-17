// ----------------------------
// ----------------------------
//           二叉树
// ----------------------------
// ----------------------------



/**
 * 二叉树的前序遍历
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    const result = [];
    if (root != null) {
        result.push(root.val);
        result.push(...preorderTraversal(root.left));
        result.push(...preorderTraversal(root.right));
    }
    return result;
};



/**
 * 二叉树的中序遍历
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const result = [];
    if (root != null) {
        result.push(...inorderTraversal(root.left));
        result.push(root.val);
        result.push(...inorderTraversal(root.right));
    }
    return result;
};



/**
 * 二叉树的后续遍历
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    const result = [];
    if (root != null) {
        result.push(...postorderTraversal(root.left));
        result.push(...postorderTraversal(root.right));
        result.push(root.val);
    }
    return result;
};



/**
 * 二叉树的层序遍历
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (root == null) {
        return [];
    }
    const queue = [];
    const result = [];
    queue.push(root);
    for (let i = 0; i < queue.length; ) {
        result.push(queue.slice(i).map(v => v.val));
        t = queue.length;
        queue.slice(i).map(n => {
            if (n.left != null) {
                queue.push(n.left);
            }
            if (n.right != null) {
                queue.push(n.right);
            }
        });
        i = t;
    }
    return result;
};



/**
 * 二叉树的最大深度
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}



/**
 * 对称二叉树
 *
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
var isSymmetric = function(root) {
    if (root == null) {
        return true;
    }
    // 层序遍历，验证每一层是否对称
    const queue = [];
    queue.push(root);
    for (let i = 0; i < queue.length; ) {
        const t = queue.length;
        let finish = true;
        const level = queue.slice(i).map(v => {
            if (v != 'null') {
                finish = false;
            }
            queue.push(v ? v.left || 'null' : 'null'); // 不能直接传 null , 因为后续 join 会被忽略掉
            queue.push(v ? v.right || 'null' : 'null');
            return v ? v.val : 'null';
        });
        if (finish) { // 当前层全是 null
            return true;
        }

        i = t;
        if (level.join(',') !== level.reverse().join(',')) {
            return false;
        }
    }
    return true;
};



/**
 * 路径总和
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if (root == null) {
        return false;
    }
    if (root.left == null && root.right == null) {
        return sum == root.val ? true : false;
    }

    return hasPathSum(root.left, sum-root.val) || hasPathSum(root.right, sum-root.val);
};



/**
 * 从中序与后序遍历序列构造二叉树
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    if (inorder.length == 0) {
        return null;
    }

    // 递归调用
    if (inorder.length == 1) {
        const root = new TreeNode(postorder.pop());
        return root;
    }

    const rootv = postorder[postorder.length-1];
    const rootIndex = inorder.indexOf(rootv);
    const root = new TreeNode(rootv);
    const leftTree = inorder.slice(0, rootIndex);
    const rightTree = inorder.slice(rootIndex+1);

    root.left = buildTree(leftTree, postorder.filter(v => leftTree.includes(v)));
    root.right = buildTree(rightTree, postorder.filter(v => rightTree.includes(v)));
    return root;
};



/**
 * 从前序与中序遍历序列构造二叉树
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (preorder.length == 0) {
        return null;
    }

    if (preorder.length == 1) {
        const root = new TreeNode(preorder[0]);
        return root;
    }

    const rootv = preorder[0];
    const rootIndex = inorder.indexOf(rootv);
    const root = new TreeNode(rootv);
    const leftTree = inorder.slice(0, rootIndex);
    const rightTree = inorder.slice(rootIndex+1);
    root.left = buildTree(preorder.filter(v => leftTree.includes(v)), leftTree);
    root.right = buildTree(preorder.filter(v => rightTree.includes(v)), rightTree);
    return root;
};



/**
 * 填充每个节点的下一个右侧节点指针
 *
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    // 层序遍历
    if (root === null) {
        return root;
    }

    const queue = [];
    queue.push(root);
    for (let i = 0; i < queue.length; ) {
        const t = queue.length;
        const level = queue.slice(i);
        for (let j = 0; j < level.length; j++) {
            // 添加下一层节点
            if (level[j].left !== null) {
                queue.push(level[j].left);
            }
            if (level[j].right !== null) {
                queue.push(level[j].right);
            }

            // 操作当前层 next 指针
            if (j < level.length - 1) {
                level[j].next = level[j+1];
            }
        }
        i = t;
    }
    return root;
};



/**
 * 填充每个节点的下一个右侧节点指针 II
 *
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    // 层序遍历
    if (root === null) {
        return root;
    }

    const queue = [];
    queue.push(root);
    for (let i = 0; i < queue.length; ) {
        const t = queue.length;
        const level = queue.slice(i);
        for (let j = 0; j < level.length; j++) {
            // 添加下一层节点
            if (level[j].left !== null) {
                queue.push(level[j].left);
            }
            if (level[j].right !== null) {
                queue.push(level[j].right);
            }

            // 操作当前层 next 指针
            if (j < level.length - 1) {
                level[j].next = level[j+1];
            }
        }
        i = t;
    }
    return root;
};



/**
 * 二叉树的最近公共祖先
 *
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
    if (root === null) {
        return null;
    }
    if (root.val == p.val || root.val == q.val) {
        return root;
    }
    const left = lowestCommonAncestor(root.left, p, q); // 左子树 LCA
    const right = lowestCommonAncestor(root.right, p, q); // 右子树 LCA
    if (left != null && right != null) {
        return root;
    }
    if (left == null) {
        return right;
    } else {
        return left;
    }

    // ----------------------------------------
    // 层序遍历，从上到下从左到右编号，向上寻找同父编号
    // 树不平衡且高度过高时，编号超出精度，BigInt 也不好处理
    // ----------------------------------------
    // if (root === null) {
    //     return null;
    // }
    // if (root.val == p.val || root.val == q.val) {
    //     return root;
    // }
    // let queue = [];
    // queue.push({ node: root, index: 1 });  // 层序遍历的编号从 1 开始
    // let pi = undefined; // 记录编号
    // let qi = undefined;
    // for ( ; queue.length > 0; ) {
    //     if (pi !== undefined && qi !== undefined) {
    //         break;
    //     }

    //     const nq = [];
    //     queue.map(v => {
    //         if (v.node.left) { // 只能记录存在的 child ，因为树不平衡时会导致内存不够
    //             nq.push({node: v.node.left, index: v.index * 2 });
    //             if (v.node.left.val == p.val) {
    //                 pi = v.index * 2;
    //             }
    //             if (v.node.left.val == q.val) {
    //                 qi = v.index * 2;
    //             }
    //         }
    //         if (v.node.right) {
    //             nq.push({node: v.node.right, index: v.index * 2 + 1 });
    //             if (v.node.right.val == p.val) {
    //                 pi = v.index * 2 + 1;
    //             }
    //             if (v.node.right.val == q.val) {
    //                 qi = v.index * 2 + 1;
    //             }
    //         }
    //     });
    //     queue = nq;
    // }

    // // 计算层数，从 0 开始
    // let pl = Math.floor(Math.log2(pi));
    // let ql = Math.floor(Math.log2(qi));

    // // 向上层寻找
    // if (pl > ql) {
    //     pi = Math.floor(pi / (Math.pow(2, pl-ql)));
    // }
    // if (pl < ql) {
    //     qi = Math.floor(qi / (Math.pow(2, ql-pl)));
    // }
    // while ( pi != qi ) {
    //     pi =  Math.floor(pi / 2);
    //     qi =  Math.floor(qi / 2);
    // }
    // if (pi == 1) {
    //     return root;
    // }

    // // 找到编号对应的节点
    // queue = [];
    // queue.push({ node: root, index: 1 });
    // let result = null;
    // for ( ; result === null; ) {
    //     const nq = [];
    //     queue.map(v => {
    //         if (v.node.left) { // 只能记录存在的 child ，因为树不平衡时会导致内存不够
    //             nq.push({node: v.node.left, index: v.index * 2 });
    //             if ( v.index * 2  == pi) {
    //                 result = v.node.left;
    //             }
    //         }
    //         if (v.node.right) {
    //             nq.push({node: v.node.right, index: v.index * 2 + 1 });
    //             if (v.index * 2 + 1 == pi) {
    //                 result = v.node.right;
    //             }
    //         }
    //     });
    //     queue = nq;
    // }

    // return result;
    // ----------------------------------------
};



/**
 * 二叉树的序列化与反序列化
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    // ------------------------
    // 层序遍历依次编号，注意 BigInt
    // ------------------------
    if (root == null) {
        return 'null';
    }

    let result = `1:${root.val}`;
    let queue = [];
    queue.push({ node: root, index: 1n });
    for ( ; queue.length > 0; ) {
        const nq = [];
        queue.map(v => {
            if (v.node.left) {
                nq.push({ node: v.node.left, index: v.index * 2n });
                result += `,${v.index * 2n}:${v.node.left.val}`;
            }
            if (v.node.right) {
                nq.push({ node: v.node.right, index: v.index * 2n + 1n });
                result += `,${v.index * 2n + 1n}:${v.node.right.val}`;
            }
        });
        queue = nq;
    }

    return result;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (data === 'null') {
        return null;
    }

    const nodes = data.split(',');
    const nums = nodes.map(v => BigInt(v.split(':')[0]));
    const vals = nodes.map(v => BigInt(v.split(':')[1]));
    const root = new TreeNode(nodes[0].split(':')[1]);
    const curqueue = [];
    curqueue.push(root);
    for (let i = 0; i < nums.length && curqueue.length > 0; i++) {
        const cur = curqueue.shift();
        const leftNum = BigInt(nums[i]) * 2n;
        const rightNum = leftNum + 1n;


        const leftChildIndex = nums.indexOf(leftNum);
        if (leftChildIndex != -1) {
            const leftChild = new TreeNode(vals[leftChildIndex]);
            curqueue.push(leftChild);
            cur.left = leftChild;
        }
        const rightChildIndex = nums.indexOf(rightNum);
        if (rightChildIndex != -1) {
            const rightChild = new TreeNode(vals[rightChildIndex]);
            curqueue.push(rightChild);
            cur.right = rightChild;
        }
    }

    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */