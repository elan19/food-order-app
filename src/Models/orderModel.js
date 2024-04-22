const orderModel = {
    getAll: async function () {
      try {
        const response = await fetch('http://localhost:1337/orders');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    create: async function (orderItem) {
      try {
        const response = await fetch('http://localhost:1337/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderItem)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    update: async (orderId, orderItem) => {
      try {
        const response = await fetch(`http://localhost:1337/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': 'BOI-API-KEY'
          },
          body: JSON.stringify(orderItem)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    delete: async (orderId) => {
      try {
        const response = await fetch(`http://localhost:1337/orders/${orderId}`, {
          method: 'DELETE',
          headers: {
            'API-KEY': 'BOI-API-KEY'
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    getOne: async (orderId) => {
      try {
        const response = await fetch(`http://localhost:1337/orders/${orderId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  module.exports = orderModel;
  