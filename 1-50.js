// ------------------------
// ------------------------
// ------- LeetCode -------
// ------------------------
// ------------------------


/**
 * 1. 两数之和
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    if (nums.length == 2) {
        return [0, 1];
    }
    const hashmap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (hashmap.has(diff)) {
            return [i, hashmap.get(diff)];
        }
        hashmap.set(nums[i], i);
    }
};



/**
 * 2. 两数相加
 *
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
var addTwoNumbers = function (l1, l2) {
    let c = 0; // 进位
    let head = null;
    let pre = null;
    while (c != 0 || l1 != null || l2 != null) {
        let sum = (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0) + c;
        if (sum >= 10) {
            sum = sum - 10;
            c = 1;
        } else {
            c = 0;
        }
        const node = new ListNode(sum);
        if (head == null) {
            head = node;
            pre = head;
        } else {
            pre.next = node;
            pre = pre.next;
        }
        l1 = l1 != null ? l1.next : null;
        l2 = l2 != null ? l2.next : null;
    }
    return head;
};



/**
 * 3. 无重复字符的最长子串
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let result = 0;
    let arr = [];
    for (let i = 0; i < s.length; i++) {
        const item = s.charAt(i);
        const index = arr.indexOf(item);
        if (index != -1) {
            arr = arr.slice(index + 1);
        }
        arr.push(item);
        result = arr.length > result ? arr.length : result;
    }
    return result;
};
// console.log(`3. 无重复字符的最长子串: ${lengthOfLongestSubstring('abcabcbb')}`);
// console.log(`3. 无重复字符的最长子串: ${lengthOfLongestSubstring('bbbbb')}`);
// console.log(`3. 无重复字符的最长子串: ${lengthOfLongestSubstring('pwwkew')}`);



/**
 * 5. 最长回文子串
 *
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    function isPalindrome(s) {
        return s.split('').reverse().join('') === s;
    }

    if (s.length <= 1) {
        return s;
    }

    // todo: 优化
    let length = 1;
    let result = s.charAt(0);
    for (let i = 0; i < s.length; i++) {
        let gap = s.lastIndexOf(s.charAt(i));
        while (gap >= length) {
            const area = s.slice(i, gap + 1);
            if (isPalindrome(area)) {
                if (area.length > length) {
                    result = s.slice(i, gap + 1);
                    length = result.length;
                }
            }

            if (s.slice(0, gap).lastIndexOf(s.charAt(i)) != gap) {
                gap = s.slice(0, gap).lastIndexOf(s.charAt(i));
            } else {
                break;
            }
        }
    }
    return result;
};
// console.log(`5. 最长回文子串: ${longestPalindrome('b')}`);
// console.log(`5. 最长回文子串: ${longestPalindrome('bb')}`);
// console.log(`5. 最长回文子串: ${longestPalindrome('babad')}`);
// console.log(`5. 最长回文子串: ${longestPalindrome('cbbd')}`);
// console.log(`5. 最长回文子串: ${longestPalindrome('abcba')}`);
// console.log(`5. 最长回文子串: ${longestPalindrome('civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth')}`);



/**
 * 7. 整数反转
 *
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let arr = x.toString().split('');
    let f = false;
    if (arr[0] === '-') {
        arr.shift();
        f = true;
    }
    if (arr[arr.length - 1] === '0') {
        arr.pop();
    }
    let result = Number(arr.reverse().join(''));
    result = f ? -result : result;
    if (result > Math.pow(2, 31) - 1 || result < -Math.pow(2, 31)) {
        result = 0;
    }
    return result;
};
// console.log(`7. 整数反转: ${reverse(123)}`);
// console.log(`7. 整数反转: ${reverse(-123)}`);
// console.log(`7. 整数反转: ${reverse(120)}`);
// // 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
// console.log(`7. 整数反转: ${reverse(1534236469)}`);



/**
 * 8. 字符串转换整数 (atoi)
 *
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
    let result = str.match(/^\s*([+-]{0,1}\d+)/);
    if (result === null) {
        return 0;
    }
    result = Number(result[1]);
    if (result < -Math.pow(2, 31)) {
        return -Math.pow(2, 31);
    }
    if (result > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1;
    }
    return result;
};
// console.log(`8. 字符串转换整数 (atoi): ${myAtoi("   -42")}`)
// console.log(`8. 字符串转换整数 (atoi): ${myAtoi("4193 with words")}`)
// console.log(`8. 字符串转换整数 (atoi): ${myAtoi("words and 987")}`)



/**
 * 9. 回文数
 *
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    return x.toString() === x.toString().split('').reverse().join('');
};
// console.log(`9. 回文数: ${isPalindrome(121)}`);
// console.log(`9. 回文数: ${isPalindrome(-121)}`);
// console.log(`9. 回文数: ${isPalindrome(10)}`);



/**
 * 11. 盛最多水的容器
 *
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {

    let result = 0;
    // 左边界: 0 ~ 倒数第二位
    // 右边界: i+1 ~ 结尾
    for (let left = 0; left < height.length - 1; left++) {
        let curmax = 0; // 记录当前循环的最大值
        for (let right = height.length - 1; right > left; right--) {
            const area = Math.min(height[left], height[right]) * (right - left);
            if (area > curmax) {
                curmax = area;
            }
        }
        if (curmax > result) {
            result = curmax;
        }
    }
    return result;
};
console.log(`11. 盛最多水的容器: ${maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])}`);
console.log(`11. 盛最多水的容器: ${maxArea([1, 1])}`);



/**
 * 12. 整数转罗马数字
 *
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    let result = '';

    function handle(n, s) {
        if (num != 0) {
            const c = Math.floor(num / n);
            if (c > 0) {
                result = result + s.repeat(c);
                num = num % n;
            }
        }
    }
    handle(1000, 'M');
    handle(900, 'CM');
    handle(500, 'D');
    handle(400, 'CD');
    handle(100, 'C');
    handle(90, 'XC');
    handle(50, 'L');
    handle(40, 'XL');
    handle(10, 'X');
    handle(9, 'IX');
    handle(5, 'V');
    handle(4, 'IV');
    handle(1, 'I');

    return result;
};
console.log(`12. 整数转罗马数字: ${intToRoman(1994)}`);



/**
 * 13. 罗马数字转整数
 *
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        const item = s.charAt(i);
        if (item == 'I') {
            if (s.charAt(i + 1) == 'V') {
                result += 4;
                i++;
                continue;
            }
            if (s.charAt(i + 1) == 'X') {
                result += 9;
                i++;
                continue;
            }
            result += 1;
        }
        if (item == 'V') {
            result += 5;
        }
        if (item == 'X') {
            if (s.charAt(i + 1) == 'L') {
                result += 40;
                i++;
                continue;
            }
            if (s.charAt(i + 1) == 'C') {
                result += 90;
                i++;
                continue;
            }
            result += 10;
        }
        if (item == 'L') {
            result += 50;
        }
        if (item == 'C') {
            if (s.charAt(i + 1) == 'D') {
                result += 400;
                i++;
                continue;
            }
            if (s.charAt(i + 1) == 'M') {
                result += 900;
                i++;
                continue;
            }
            result += 100;
        }
        if (item == 'D') {
            result += 500;
        }
        if (item == 'M') {
            result += 1000;
        }
    }
    return result;
};
// console.log(`13. 罗马数字转整数: ${romanToInt('MCDLXXVI')}`);



/**
 * 14. 最长公共前缀
 *
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length == 0) {
        return '';
    }
    let result = '';
    for (let i = 0; ; i++) {
        let common = '';
        for (const str of strs) {
            if (str.charAt(i) == '') {
                return result;
            }
            if (common == '') {
                common = str.charAt(i);
            } else if (common != str.charAt(i)) {
                return result;
            }
        }
        result += common;
    }
    return result;
};
// console.log(`14. 最长公共前缀: ${longestCommonPrefix([''])}`);



/**
 * 15. 三数之和
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    if (nums.length < 3) {
        return [];
    }
    nums.sort((a, b) => a-b);
    let result = [];
    // 选择一个元素，数组向后的区间至少要剩余两个元素
    for (let i = 0; i < nums.length-2; i++) {
        const first = nums[i];
        if (first > 0) { // 有序数组，第一个元素不能大于目标值
            break;
        }
        let left = i + 1;
        let right = nums.length - 1;
        const twoSum = -first; // 剩余的两数之和
        while (left < right) {
            const ts = nums[left] + nums[right];
            if (ts == twoSum) {
                result.push([first, nums[left], nums[right]]);

                left++;
                right--;
                // 避免重复元素
                while (left < right && nums[left] == nums[left-1]) {
                    left++;
                }
                while (left < right && nums[right] == nums[right+1]) {
                    right--;
                }
            } else if (ts > twoSum) {
                right--;
            } else {
                left++;
            }
        }
    }
    // return result;
    return Array.from(new Set(result.map(v => v.sort().join(',')))).map(v => v.split(',').map(v => Number(v)));
};
console.log(`15. 三数之和:`, threeSum([-1, 0, 1, 2, -1, -4]));



/**
 * 17. 电话号码的字母组合
 *
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    function int2str(n) {
        switch (Number(n)) {
            case 2:
                return ['a', 'b', 'c'];
            case 3:
                return ['d', 'e', 'f'];
            case 4:
                return ['g', 'h', 'i'];
            case 5:
                return ['j', 'k', 'l'];
            case 6:
                return ['m', 'n', 'o'];
            case 7:
                return ['p', 'q', 'r', 's'];
            case 8:
                return ['t', 'u', 'v'];
            case 9:
                return ['w', 'x', 'y', 'z'];
            default:
                return [];
        }
    }

    let result = [];
    for (let i = 0; i < digits.length; i++) {
        const c = digits.charAt(i);

        const arr = int2str(c);
        if (result.length === 0) {
            result = arr;
        } else {
            let newarr = [];
            for (const pre of result) {
                for (const cur of arr) {
                    newarr.push(pre+cur);
                }
            }
            result = newarr;
        }
    }
    return result;
};
console.log(`17. 电话号码的字母组合: ${letterCombinations('234')}`);



/**
 * 19. 删除链表的倒数第N个节点
 *
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
var removeNthFromEnd = function(head, n) {
    // 双指针，指针之间间隔 n 步

    if (head === null || n <= 0) {
        return null;
    }
    let pre = head;
    let tail = pre;
    while (n > 0) {
        tail = tail.next;
        n--;
    }

    while (tail != null && tail.next != null) {
        pre = pre.next;
        tail = tail.next;
    }
    if (tail == null) { // 要删除的是 pre 节点
        head = pre.next;
        return head;
    }
    pre.next = pre.next.next; // 要删除的是 pre 的后一个节点
    return head;
};



/**
 * 20. 有效的括号
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    if (s.length == 0) {
        return true;
    }
    if (s.length % 2 == 1) {
        return false;
    }
    const stack = [];
    for (const item of s) {
        if (['(', '[', '{'].includes(item)) {
            stack.push(item);
        } else {
            const p = stack.pop();
            if ((item == ')' && p != '(') || (item == ']' && p != '[') || (item == '}' && p != '{')) {
                return false;
            }
        }
    }
    return stack.length == 0 ? true : false;
};



/**
 * 22. 括号生成
 *
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    /*
        n = 1   ()
        n = 2   (())    [0, 3]
                ()()    对调 1、2

        n = 3   ((()))  [0, 5]
                (()())  对调 2、3
                (())()  对调 2、4
                ()(())  对调 1、3
                ()()()  对调 1、4

        n = 4   (((())))    [0, 7]  一次最多移动的个数 <= n/2

        n 与 n-1 有没有什么关系？

        假设S(n)为n对括号的正确配对数目，那么有递推关系S(n)=S(0)S(n-1)+S(1)S(n-2) +...+S(n-1)S(0)，显然S(n)是卡特兰数。
    */
};



/**
 * 26. 删除排序数组中的重复项
 *
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    // ------------
    nums = nums.join('').replace(/(\d{1})\1+/g, '$1').split('').map(v => Number(v));
    return nums.length;
    // ------------

    // ------------
    // for (let i = 0; i < nums.length - 1; i++) {
    //     if (nums[i] == nums[i+1]) {
    //         nums.splice(i, 1);
    //         i--;
    //     }
    // }
    // return nums.length;
    // ------------

    // if (nums.length <= 1) {
    //     return nums.length;
    // }

    // let cur = nums[0];
    // let delStart = 0;
    // let delNum = 0;
    // for (let i = 1; i < nums.length; i++) {
    //     if (cur === nums[i]) {
    //         delNum++;
    //     } else {
    //         nums.splice(delStart, delNum);
    //         i -= delNum;

    //         cur = nums[i];
    //         delStart = i;
    //         delNum = 0;
    //     }
    // }
    // if (delNum > 0) {
    //     nums.splice(delStart, delNum);
    // }
    // return nums.length;
};
// console.log(`26. 删除排序数组中的重复项: ${removeDuplicates([1, 1])}`);
// console.log(`26. 删除排序数组中的重复项: ${removeDuplicates([1, 1, 2])}`);
// console.log(`26. 删除排序数组中的重复项: ${removeDuplicates([0,0,1,1,1,2,2,3,3,4])}`);



/**
 * 27. 移除元素
 *
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == val) {
            nums.splice(i, 1);
            i--;
        }
    }
    return nums.length;
};
// console.log(`27. 移除元素: ${removeElement([3,2], 3)}`);
// console.log(`27. 移除元素: ${removeElement([3,2,2,3], 3)}`);
// console.log(`27. 移除元素: ${removeElement([0,1,2,2,3,0,4,2], 2)}`);



/**
 * 29. 两数相除
 *
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    if (dividend == 0) {
        return 0;
    }

    let negative = false;
    if ((dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0)) {
        negative = true;
    }
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    if (dividend < divisor) {
        return 0;
    }
    let result = 1;
    while (dividend - divisor >= divisor) {
        result++;
        dividend = dividend - divisor;
    }
    if (negative) {
        result = -result;
    }
    const MIN = -Math.pow(2, 31);
    const MAX = Math.pow(2, 31) - 1;
    if (result < MIN) {
        return MIN;
    }
    if (result > MAX) {
        return MAX;
    }
    return result;
};
// console.log(`29. 两数相除:  ${divide(10, 3)}`);
// console.log(`29. 两数相除:  ${divide(-7, -3)}`);
// console.log(`29. 两数相除:  ${divide(2147483647, 2)}`);



/**
 * 31. 下一个排列
 *
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    if (nums.length == 0) {
        return nums;
    }

    // for (let last = nums.length - 1; last > 0; last--) {
    //     let change = last - 1;

    //     if (nums[last] > nums[change]) {
    //         [nums[change], nums[last]] = [nums[last], nums[change]];
    //         nums.splice(change+1, nums.length - change, ...nums.slice(change+1).sort((a, b) => a - b));
    //         return nums;
    //     }

    //     if (last == 1) {
    //         return nums.sort((a, b) => a - b);
    //     }
    // }
    return nums;
};
// console.log(`31. 下一个排列: ${nextPermutation([1,2,3])}`);
// console.log(`31. 下一个排列: ${nextPermutation([1,3,2])}`);
// console.log(`31. 下一个排列: ${nextPermutation([2,3,1])}`);
// console.log(`31. 下一个排列: ${nextPermutation([4,2,0,2,3,2,0])}`);



/**
 * 38. 外观数列
 *
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    if (n == 1) {
        return 1;
    }

    const arr = countAndSay(n - 1).toString().split('');
    let result = '';
    let c = 1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i + 1]) {
            result += c + arr[i];
            c = 1;
        } else {
            c++;
        }
    }

    return result;
};
// console.log(`38. 外观数列: ${countAndSay(2)}`);
// console.log(`38. 外观数列: ${countAndSay(3)}`);
// console.log(`38. 外观数列: ${countAndSay(4)}`);
// console.log(`38. 外观数列: ${countAndSay(5)}`);
// console.log(`38. 外观数列: ${countAndSay(6)}`);
// console.log(`38. 外观数列: ${countAndSay(7)}`);
// console.log(`38. 外观数列: ${countAndSay(8)}`);
// console.log(`38. 外观数列: ${countAndSay(9)}`);
// console.log(`38. 外观数列: ${countAndSay(10)}`);



/**
 * 39. 组合总和  --  回溯算法
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    candidates.sort((a, b) => a-b);
    let result = [];

    function dfs (path) {
        for (let i = 0; i < candidates.length; i++) {
            if ([...path, candidates[i]].reduce((acc, cur) => acc+cur, 0) === target) {
                result.push([...path, candidates[i]]);
                return;
            } else if ([...path, candidates[i]].reduce((acc, cur) => acc+cur, 0) < target) {
                dfs([...path, candidates[i]]);
            } else {
                return;
            }
        }
    }
    dfs([]);

    // 去重
    return Array.from(new Set(result.map(v => v.sort().join(',')))).map(v => v.split(',').map(v => Number(v)));
};
// console.log(`39. 组合总和:`, combinationSum([2,3,6,7], 6));
// console.log(`39. 组合总和:`, combinationSum([2,3,5], 8));
// console.log(`39. 组合总和:`, combinationSum([3,12,9,11,6,7,8,5,4], 15));



/**
 * 40. 组合总和 II
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a-b);

    let result = []; // 记录值
    function dfs (path) { // path 记录索引
        for (let i = 0; i < candidates.length; i++) {
            if (path.includes(i)) {
                continue;
            }
            if ([...path, i].reduce((acc, cur) => acc + candidates[cur], 0) === target) {
                result.push([...path.map(v => candidates[v]), candidates[i]]);
                return;
            } else if ([...path, i].reduce((acc, cur) => acc + candidates[cur], 0) < target) {
                dfs([...path, i]);
            } else {
                return;
            }
        }
    }
    dfs([]);

    // 去重并且替换为值
    return Array.from(new Set(result.map(v => v.sort().join(',')))).map(v => v.split(',').map(v => Number(v)));
};
// console.log(`40. 组合总和 II :`, combinationSum2([10,1,2,7,6,1,5], 8));
// console.log(`40. 组合总和 II :`, combinationSum2([2,5,2,1,2], 5));




/*
    1 2 3
    4 5 6
---------

结果位数 | 从右至左，两个乘数对应位
1           1,1                     18 = 8    c=1
2           2,1  1,2                12+15+c = 8   c=2
3           3,1  2,2  1,3           6+10+12+c = 0  c=3
4           3,2  2,3                5+8+c = 6   c=1
5           3,3                     4+c = 5     c=0

*/
/**
 * 43. 字符串相乘
 *
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if (num1 == 0 || num2 == 0) {
        return '0';
    }
    const l1 = num1.length;
    const l2 = num2.length;

    let result = '';
    let c = 0; // 进位
    for (let i = 1; ; i++) {
        let first = i > l1 ? l1 : i;
        let second = i + 1 - first;
        if (second > l2) {
            break;
        }
        let m = 0;
        while (first >= 1) {
            m += Number(num1.charAt(l1 - first)) * Number(num2.charAt(l2 - second));

            first--;
            second++;
        }
        m += c;
        c = Math.floor(m / 10);
        m = m % 10;

        result = `${m}${result}`;
    }
    if (c != 0) {
        result = `${c}${result}`;
    }
    return result;
};
// console.log(`43. 字符串相乘: ${multiply('123', '456')}`);



/**
 * 46. 全排列  --  回溯算法
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let result = [];

    function dfs(path) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        for (const item of nums) {
            if (path.includes(item)) {
                continue;
            }
            path.push(item);
            dfs(path);
            path.pop();
        }
    }

    dfs([]);

    return result;
};
// console.log(`46. 全排列:`, permute([1, 2, 3]));



/**
 * 47. 全排列 II  --  回溯算法
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    let result = new Set();

    function dfs(path) {
        if (path.length === nums.length) {
            result.add(path.map(i => nums[i]).join(','))
            return;
        }

        for(let i = 0; i < nums.length; i++) {
            if (path.includes(i)) {
                continue;
            }
            path.push(i);
            dfs(path);
            path.pop();
        }
    }

    dfs([]);
    return Array.from(result).map(v => v.split(',').map(v => Number(v)));
};
// console.log(`47. 全排列 II :`, permuteUnique([1, 1, 2]));



/**
 * 48. 旋转图像
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    // 先转置，再垂直中心线对折
    // 转置：第 n 行 依次变为 第 n 列
};



/**
 * 49. 字母异位词分组
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const hash = new Map();
    for (const item of strs) {
        const s = item.split('').sort().join('');
        if(hash.has(s)) {
            hash.set(s, [...hash.get(s), item]);
        } else {
            hash.set(s, [item]);
        }
    }
    return Array.from(hash.values());
};
// console.log(`49. 字母异位词分组:`, groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));