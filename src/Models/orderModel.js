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
  