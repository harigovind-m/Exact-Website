import { useState, useEffect } from 'react';

export default function useProductPrice(productUrl) {
  const [state, setState] = useState({
    price: null,
    currency: 'QAR',
    isLoading: true,
    error: null,
    lastUpdated: null
  });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        const response = await fetch(
          `http://localhost:4001/api/price?productUrl=${encodeURIComponent(productUrl)}`
        );

        if (!response.ok) throw new Error('Network response failed');
        
        const data = await response.json();
        
        setState({
          price: data.price,
          currency: data.currency || 'QAR',
          isLoading: false,
          error: data.success ? null : 'Price not found',
          lastUpdated: new Date().toISOString()
        });

      } catch (error) {
        setState({
          price: null,
          currency: 'QAR',
          isLoading: false,
          error: error.message,
          lastUpdated: new Date().toISOString()
        });
      }
    };

    if (productUrl) {
      fetchPrice();
      
      // Refresh every 30 minutes
      const interval = setInterval(fetchPrice, 10 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [productUrl]);

  return state;
}