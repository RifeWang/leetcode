// ----------------------------
// ----------------------------
//            N叉树
// ----------------------------
// ----------------------------



// ----------- N-ary Tree Preorder Traversal -----------
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Children []*Node
 * }
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
    const result = [];
    if (root == null) {
        return result;
    }
    result.push(root.val);
    for (const node of root.children) {
        result.push(...preorder(node));
    }
    return result;
};




// ----------- N-ary Tree Postorder Traversal -----------
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Children []*Node
 * }
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function(root) {
    const result = [];
    if (root == null) {
        return result;
    }
    for (const node of root.children) {
        result.push(...postorder(node));
    }
    result.push(root.val);
    return result;
};




// ----------- N-ary Tree Postorder Traversal -----------
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (root == null) {
        return [];
    }

    const result = [];
    let queue = [];
    queue.push(root);
    for( ; queue.length > 0; ) {
        const level = [];
        const nq = [];
        queue.map(v => {
            level.push(v.val);

            for (const node of v.children) {
                nq.push(node);
            }
        });
        queue = nq;
        if (level.length) {
            result.push(level);
        }
    }
    return result;
};




// ----------- Maximum Depth of N-ary Tree -----------
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root == null) {
        return 0;
    }
    let d = 0;
    for (const node of root.children) {
        const dn = maxDepth(node);
        if (dn > d) {
            d = dn;
        }
    }

    return 1 + d;
};