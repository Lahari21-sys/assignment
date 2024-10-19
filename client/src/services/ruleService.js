// ruleService.js

import axios from 'axios';

const API_URL = 'https://assignment-3-dcao.onrender.com'; // Update with your API URL

const ruleService = {
  createRule: async (ruleString) => {
    const response = await axios.post(`${API_URL}/create`, { ruleString });
    return response.data;
  },

  getRuleById: async (ruleId) => {
    const response = await axios.get(`${API_URL}/${ruleId}`); // Ensure this route is defined in your backend
    return response.data;
  },

  evaluateRule: async ({ ast, data }) => {
    const response = await axios.post(`${API_URL}/evaluate`, { ast, data });
    return response.data;
  },
};

export default ruleService;
