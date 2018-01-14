import RouteBuilderComponent from './routeBuilderComponent.js';
import RoutesModel from './routesModel.js';
import ListComponent from './listComponent.js';

class RoutesManagerComponent {
  constructor(mapImg, wrapper, saveRoutesHandler) {
    this.handleRoutesModelChanges = this.handleRoutesModelChanges.bind(this);
    this.init(mapImg, wrapper);
    this.saveRoutesHandler = saveRoutesHandler;
  }

  handleRoutesModelChanges() {
    this.routeBuilderComponent.drawRoute(RoutesModel.getCrtRoute());
    this.listComponent.addItem(RoutesModel.getAllRoutes().length);
  }

  init(mapImg, wrapper) {
    // TODO: Too large, break down into smaller methods
    RoutesModel.setChangesHandler(this.handleRoutesModelChanges);

    const mapWrapper = document.createElement('div');
    mapWrapper.classList.add('map-wrapper');
    wrapper.appendChild(mapWrapper);

    this.routeBuilderComponent = new RouteBuilderComponent(mapWrapper);
    this.routeBuilderComponent.drawRoute(RoutesModel.getCrtRoute());

    const listWrapper = document.createElement('div');
    listWrapper.classList.add('list-wrapper');
    wrapper.appendChild(listWrapper);

    const addBtn = document.createElement('button');
    addBtn.innerHTML = 'Add route';
    listWrapper.appendChild(addBtn);
    addBtn.addEventListener('click', e => {
      RoutesModel.addRoute();
    });

    const saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'Save routes';
    listWrapper.appendChild(saveBtn);
    saveBtn.addEventListener('click', e => {
      this.saveRoutesHandler(RoutesModel.getAllRoutes());
    });
  
    const imageElm = document.createElement('img');
    imageElm.src = mapImg;
    mapWrapper.appendChild(imageElm);

    function handleListItemClick(routeIndex) {
      const listItems = listWrapper.getElementsByTagName('a');
      listItems[RoutesModel.getCrtRouteIndex()].classList.remove('selected');
      listItems[routeIndex].classList.add('selected');
      RoutesModel.setCrtRouteIndex(routeIndex);
    }
    handleListItemClick = handleListItemClick.bind(this);
    this.listComponent = new ListComponent(RoutesModel.getAllRoutes().length, listWrapper, handleListItemClick);
  
    this.routeBuilderComponent.routeCanvas.addEventListener('click', e => {
      RoutesModel.addPointToCrtRoute([e.offsetX, e.offsetY]);
    });

    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) { // escape key
        RoutesModel.popCrtRoute();
      }
    });
  }
}

export default RoutesManagerComponent;
