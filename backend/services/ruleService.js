// Define Node class for AST
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // "operator" or "operand"
        this.left = left; // left child
        this.right = right; // right child
        this.value = value; // value for operand
    }
}

// Parse string to create AST
const createAST = (ruleString) => {
    // Simplified parsing logic; in production, use a proper parser
    let tokens = ruleString.split(' ');

    // Create tree here (this is an example and should be a full parser)
    return new Node('operator', new Node('operand', null, null, 'age > 30'), new Node('operand', null, null, 'department = Sales'));
};

// Combine multiple rules into a single AST
const combineRules = (ruleStrings) => {
    let combinedRoot = null;
    ruleStrings.forEach((rule) => {
        const newAST = createAST(rule);
        if (combinedRoot) {
            combinedRoot = new Node('operator', combinedRoot, newAST, 'AND');
        } else {
            combinedRoot = newAST;
        }
    });
    return combinedRoot;
};

// Evaluate rule against data
const evaluateAST = (ast, data) => {
    if (ast.type === 'operand') {
        const [key, operator, value] = ast.value.split(' ');
        if (operator === '>') return data[key] > parseInt(value);
        if (operator === '<') return data[key] < parseInt(value);
        if (operator === '=') return data[key] === value;
    } else if (ast.type === 'operator') {
        if (ast.value === 'AND') return evaluateAST(ast.left, data) && evaluateAST(ast.right, data);
        if (ast.value === 'OR') return evaluateAST(ast.left, data) || evaluateAST(ast.right, data);
    }
    return false;
};

module.exports = { createAST, combineRules, evaluateAST };
