const Rule = require('../models/Rule');
const { createAST, evaluateAST, combineRules } = require('../services/ruleService');

// Create rule and store AST
exports.createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;

        // Validate ruleString
        if (!ruleString || typeof ruleString !== 'string') {
            return res.status(400).json({ error: 'Invalid rule string' });
        }

        const ast = createAST(ruleString);

        // Check if AST is valid
        if (!ast) {
            return res.status(400).json({ error: 'Failed to create AST from rule string' });
        }

        const newRule = new Rule({ ruleString, ast });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Server error while creating rule' });
    }
};

// Combine rules
exports.combineRules = async (req, res) => {
    try {
        const { ruleStrings } = req.body;

        // Validate ruleStrings
        if (!Array.isArray(ruleStrings) || ruleStrings.length === 0) {
            return res.status(400).json({ error: 'Invalid rule strings array' });
        }

        // Check if all rule strings are valid
        for (const rule of ruleStrings) {
            if (typeof rule !== 'string' || !rule.trim()) {
                return res.status(400).json({ error: 'All rule strings must be valid non-empty strings' });
            }
        }

        const combinedAST = combineRules(ruleStrings);

        // Check if combinedAST is valid
        if (!combinedAST) {
            return res.status(400).json({ error: 'Failed to combine rules' });
        }

        res.status(200).json(combinedAST);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Server error while combining rules' });
    }
};

// Evaluate rule
exports.evaluateRule = async (req, res) => {
    try {
        const { ast, data } = req.body;
        console.log("oooooooooooooooo", data )
        console.log("oooooooooooooooo",ast )

        // Validate AST
        if (!ast || typeof ast !== 'object') {
            return res.status(400).json({ error: 'Invalid AST' });
        }

        // Validate data
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Invalid user data' });
        }

        const result = evaluateAST(ast, data);

        res.status(200).json({ result });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Server error while evaluating rule' });
    }
};
exports.getRuleById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the rule ID from the request parameters
        const rule = await Rule.findById(id); // Find the rule by its ID

        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        res.status(200).json(rule); // Return the found rule
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching rule' });
    }
};
