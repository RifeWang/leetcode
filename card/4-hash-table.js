// ----------------------------
// ----------------------------
//            哈希表
// ----------------------------
// ----------------------------




// ----------- 设计哈希集合 -----------
/**
 * Initialize your data structure here.
 */
var MyHashSet = function() {
    this._hashSet = [];
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    if (!this.contains(key)) {
        this._hashSet.push(key);
    }
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    const i = this._hashSet.indexOf(key);
    if (i != -1) {
        this._hashSet.splice(i, 1);
    }
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    return this._hashSet.includes(key);
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */





// ----------- 设计哈希映射 -----------
/**
 * Initialize your data structure here.
 */
var MyHashMap = function() {
    this._keys = [];
    this._values = [];
};

/**
 * value will always be non-negative.
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    const i = this._keys.indexOf(key);
    if (i === -1) {
        this._keys.push(key);
        this._values.push(value);
    } else {
        this._values.splice(i, 1, value);
    }
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    const i = this._keys.indexOf(key);
    if (i !== -1) {
        return this._values[i];
    }
    return -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    const i = this._keys.indexOf(key);
    if (i !== -1) {
        this._keys.splice(i, 1);
        this._values.splice(i, 1);
    }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */




// ----------- 存在重复元素 -----------
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};




// ----------- 只出现一次的数字 -----------
/**
 * @param {number[]} nums
 * @return {number}
 */
// var singleNumber = function(nums) {
//     for(const v of nums) {
//         if(nums.indexOf(v) === nums.lastIndexOf(v)) {
//             return v;
//         }
//     }
// };
var singleNumber = function(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length-1; i+=2) {
        if (nums[i] != nums[i+1]) {
            return nums[i];
        }
    }
    return nums.pop();
};




// ----------- 两个数组的交集 -----------
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// var intersection = function(nums1, nums2) {
//     const sets = new Set(nums1);
//     for(const v of nums2) {
//         if(!nums1.includes(v)) {
//             sets.delete(v);
//         }
//     }
//     for(const v of nums1) {
//         if(!nums2.includes(v)) {
//             sets.delete(v);
//         }
//     }
//     return Array.from(sets);
// };
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




// ----------- 快乐数 -----------
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    const set = new Set(); // 判断是否发生循环
    set.add(n);
    while (1) {
        n = n.toString().split('').reduce((acc, cur) => Number(acc) + Number(cur) * Number(cur), 0);
        if (n === 1) {
            return true;
        }
        if (set.has(n)) {
            return false;
        }
        set.add(n);
    }
};




// ----------- 两数之和 -----------
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i=0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [i, map.get(diff)];
        }
        map.set(nums[i], i);
    }
};




// ----------- 同构字符串 -----------
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    const map1 = new Map();
    const map2 = new Map();
    for (let i=0; i < s.length; i++) {
        const k = s.charAt(i);
        const v = t.charAt(i);
        if (map1.has(k) && map1.get(k) !== v ) {
            return false;
        }
        if (map2.has(v) && map2.get(v) !== k ) {
            return false;
        }
        map1.set(k, v);
        map2.set(v, k);
    }
    return true;
};




// ----------- 两个列表的最小索引总和 -----------
/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function(list1, list2) {
    const hash = new Map();
    const records = [];
    let idxsum = Infinity;
    list1.map((v, i) => {
        hash.set(v, i);
    });
    list2.map((v, i) => {
        if(hash.has(v)) {
            const s = i + hash.get(v);
            if (s < idxsum) {
                records.length = 0;
                records.push(v);
                idxsum = s;
            }
            if (s == idxsum) {
                records.push(v);
            }
        }
    });
    return Array.from(new Set(records));
};




// ----------- 字符串中的第一个唯一字符 -----------
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    const hash = new Map();

    for(const v of s) {
        hash.set(v, (hash.get(v) || 0) + 1);
    }

    for(const v of s) {
        if(hash.get(v) == 1) {
            return s.indexOf(v);
        }
    }
    return -1;
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




// ----------- 存在重复元素 II -----------
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const item = nums[i];
        if (map.has(item) && Math.abs(map.get(item) - i) <= k) {
            return true;
        }
        map.set(item, i);  // 只管最近的索引
    }
    return false;
};




// ----------- 字母异位词分组 -----------
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const hash = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        let value = hash.get(key);
        if (value === undefined) {
            value = [s];
        } else {
            value = [...value, s];
        }
        hash.set(key, value);
    }

    const result = [];
    for(const v of hash.values()){
        result.push(v)
    };
    return result;
};





// ----------- 有效的数独 -----------
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const map = new Map();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const item = board[i][j];
            if (item !== '.') {
                const row = 'row' + i;
                const column = 'col' + j;
                const area = 'area' + Math.floor(i / 3) + Math.floor(j / 3);

                if (map.has(row)) {
                    if (map.get(row).includes(item)) {
                        return false;
                    } else {
                        map.set(row, [...map.get(row), item]);
                    }
                } else {
                    map.set(row, [item]);
                }

                if (map.has(column)) {
                    if (map.get(column).includes(item)) {
                        return false;
                    } else {
                        map.set(column, [...map.get(column), item]);
                    }
                } else {
                    map.set(column, [item]);
                }

                if (map.has(area)) {
                    if (map.get(area).includes(item)) {
                        return false;
                    } else {
                        map.set(area, [...map.get(area), item]);
                    }
                } else {
                    map.set(area, [item]);
                }
            }
        }
    }
    return true;
};





// ----------- 寻找重复的子树 -----------
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    if (root == null) {
        return [];
    }

    const subtrees = [];
    const hashmap = new Map();
    function serialize (root) {
        if (root == null) {
            return '';
        }

        const s = `${root.val}(${serialize(root.left)},${serialize(root.right)})`;
        if (hashmap.has(s)) {
            if (hashmap.get(s) === 1) {
                subtrees.push(root);
                hashmap.set(s, 2);
            }
        } else {
            hashmap.set(s, 1);
        }
        return s;
    }
    serialize(root);

    return subtrees;
};





// ----------- 宝石与石头 -----------
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    if (J.length == 0 || S.length == 0) {
        return 0;
    }

    let result = 0;
    const hashmap = new Map();
    J.split('').map(v => hashmap.set(v, 0));
    for (let i = 0; i < S.length; i++) {
        const v = S.charAt(i);
        if (hashmap.has(v)) {
            result++;
        }
    }
    return result;
};





// ----------- 无重复字符的最长子串 -----------
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (s.length == 0) {
        return 0;
    }
    if (s.length == 1) {
        return 1;
    }

    let max = 1;
    let sub = s.charAt(0);
    for (let i = 1; i < s.length; i++) {
        const item = s.charAt(i);

        if (sub.indexOf(item) == -1) {
            sub += item;
        } else {
            sub = sub.slice(sub.indexOf(item)+1) + item;
        }
        max = Math.max(sub.length, max);
    }

    return max;
};





// -----------  四数相加 II -----------
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function(A, B, C, D) {
    let result = 0;

    const mapC = new Map();
    C.map(v => {
        if (mapC.has(v)) {
            mapC.set(v, mapC.get(v) + 1);
        } else {
            mapC.set(v, 1);
        }
    });

    function dfs(path) {
        if (path.length == 2) {
            const sum = path.reduce((acc, cur) => acc+cur, 0);
            const target = -sum;

            // C + D = -sum
            let count = 0;
            D.map(v => {
                const targetC = -sum-v;
                if (mapC.has(targetC)) {
                    count += mapC.get(targetC);
                }
            });

            result += count;
        }
        if (path.length == 0) {
            for (let i = 0; i < A.length; i++) {
                path.push(A[i]);
                dfs(path);
                path.pop();
            }
        }
        if (path.length == 1) {
            for (let i = 0; i < B.length; i++) {
                path.push(B[i]);
                dfs(path);
                path.pop();
            }
        }
    }
    dfs([]);

    return result;
};





// -----------  前 K 个高频元素 -----------
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    nums.sort((a, b) => a-b);
    const result = [];
    const map = new Map();
    for (let i = 0; i < nums.length; ) {
        const item = nums[i];
        const itemCount = nums.lastIndexOf(item) - nums.indexOf(item) + 1;
        map.set(item, itemCount);
        i = nums.lastIndexOf(item) + 1;
        if (result.length < k) {
            result.push(item);
        } else {
            result.sort((a, b) => map.get(a) - map.get(b));
            if (map.get(result[0]) < itemCount) {
                result.shift();
                result.push(item);
            }
        }
    }
    return result;
};





// -----------  常数时间插入、删除和获取随机元素 -----------
/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
    // 数组存储元素，map 存储元素对应索引，删除时需要将元素与数组尾部交换然后删除尾部
    this._map = new Map();
    this._arr = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this._map.has(val)) {
        return false;
    } else {
        this._arr.push(val);
        this._map.set(val, this._arr.length-1);
        return true;
    }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this._map.has(val)) {
        const index = this._map.get(val);
        this._map.set(this._arr[this._arr.length-1], index);
        [this._arr[index], this._arr[this._arr.length-1]] = [this._arr[this._arr.length-1], this._arr[index]];

        this._map.delete(val);
        this._arr.pop();
        return true;
    } else {
        return false;
    }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    if (this._arr.length == 0) {
        return null;
    }
    const random = Math.floor(Math.random() * this._arr.length);
    return this._arr[random];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */