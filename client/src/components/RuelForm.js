import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';
import ruleService from '../services/ruleService';

const RuleForm = () => {
  const [rule, setRule] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState('');
  const [ruleId, setRuleId] = useState('');

  const handleCreateRule = async () => {
    try {
      const createdRule = await ruleService.createRule(rule);
      setRuleId(createdRule._id);
      alert('Rule created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating rule: ' + err.message);
    }
  };

  const handleEvaluateRule = async () => {
    try {
      // Fetch the rule from the backend to get the AST
      const ruleData = await ruleService.getRuleById(ruleId);
      const ast = ruleData.ast; // Extract the AST from the rule data

      const response = await ruleService.evaluateRule({ ast, data: JSON.parse(data) }); // Send AST and user data
      setResult(response.result ? 'Eligible' : 'Not Eligible');
    } catch (err) {
      console.error(err);
      alert('Error evaluating rule: ' + err.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '30px', borderRadius: '10px' }}>
          <Box mb={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Rule Engine
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Create Rule
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter Rule"
              value={rule}
              onChange={(e) => setRule(e.target.value)}
              placeholder="age > 30 AND department = 'Sales'"
            />
            <Box mt={2}>
              <Button fullWidth variant="contained" color="primary" onClick={handleCreateRule}>
                Create Rule
              </Button>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Evaluate Rule
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Enter JSON Data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder='{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
            />
            <Box mt={2}>
              <Button fullWidth variant="contained" color="secondary" onClick={handleEvaluateRule} disabled={!ruleId}>
                Evaluate
              </Button>
            </Box>
          </Box>
          {result && (
            <Box mt={2}>
              <Typography variant="h6" color={result === 'Eligible' ? 'green' : 'red'} align="center">
                {result}
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RuleForm;
