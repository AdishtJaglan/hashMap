class HashMap {
  constructor(initialCapacity = 8) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;

    if (this.size / this.buckets.length > 0.75) {
      this.resize(this.buckets.length * 2);
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      for (const [key, _] of bucket) {
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      for (const [_, value] of bucket) {
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entriesArray.push([key, value]);
      }
    }
    return entriesArray;
  }

  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.buckets = new Array(newCapacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

class HashSet {
  constructor() {
    this.hashMap = new HashMap();
  }

  add(key) {
    this.hashMap.set(key, true);
  }

  has(key) {
    return this.hashMap.has(key);
  }

  remove(key) {
    return this.hashMap.remove(key);
  }

  clear() {
    this.hashMap.clear();
  }

  length() {
    return this.hashMap.length();
  }

  keys() {
    return this.hashMap.keys();
  }
}

const hashMap = new HashMap();
hashMap.set("key1", "value1");
hashMap.set("key2", "value2");
hashMap.set("key3", "value3");
console.log(hashMap.get("key2")); // value2
console.log(hashMap.has("key3")); // true
console.log(hashMap.remove("key1")); // true
console.log(hashMap.length()); // 2
console.log(hashMap.keys()); // ["key2", "key3"]
console.log(hashMap.values()); // ["value2", "value3"]
console.log(hashMap.entries()); // [["key2", "value2"], ["key3", "value3"]]

const hashSet = new HashSet();
hashSet.add("value1");
hashSet.add("value2");
console.log(hashSet.has("value1")); // true
console.log(hashSet.remove("value2")); // true
console.log(hashSet.length()); // 1
console.log(hashSet.keys()); // ["value1"]
