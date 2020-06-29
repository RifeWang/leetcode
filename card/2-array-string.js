// ----------------------------
// ----------------------------
//          数组和字符串
// ----------------------------
// ----------------------------




// -----------  寻找数组的中心索引 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    if (nums.length < 2) {
        return -1;
    }

    let leftSum = 0;
    let rightSum = 0;
    for (let i = 0; i < nums.length; i++) {
        leftSum = i === 0 ? 0 : leftSum + nums[i-1];
        rightSum = i === 0 ? nums.slice(1).reduce((acc, cur) => acc + cur) : rightSum - nums[i];

        if (leftSum === rightSum) {
            return i;
        }
    }
    return -1;
};






// -----------  搜索插入位置 -----------
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    if (nums.length == 0) {
        return 0;
    }

    let [left, right] = [0, nums.length-1];
    if (target <= nums[left]) {
        return 0;
    }
    if (target == nums[right]) {
        return right;
    }
    if (target > nums[right]) {
        return nums.length;
    }

    // target 位于 (left, right) 区间内
    while (left + 1 < right) {
        const mid = Math.floor((right - left) / 2) + left;
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid;
        }
        if (nums[mid] > target) {
            right = mid;
        }
    }

    return left + 1;
};






// -----------  合并区间 -----------
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length == 0) {
        return [];
    }
    if (intervals.length == 1 && intervals[0].length == 0) {
        return [];
    }
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < intervals.length-1; ) {
        const cur = intervals[i];
        const next = intervals[i+1];
        const small = cur[0] <= next[0] ? cur : next;
        const large = cur[0] <= next[0] ? next : cur;
        if (small[small.length-1] < large[0]) { // 无交集
            i++;
            continue;
        }
        const item = [Math.min(cur[0], next[0]), Math.max(cur[cur.length-1], next[next.length-1])];
        intervals.splice(i+1, 1);
        intervals.splice(i, 1, item);
    }

    return intervals;
};






// -----------  旋转矩阵 -----------
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    // 第一步，延【左上-右下】对角线对调元素位置
    // 第二步，延 垂直中线 对调元素位置

    const N = matrix.length;
    if (N <= 1) {
        return;
    }
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; ; j++) {
            if (j >= N) {
                break;
            }
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    for (let j = 0; j < Math.floor(N / 2) ; j++) {
        for (let i = 0; i < N; i++) {
            [matrix[i][j], matrix[i][N - 1 - j]] = [matrix[i][N - 1 - j], matrix[i][j]];
        }
    }

    return;
};







// -----------  零矩阵 -----------
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    // 记录每行每列是否有零

    const M = matrix.length;
    if (M == 0) {
        return;
    }
    const N = matrix[0].length;
    if (N == 0) {
        return;
    }

    const hashmap = new Map();
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            const row = `row${i}`;
            const col = `col${j}`;
            const zero = matrix[i][j] == 0 ? true : false;
            hashmap.set(row, hashmap.has(row) ? hashmap.get(row) || zero : zero);
            hashmap.set(col, hashmap.has(col) ? hashmap.get(col) || zero : zero);
        }
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            const row = `row${i}`;
            const col = `col${j}`;
            if (hashmap.get(row) || hashmap.get(col)) {
                matrix[i][j] = 0;
            }
        }
    }
    return;
};






// -----------  对角线遍历 -----------
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function(matrix) {
    const M = matrix.length;
    if (M === 0) {
        return [];
    }
    const N = matrix[0].length;
    if (N === 0) {
        return [];
    }
    const result = [];
    result.push(matrix[0][0]);
    if (M === 1 && N === 1) {
        return result;
    }
    let direction = 1; // 奇数：方向向左下，偶数：方向向右上
    for (let i = 0, j = 0; ; direction++) {
        if (direction % 2 === 1) {
            j++;
            while (j >= 0) {
                if (i < M && j < N) {
                    result.push(matrix[i][j]);
                }
                if (i === M-1 && j === N-1) {
                    return result;
                }
                i++;
                j--;
            }
            i--;
            j++;
        } else {
            i++;
            while (i >= 0) {
                if (i < M && j < N) {
                    result.push(matrix[i][j]);
                }
                if (i === M-1 && j === N-1) {
                    return result;
                }
                i--;
                j++;
            }
            i++;
            j--;
        }
    }

    return result;
};







// -----------  最长公共前缀 -----------
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length == 0) {
        return '';
    }
    if (strs[0].length == 0) {
        return '';
    }
    let common = '';
    for (let i = 0; ; i++) {
        t = strs[0].slice(0, i);
        for (const str of strs) {
            if (i > str.length+1) {
                return common;
            }
            if (str.slice(0, i) !== t) {
                return common;
            }
        }
        common = t;
    }
};







// -----------  最长回文子串 -----------
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    function isPalindrome (s) {
        if (s.length <= 1) {
            return true;
        }
        for (let i = 0, j = s.length-1; i < j; i++, j--) {
            if (s.charAt(i) != s.charAt(j)) {
                return false;
            }
        }
        return true;
    }

    if (s.length <= 1) {
        return s;
    }
    const map = new Map();
    for (let i = 0; i < s.length; i++) {
        const item = s.charAt(i);
        map.set(item, map.has(item) ? [...map.get(item), i] : [i]);
    }

    let result = '';
    for(const item of map.keys()) {
        const idx = map.get(item);
        console.log(item, idx)
        if (idx.length >= 2) {
            for (let i = 0; i < idx.length - 1; i++) {
                for (let j = i+1; j < idx.length; j++) {
                    if (idx[j] - idx[i] + 1 > result.length && isPalindrome(s.slice(idx[i], idx[j]+1))) { // 验证是否需要更新最长回文串
                        result = s.slice(idx[i], idx[j]+1);
                    }
                }
            }
        }
    }

    if (result === '') {
        result = s.charAt(0);
    }
    return result;
};







// -----------  翻转字符串里的单词 -----------
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.replace(/(\s)+/g, '$1').trim().split(' ').reverse().join(' ');
};







// -----------  实现 strStr() -----------
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle.length == 0) {
        return 0;
    }
    if (haystack.length == 0) {
        return -1;
    }

    for (let i = 0, j = 0; i < haystack.length && j < needle.length; i++) {
        if (haystack.charAt(i) == needle.charAt(j)) {
            if (j == needle.length - 1) {
                return i - needle.length + 1;
            }
            j++;
        } else {
            i = i - j;
            j = 0;
        }
    }
    return -1;
};






// -----------  反转字符串 -----------
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    for(let i = 0; i < Math.floor(s.length / 2); i++) {
        [s[s.length-i-1], s[i]] = [s[i], s[s.length-i-1]];
    }
};






// -----------  数组拆分 I -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
    if (nums.length === 0) {
        return 0;
    }
    nums.sort((a, b) => a - b );
    let minSum = 0;
    for (let i = 0; i < nums.length; i=i+2) {
        minSum += nums[i];
    }
    return minSum;
};







// -----------  两数之和 II - 输入有序数组 -----------
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    if (numbers.length < 2) {
        return new Error('numbers length error');
    }
    if (numbers.length == 2) {
        return [1, 2];
    }
    let left = 0;
    let right = numbers.length - 1;
    while (numbers[left] + numbers[right] != target) {
        if (numbers[left] + numbers[right] > target) {
            right--;
        }
        if (numbers[left] + numbers[right] < target) {
            left++;
        }
    }
    return [left+1, right+1];
};







// ----------- 移除元素 -----------
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(let i=0; i<nums.length; i++) {
        if(nums[i] == val) {
            nums.splice(i, 1);
            i--;
        }
    }
    return nums.length;
};






// ----------- 最大连续1的个数 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let last = 0;
    let curr = 0;
    nums.map((v) => {
        if(v === 1) {
            curr++;
        } else {
            if(last < curr) {
                last = curr;
            }
            curr = 0;
        }
    });
    return Math.max(last, curr);
};







// ----------- 长度最小的子数组 -----------
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    // 计算每个以数组当前元素结尾的满足条件的子数组的范围
    let min = null;
    let sum = 0;
    for (let i = 0, j = 0; j < nums.length && i <= j; j++) {
        sum = sum + nums[j];
        while (sum < s) {
            j++;
            if (j >= nums.length) {
                return min == null ? 0 : min;
            }
            sum = sum + nums[j];
        }

        while (sum - nums[i] >= s) {
            sum = sum - nums[i];
            i++;
        }

        min = Math.min(min == null ? Number.MAX_SAFE_INTEGER : min, j - i + 1);
    }
    return min == null ? 0 : min;
};







// ----------- 杨辉三角 -----------
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    if (numRows < 1) {
        return [];
    }
    const result = [[1]];
    for (let i = 1; i < numRows; i++) {
        let arr = [1];
        for (let j = 1; j <= i; j++) {
            if (i == 0 || i == j) {
                arr[j] = 1;
            } else {
                arr[j] = result[i-1][j-1] + result[i-1][j];
            }
        }
        result.push(arr);
    }
    return result;
};







// ----------- 杨辉三角 II -----------
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    if (rowIndex == 0) {
        return [1];
    }
    if (rowIndex == 1) {
        return [1, 1];
    }
    const pre = getRow(rowIndex - 1);
    const result = [];
    for (let i = 0; i < pre.length - 1; i++) {
        result.push(pre[i] + pre[i+1]);
    }
    result.unshift(1);
    result.push(1);
    return result;
};







// ----------- 反转字符串中的单词 III -----------
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.split(' ').map(word => {
        return word.split('').reverse().join('')
    }).join(' ');
};







// ----------- 寻找旋转排序数组中的最小值 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    if (nums.length == 1) {
        return nums[0];
    }

    let [left, right] = [0, nums.length-1];
    while (right - left > 1) {
        const mid = Math.floor((right-left) / 2) + left;
        if (nums[mid] > nums[left]) {
            return Math.min(nums[left], findMin(nums.slice(mid+1)));
        } else {
            return Math.min(nums[mid], findMin(nums.slice(0, mid)));
        }
    }

    return Math.min(nums[left], nums[right]);
};






// ----------- 删除排序数组中的重复项 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] == nums[i-1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    return nums.length;
};






// ----------- 移动零 -----------
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    // i 指向零，j 指向非零元素，交换 i j
    for (let i = 0, j = 0; i < nums.length && j < nums.length; ) {
        while (nums[i] !== 0) {
            i++;
            if (i >= nums.length) {
                return;
            }
        }

        while (nums[j] === 0) {
            j++;
            if (j >= nums.length) {
                return;
            }
        }
        if (i < j) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
            j++;
        } else {
            j = i + 1;
        }
    }
    return nums;
};