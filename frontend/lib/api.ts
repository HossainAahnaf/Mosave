export const api = {
  async getExpenses() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/expenses`);
    return response.json();
  }
};

export default api;
