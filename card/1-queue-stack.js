// ----------------------------
// ----------------------------
//          队列和栈
// ----------------------------
// ----------------------------






// -----------  设计循环队列 -----------
/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.head = null;
    this.tail = null;
    this.queue = new Array(k);
    this.size = k; // 记录队列容量，保持不变
    this.length = 0;
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull()) {
        return false;
    }
    if (this.length === 0) {
        this.head = 0;
        this.tail = 0;
    } else {
        if (this.tail < this.size - 1) {
            this.tail++;
        } else {
            this.tail = 0;
        }
    }
    this.queue[this.tail] = value;
    this.length++;
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty()) {
        return false;
    }
    this.queue[this.head] = null;
    if (this.head < this.size - 1) {
        this.head++;
    } else {
        this.head = 0;
    }
    this.length--;
    return true;
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this.queue[this.head];
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this.queue[this.tail];
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.length === 0;
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return this.length === this.size;
};







// -----------  岛屿数量 -----------
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    // FloodFill 算法
    // 当前元素如果是 1 则将其变为 0 ，然后一直检查其相邻元素

    const M = grid.length;
    if (M == 0) {
        return 0;
    }
    const N = grid[0].length;
    if (N == 0) {
        return 0;
    }

    let result = 0;
    for(let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] == '1') {
                result++;
                grid[i][j] = '0';

                const queue = [];
                // queue.push([i, j-1], [i-1, j], [i, j+1], [i+1, j]);
                queue.push([i, j+1], [i+1, j]); // 只需检查右和下两个方向即可
                while (queue.length) {
                    const [ii, jj] = queue.shift();

                    if (ii >= 0 && ii < M && jj >= 0 && jj < N) {
                        if (grid[ii][jj] == '1') {
                            grid[ii][jj] = '0';
                            queue.push([ii, jj-1], [ii-1, jj], [ii, jj+1], [ii+1, jj]);
                        }
                    }
                }
            }
        }
    }
    return result;
};







// -----------  打开转盘锁 -----------
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    // 广度优先搜索
    if (target == '0000') {
        return 0;
    }
    if (deadends.includes('0000')) {
        return -1;
    }
    const map = new Map();
    deadends.map(v => map.set(v, 1));

    let step = 0;
    let queue = ['0000'];
    while (queue.length) {
        step++;
        let nextQueue = [];
        for(let i = 0; i < queue.length; i++) {
            const item = queue[i];
            // 下一次的可能有八种
            const arr = item.split('');
            const n1 = (Number(arr[0]) == 9 ? '0' : Number(arr[0]) + 1) + item.slice(1);
            const n2 = (Number(arr[0]) == 0 ? '9' : Number(arr[0]) - 1) + item.slice(1);

            const n3 = item.slice(0, 1) + (Number(arr[1]) == 9 ? '0' : Number(arr[1]) + 1) + item.slice(2);
            const n4 = item.slice(0, 1) + (Number(arr[1]) == 0 ? '9' : Number(arr[1]) - 1) + item.slice(2);

            const n5 = item.slice(0, 2) + (Number(arr[2]) == 9 ? '0' : Number(arr[2]) + 1) + item.slice(3);
            const n6 = item.slice(0, 2) + (Number(arr[2]) == 0 ? '9' : Number(arr[2]) - 1) + item.slice(3);

            const n7 = item.slice(0, 3) + (Number(arr[3]) == 9 ? '0' : Number(arr[3]) + 1);
            const n8 = item.slice(0, 3) + (Number(arr[3]) == 0 ? '9' : Number(arr[3]) - 1);

            [n1, n2, n3, n4, n5, n6, n7, n8].map(n => {
                if (!map.has(n)) {
                    map.set(n, 1);  // 需要跳过遍历过的路径(避免死循环)，即可以把遍历过的路径当成死锁
                    nextQueue.push(n);
                }
            });
        }
        if (nextQueue.includes(target)) {
            return step;
        }
        queue = nextQueue;
    }

    return -1;
};






// -----------  完全平方数 -----------
/**
 * @param {number} n
 * @return {number}
 */
const squaresMap = new Map();
var numSquares = function(n) {
    if (n === 1) {
        return 1;
    }
    const sqrt = Math.sqrt(n);
    if (Number.isInteger(sqrt)) {
        return 1;
    }
    const sub = new Array(Math.floor(sqrt))
    for (let i = 1; i <= Math.floor(sqrt); i++) {
        const subTarget = n - i*i;
        if (squaresMap.has(subTarget)) {
            sub[i-1] = squaresMap.get(subTarget);
        } else {
            sub[i-1] = numSquares(subTarget);
            squaresMap.set(subTarget, sub[i-1]);
        }
    }
    return  1 + Math.min(...sub);
};






// -----------  最小栈 -----------
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.min = null;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    this.min = this.min == null ? x : this.min > x ? x : this.min;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
    if (this.top() == this.min) {
        this.min = null;
        this.stack.map(v => {
            if (this.min === null || min > v) {
                this.min = v
            }
        });
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */






// -----------  有效的括号 -----------
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    for (let i = 0; i < s.split('').length; i++) {
        const item = s[i];
        if (['(', '{', '['].includes(item)) {
            stack.push(item);
        } else if ([')', '}', ']'].includes(item)) {
            const pop = stack.pop();
            if (!pop) {
                return false;
            }
            if ((item == ')' && pop != '(') || (item == '}' && pop != '{') || (item == ']' && pop != '[')) {
                return false;
            }
        } else {
            throw new TypeError('Illegal Character');
        }
    }
    return stack.length == 0 ? true : false;
};






// -----------  每日温度 -----------
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    const result = [];
    for(let i = 0; i < T.length; i++) {
        let count = 0;
        let found = false;
        for(let j = i+1; j < T.length; j++) {
            if (found) {
                break;
            }
            count++;

            if (T[i] < T[j]) {
                found = true;
            }
        }
        result.push(found ? count : 0);
    }
    return result;
};






// -----------  逆波兰表达式求值 -----------
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    const stack = [];
    for (let i = 0; i < tokens.length; i++) {
        const item = tokens[i];
        if (['+', '-', '*', '/'].includes(item)) {
            const num2 = stack.pop();
            const num1 = stack.pop();
            if (item == '+') {
                stack.push(num1 + num2);
            }
            if (item == '-') {
                stack.push(num1 - num2);
            }
            if (item == '*') {
                stack.push(num1 * num2);
            }
            if (item == '/') {
                const result = num1 / num2;
                stack.push(result >= 0 ? Math.floor(result) : Math.ceil(result));
            }
        } else {
            stack.push(Number(item));
        }
    }
    return stack.pop();
};






// -----------  克隆图 -----------
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    // todo
};