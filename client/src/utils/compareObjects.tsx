// Recursive function to compare objects
const CompareObjects = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if(key === '__typename') continue; // testing for typename
    const val1 = obj1[key];
    const val2 = obj2[key];

    const areObjects = typeof val1 === "object" && typeof val2 === "object";
    if (
      (areObjects && !CompareObjects(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};
export default CompareObjects;
