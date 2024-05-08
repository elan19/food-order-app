const menuModel = {
    getAll: async function () {
      try {
        const response = await fetch('http://localhost:1337/menu');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    create: async function (menuItem) {
      try {
        const response = await fetch('http://localhost:1337/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': 'BOI-API-KEY'
          },
          body: JSON.stringify(menuItem)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    update: async function (menuId, menuItem) {
      try {
        const response = await fetch(`http://localhost:1337/menu/${menuId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': 'BOI-API-KEY'
          },
          body: JSON.stringify(menuItem)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  
    delete: async function (menuId) {
      try {
        const response = await fetch(`http://localhost:1337/menu/${menuId}`, {
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
  
    getOne: async function (menuId) {
      try {
        const response = await fetch(`http://localhost:1337/menu/${menuId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },

    getCategory: async function (category) {
      try {
        const response = await fetch(`http://localhost:1337/menu/${category}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  export default menuModel;
  