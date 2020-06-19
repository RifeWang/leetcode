// ----------------------------
// ----------------------------
//            链表
// ----------------------------
// ----------------------------



// ----------- 设计链表 -----------
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class MyLinkedList {
    constructor() {
        this.head = null; // head 指针
        this.length = 0; // 记录链表长度
    }

    addAtHead(val) {
        const node = new Node(val);
        node.next = this.head;
        this.head = node;
        this.length++;
    }

    addAtTail(val) {
        const node = new Node(val);
        if (this.head == null) {
            this.head = node;
        } else {
            let cur = this.head;
            while (cur.next != null) {
                cur = cur.next;
            }
            cur.next = node;
        }
        this.length++;
    }

    addAtIndex(index, val) {
        if (index <= 0) {
            return this.addAtHead(val);
        }
        if (index === this.length) {
            return this.addAtTail(val);
        }
        if (index < this.length) {
            const node = new Node(val);
            const preNode = this._getNodeByIndex(index - 1)
            const currNode = this._getNodeByIndex(index);
            node.next = currNode;
            preNode.next = node;

            this.length++;
        }
    }

    get(index) {
        return this._getNodeByIndex(index) ? this._getNodeByIndex(index).val : -1;
    }

    deleteAtIndex(index) {
        if (index < 0 || index >= this.length) {
            return;
        }
        const preNode = this._getNodeByIndex(index - 1);
        const nextNode = this._getNodeByIndex(index + 1);

        if (preNode === null) {
            this.head = nextNode;
        } else {
            preNode.next = nextNode;
        }
        this.length--;
    }

    _getNodeByIndex(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let currentNode = this.head;
        for(let i = 0; ; i++) {
            if (i === index) {
                break;
            }
            currentNode = currentNode.next;
        }
        return currentNode;
    }
};




// ----------- 环形链表 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// var hasCycle = function(head) {
//     // 哈希表记录遍历的次数
//     const nodeCollection = new Map();
//     while(head) {
//         if (nodeCollection.get(head)) return true;
//         nodeCollection.set(head, 1)
//         head = head.next;
//     }
//     return false;
// };

var hasCycle = function(head) {
    // 快慢指针
    if (head == null || head.next == null) {
        return false;
    }
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
};



// ----------- 环形链表 II -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// var detectCycle = function(head) {
//     const nodeCollection = new Map();
//     let pos = head;
//     let hascycle = false;
//     while(head) {
//         if (nodeCollection.get(head)) {
//             hascycle = true;
//             break;
//         }
//         nodeCollection.set(head, 1)
//         head = head.next;
//         pos = head;
//     }
//     if (hascycle) {
//         return pos;
//     }
//     return null;
// };

var detectCycle = function(head) {
    // slow 的速度是 v ，fast 的速度是 2v ，
    // 假设起点到环点的距离是 x , 快慢指针在环中的某个节点相遇，相遇点距离环点的距离为 y ，环的剩余长度是 z
    // 那么: (x+y) / v = (x + y + k(z + y)) / 2v ，k >= 1 ，快指针肯定多走一圈以上
    // 那么: x = (k-1)(z+y) + z ，相遇后，第三个指针从起点开始走，慢指针继续走，那么这两个指针一定会在环点相遇

    if (head == null || head.next == null) {
        return null;
    }
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) { // 相遇
            let third = head;
            while (third != slow) {
                third = third.next;
                slow = slow.next;
            }
            return third;
        }
    }
    return null;
};




// ----------- 相交链表 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// var getIntersectionNode = function(headA, headB) {
//     const nodeCollection = new Map();
//     let pos = null;
//     while(headA) {
//         nodeCollection.set(headA, 1);
//         headA = headA.next;
//     }
//     while(headB) {
//         if (nodeCollection.get(headB)) {
//             pos = headB;
//             break;
//         }
//         nodeCollection.set(headB, 1)
//         headB = headB.next;
//     }
//     return pos;
// };

var getIntersectionNode = function(headA, headB) {
    // 两个指针，分别走 headA + headB 和 headB + headA ，如果相交则肯定能相遇

    if (headA == null || headB == null) {
        return null;
    }
    let p1 = headA;
    let p2 = headB;
    let f1 = 0; // p1 是否切换至 headB
    let f2 = 0; // p2 是否切换至 headA
    while (p1 != null || p2 != null) {
        if (p1 == p2) {
            return p1;
        }
        if (p1.next == null && f1 === 0) {
            p1 = headB;
            f1 = 1;
        } else {
            p1 = p1.next;
        }
        if (p2.next == null && f2 === 0) {
            p2 = headA;
            f2 = 1;
        } else {
            p2 = p2.next;
        }
    }
    return null;
};




// ----------- 删除链表的倒数第N个节点 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// var removeNthFromEnd = function(head, n) {
//     // 把倒数换算为正数
//     function getLength(head) {
//         let length = 0;
//         while(head) {
//             length++;
//             head = head.next;
//         }
//         return length;
//     }

//     const length = getLength(head);
//     if(length == 0) {
//         return null;
//     }

//     let pre = null;
//     let cur = head;
//     for(let i=2; i<= length-n+1; i++) {
//         pre = cur;
//         cur = cur.next;
//     }
//     // 删除头
//     if(cur === head) {
//         head = cur.next;
//         return head;
//     }
//     // 删除最后一个元素
//     if(cur.next == null) {
//         pre.next = null;
//         return head;
//     }
//     // 删除中间元素
//     cur.val = cur.next.val;
//     cur.next = cur.next.next;

//     return head;
// };

var removeNthFromEnd = function(head, n) {
    // 首指针和尾指针之间间隔 n 步，同步向后移动，当尾指针指向最后一个节点时，首指针的下一个节点就是需要删除的节点

    if (head == null) {
        return null;
    }
    let p1 = head;
    let p2 = head; // 间隔 n 步
    for (let i = 0; i < n; i++) {
        p2 = p2.next;
        if (p2 == null) { // 要删除的是头节点
            head = head.next;
            return head;
        }
    }
    while (p2.next != null) {
        p1 = p1.next;
        p2 = p2.next;
    }
    p1.next = p1.next.next;
    return head;
}




// ----------- 反转链表 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(head == null || head.next == null) {
        return head;
    }
    let flag = head;
    while (flag.next != null) {
        const newFirst = flag.next;
        flag.next = flag.next.next;
        newFirst.next = head;
        head = newFirst;
    }
    return head;
};




// ----------- 移除链表元素 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    if(head == null) {
        return null;
    }

    let pre = null;
    let cur = head;
    while (cur != null) {
        if (cur.val == val) {
            if (pre == null) { // 移除的是头结点
                head = head.next;
                pre = null;
                cur = head;
            } else {
                pre.next = pre.next.next;
                cur = cur.next;
            }
        } else {
            pre = pre == null ? head : pre.next;
            cur = cur.next;
        }
    }
    return head;
};




// ----------- 奇偶链表 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    // 至少三个节点才需要移动
    if (head == null || head.next == null || head.next.next == null) {
        return head;
    }

    let cur = head;  // 奇数节点
    let even = head.next; // 偶数节点
    while (even !=null && even.next != null) {
        const nextOdd = even.next; // 下一个奇数节点，即需要移动的节点
        even.next = even.next.next;
        nextOdd.next = cur.next;
        cur.next = nextOdd;

        cur = cur.next;
        even = even.next;
    }

    return head;
};




// ----------- 回文链表 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// var isPalindrome = function(head) {
//     if(head == null) {
//         return true;
//     }
//     const length = getLinkListLength(head);
//     for(let i = 1; i<= Math.floor(length / 2); i++) {
//         if (getNodeByPos(head, i) !== getNodeByPos(head, length - i + 1)) {
//             return false;
//         }
//     }
//     return true;
// };

// // 获取链表的长度
// function getLinkListLength (head) {
//     let length = 0;
//     while(head) {
//         length++;
//         head = head.next;
//     }
//     return length;
// }

// // 获取链表第 pos 个位置的节点 val，pos >= 1
// function getNodeByPos (head, pos) {
//     const length = getLinkListLength(head);
//     let result;
//     for(let i=1, cur=head; i <= pos; i++) {
//         result = cur.val;
//         cur = cur.next;
//     }
//     return result;
// }

var isPalindrome = function(head) {
    // 快慢指针找到中间节点，翻转链表后半部分

    if (head == null || head.next == null) {
        return true;
    }
    let slow = head;  // slow.next 将会指向后半部分的第一个节点
    let fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    function reverseList (head) {
        if (head == null || head.next == null) {
            return head;
        }
        let flag = head;
        while (flag.next != null) {
            const newFirst = flag.next;
            flag.next = flag.next.next;
            newFirst.next = head;
            head = newFirst;
        }
        return head;
    };

    slow.next = reverseList(slow.next);

    let p1 = head;
    let p2 = slow.next;
    while (p2 != null) {
        if (p1.val != p2.val) {
            return false;
        }
        p1 = p1.next;
        p2 = p2.next;
    }
    return true;
}




// ----------- 合并两个有序链表 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    // l1 已经排好了队，依次将 l2 中的节点插入 l1

    if (l1 == null || l2 == null) {
        return l1 || l2;
    }

    let p1 = l1;
    let p2 = l2;
    while (p1 != null && p2 != null) {
        if (p2.val < p1.val) {
            const t = p2.next;
            p2.next = p1;
            l1 = p2;
            p1 = l1;
            p2 = t;
        } else {
            if (p1.next && p1.next.val <= p2.val) {
                p1 = p1.next
            } else {
                const t = p2.next;
                p2.next = p1.next;
                p1.next = p2;
                p2 = t;
                p1 = p1.next;
            }
        }
    }

    return l1;
};





// ----------- 两数相加 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let c = 0;
    let head = null;
    let pre = null;
     while (l1 != null || l2 != null || c != 0) {
        const cur1 = l1 != null ? l1.val : 0;
        const cur2 = l2 != null ? l2.val : 0;
        let newCur = cur1 + cur2 + c;
        if (cur1 + cur2 + c >= 10) {
            c = 1;
            newCur = newCur - 10;
        } else {
            c = 0;
        }
        l1 = l1 == null ? null : l1.next;
        l2 = l2 == null ? null : l2.next;

        const node = new ListNode(newCur);
        if (head == null) {
            head = node;
            pre = node;
        } else {
            pre.next = node;
            pre = pre.next;
        }
    }
    pre.next = null;
    return head;
};




// ----------- 扁平化多级双向链表 -----------
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
    if (head == null) {
        return head;
    }

    let cur = head;
    while (cur != null && cur.child == null) {
        cur = cur.next
    }

    // 链表只有一级
    if (cur == null) {
        return head;
    }

    // cur 有子链
    let childOfCur = cur.child; // 下一级链表的头节点
    let end = cur.child;
    // 找子链最后一个节点
    while (end.next != null) {
        end = end.next;
    }
    // 子链最后一个节点与上一级链相连
    end.next = cur.next;
    if (cur.next != null) {
        cur.next.prev = end;
    }
    cur.next = childOfCur;
    childOfCur.prev = cur;
    cur.child = null;

    return flatten(head);
};




// ----------- 复制带随机指针的链表 -----------
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    // 每个节点向后复制一次，连接 random，奇偶节点分离

    if (head == null) {
        return null;
    }

    let cur = head;
    while (cur != null) {
        const node = new Node(cur.val);
        node.next = cur.next;
        cur.next = node;

        cur = cur.next.next;
    }

    const newHead = head.next;

    // 连接 random
    cur = head;
    while (cur != null && cur.next != null) {
        cur.next.random = cur.random ? cur.random.next : null;
        cur = cur.next.next;
    }

    // 断链
    cur = head;
    while (cur != null && cur.next != null) {
        [cur.next, cur] = [cur.next.next, cur.next];
    }

    return newHead;
};




// ----------- 旋转链表 -----------
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    // 至少两个节点才需要移动
    if (k == 0 || head == null || head.next == null) {
        return head;
    }

    let length = 1;  // 链表长度
    let end = head;  // 原链表最后一个节点
    while (end.next != null) {
        length++;
        end = end.next;
    }

    if (length == k || k%length == 0) { // 无需移动
        return head;
    }

    // 如果 k < length , 新的 head 应该是原链表的第 length - k + 1 个节点
    // 如果 k > length , 新的 head 应该是原链表的第 length - k % length + 1 个节点

    let c = 1;
    let newEnd = head;
    const f = k < length ? length - k : length - k % length;
    while (c < f) {
        c++;
        newEnd = newEnd.next;
    }

    end.next = head;
    head = newEnd.next;
    newEnd.next = null;
    return head;
};