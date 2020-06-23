// ----------------------------
// ----------------------------
//          二分查找
// ----------------------------
// ----------------------------




// -----------  二分查找 -----------
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (nums.length == 0) {
        return -1;
    }

    let [left, right] = [0, nums.length-1];
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] < target) {
            left = mid + 1;
        }
        if (nums[mid] > target) {
            right = mid - 1;
        }
    }
    return -1;
};





// -----------  x 的平方根 -----------
/**
 *
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x == 0 || x == 1) {
        return x;
    }
    let [left, right] = [1, Math.floor(x/2 + 1)];
    while (left < right) {
        const mid = Math.floor((right - left) / 2) + left;

        if (mid * mid == x) {
            return mid;
        }
        if (mid * mid < x) {
            if (mid > left) {
                left = mid;
                continue;
            }
            return mid;
        }
        if (mid * mid > x) {
            if (mid < right) {
                right = mid;
            }
        }
    }
};






// -----------  猜数字大小 -----------
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    let [left, right] = [1, n];
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        const res = guess(mid);
        if (res == 0) {
            return mid;
        }
        if (res == 1) {
            left = mid + 1;
        }
        if (res == -1) {
            right = mid - 1;
        }
    }
};





// -----------  搜索旋转排序数组 -----------
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // 区间切割后的结果只能是一个有序区间和一个无序区间，或者两个都是有序区间

    if (nums.length == 0) {
        return -1;
    }

    let [left, right] = [0, nums.length-1];
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        const mv = nums[mid];
        const lv = nums[left];
        const rv = nums[right];
        if (mv == target) {
            return mid;
        }
        if (lv == target) {
            return left;
        }
        if (rv == target) {
            return right;
        }
        if (mv > target) {
            if (mv > lv) { // [left, mid] 有序
                if (lv < target) { // 肯定在左区间
                    right = mid - 1;
                } else { // 不在左区间
                    left = mid + 1; // 检验右区间
                }
            } else { // [left, mid] 无序, [mid, right] 必然有序
                right = mid - 1; // 检查左区间
            }
        }
        if (mv < target) {
            if (mv > lv) { // [left, mid] 有序，必然不在左区间
                left = mid + 1; // 检查右区间
            } else { // [left, mid] 无序, [mid, right] 必然有序
                if (rv > target) {
                    left = mid + 1; // 肯定在右区间
                } else {
                    right = mid - 1; // 检查左区间
                }
            }
        }
    }
    return -1;
};





// -----------  第一个错误的版本 -----------
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let [left, right] = [1, n];
        while (right - left > 1) {
            const mid = Math.floor((right - left) / 2) + left;
            if (isBadVersion(mid)) {
                if (!isBadVersion(mid - 1)) {
                    return mid;
                } else {
                    right = mid - 1;
                }
            } else {
                left = mid;
            }
        }

        if (isBadVersion(left)) {
            return left;
        }
        if (isBadVersion(right)) {
            return right;
        }
        return null;
    };
};





// -----------  寻找峰值 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    if (nums.length == 0) {
        return null;
    }

    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        const pre = i-1 >= 0 ? nums[i-1] : -Infinity;
        const next = i+1 < nums.length ? nums[i+1] : -Infinity;
        if (cur > pre && cur > next) {
            return i;
        }
        if (cur > next) {
            i++;
        }
    }
    return null;
};





// -----------  寻找旋转排序数组中的最小值 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    // 区间切割后的结果只能是一个有序区间和一个无序区间，或者两个都是有序区间
    // 分割区间，然后递归

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





// -----------  在排序数组中查找元素的第一个和最后一个位置 -----------
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    if (nums.length == 0) {
        return [-1, -1];
    }
    if (nums.length == 1) {
        return nums[0] == target ? [0, 0] : [-1, -1];
    }

    // 先确定左边界
    let [left, right] = [0, nums.length-1];
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        if (mid == left) {
            if (nums[left] == target) {
                break;
            } else if (nums[right] == target) {
                left = right;
                break;
            } else {
                left = -1;
                break;
            }
        } else {
            if (nums[mid] > target) {
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                if (nums[left] == target) { // 左边界确定
                    break;
                } else {
                    right = mid;
                }
            }
        }
    }

    if (left == -1 || left > right) {
        return [-1, -1];
    }

    // 再确定右边界
    let [l, r] = [left, nums.length-1];
    while (l <= r) {
        if (nums[r] == target) {
            break;
        }
        const mid = Math.floor((r - l) / 2) + l;
        if (mid == l) {
            if (nums[r] == target) {
                break;
            } else {
                r = l;
                break;
            }
        } else {  // r > target
            if (nums[mid] == target) {
                l = mid;
            } else if (nums[mid] > target) {
                r = mid - 1;
            }
        }
    }

    return [left, r];
};





// -----------  找到 K 个最接近的元素 -----------
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function(arr, k, x) {
    if (arr.length == 0 || k == 0) {
        return [];
    }
    if (arr.length == 1 || arr.length == k) {
        return arr;
    }
    if (arr.length == 2) {
        return Math.abs(arr[0] - x) <= Math.abs(arr[1] - x) ? [arr[0]] : [arr[1]];
    }
    if (x <= arr[0]) {
        return arr.slice(0, k);
    }
    if (x >= arr[arr.length-1]) {
        return arr.slice(arr.length-k);
    }

    // 先找到最接近元素的区间
    let [left, right] = [0, arr.length-1];
    while (left + 1 < right) { // 至少三个元素
        const mid = Math.floor((right - left) / 2) + left;
        if (arr[mid] == x) {
            break;
        }
        if (arr[mid] < x) {
            left = mid;
        }
        if (arr[mid] > x) {
            right = mid;
        }
    }

    // 确定最接近元素
    let center;
    if (Math.abs(arr[left] - x) <= Math.abs(arr[left+1] - x) && Math.abs(arr[left] - x) <= Math.abs(arr[right] - x)) {
        center = left;
    }
    else if (Math.abs(arr[left+1] - x) <= Math.abs(arr[left] - x) && Math.abs(arr[left+1] - x) <= Math.abs(arr[right] - x)) {
        center = left + 1;
    }
    else if (Math.abs(arr[right] - x) <= Math.abs(arr[left] - x) && Math.abs(arr[right] - x) <= Math.abs(arr[left+1] - x)) {
        center = right;
    }


    const result = [];
    result.push(arr[center]);
    let s = center - 1;
    let e = center + 1;
    while (result.length < k) {
        if (s < 0) {
            result.push(arr[e]);
            e++;
            continue;
        }
        if (e >= arr.length) {
            result.unshift(arr[s]);
            s--;
            continue;
        }
        if (Math.abs(arr[s] - x) <= Math.abs(arr[e] - x)) {
            result.unshift(arr[s]);
            s--;
            continue;
        } else {
            result.push(arr[e]);
            e++;
            continue;
        }
    }

    return result;
};





// -----------  Pow(x, n)  -----------
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n == 0) {
        return 1;
    }
    if (n < 0) {
        return 1 / myPow(x, -n);
    }
    if (n % 2 === 0) {
        return myPow(x * x, Math.floor(n / 2));
    }
    return myPow(x * x, Math.floor(n / 2)) * x;
};





// -----------  有效的完全平方数  -----------
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num == 1) {
        return true;
    }
    let [left, right] = [1, Math.floor(num/2 + 1)];
    while (left < right) {
        const mid = Math.floor((right - left) / 2) + left;

        if (mid * mid == num) {
            return true;
        }
        if (mid * mid < num) {
            if (mid > left) {
                left = mid;
                continue;
            }
            return false;
        }
        if (mid * mid > num) {
            if (mid < right) {
                right = mid;
            }
        }
    }
};





// -----------  寻找比目标字母大的最小字母  -----------
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    if (letters[0] > target || target >= letters[letters.length-1]) {
        return letters[0];
    }
    let [left, right] = [0, letters.length-1];
    while (left < right) {
        const mid = Math.floor((right - left) / 2) + left;
        if (letters[mid] <= target) {
            if (mid == left) {
                break;
            } else {
                left = mid;
            }
        }
        if (letters[mid] > target) {
            right = mid;
        }
    }

    while (left <= right) {
        if (letters[left] > target) {
            return letters[left];
        }
        left++;
    }
};





// -----------  寻找旋转排序数组中的最小值 II -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    // 分割区间，然后递归

    if (nums.length == 1) {
        return nums[0];
    }

    let [left, right] = [0, nums.length-1];
    while (right - left > 1) {
        const mid = Math.floor((right-left) / 2) + left;
        return Math.min(findMin(nums.slice(0, mid+1)), findMin(nums.slice(mid+1)));
    }

    return Math.min(nums[left], nums[right]);
};





// ----------- 两个数组的交集 -----------
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    const nums = Array.from(new Set(nums1)).concat(Array.from(new Set(nums2))).sort((a, b) => a-b);
    const result = [];
    for (let i = 0; i < nums.length-1; i++) {
        if (nums[i] == nums[i+1]) {
            result.push(nums[i]);
            i++;
        }
    }
    return result;
};





// ----------- 两个数组的交集 II -----------
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let small;
    let large;
    const result = [];
    if(nums1.length < nums2.length) {
        small = nums1;
        large = nums2;
    } else {
        small = nums2;
        large = nums1;
    }
    for(let i=0; i<small.length; i++) {
        const item = small[i];
        const largeIndex = large.indexOf(item);
        if(largeIndex != -1) {
            result.push(item);
            large.splice(largeIndex, 1);
        }
    }
    return result;
};





// ----------- 两数之和 II - 输入有序数组 -----------
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
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





// ----------- 寻找重复数 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {

};
