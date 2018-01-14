let routes = [];

if (localStorage.getItem('routes')) {
  routes = JSON.parse(localStorage.getItem('routes'));
}

let crtRouteIndex = 0;
let changesHandler;

class RoutesModel {
  setChangesHandler(handler) {
    changesHandler = handler;
  }

  addPointToCrtRoute(point) {
    if (routes[crtRouteIndex]) {
      routes[crtRouteIndex].push(point);
      this.notifyListeners();
    }
  }

  getCrtRoute() {
    return routes[crtRouteIndex];
  }

  setCrtRouteIndex(routeIndex) {
    crtRouteIndex = routeIndex;
    this.notifyListeners();
  }

  getCrtRouteIndex() {
    return crtRouteIndex;
  }

  getAllRoutes() {
    return routes;
  }

  addRoute() {
    routes.push([]);
    crtRouteIndex = routes.length - 1;
    this.notifyListeners();
  }

  // removes the last point in the current route, not a great name
  popCrtRoute() {
    routes[crtRouteIndex].pop();
    this.notifyListeners();
    return routes[crtRouteIndex];
  }

  notifyListeners() {
    changesHandler();
  }
}

export default new RoutesModel();
