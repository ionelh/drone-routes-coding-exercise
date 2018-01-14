import RoutesManagerComponent from './routesManagerComponent.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainWrapper = document.getElementsByClassName('main-wrapper')[0];
  const routesManagerComponent = new RoutesManagerComponent('map.png', mainWrapper, handleSaveRoutes);

  function handleSaveRoutes(routes) {
    // TODO: send'em to the server ...
    localStorage.setItem('routes', JSON.stringify(routes));
  }
});
