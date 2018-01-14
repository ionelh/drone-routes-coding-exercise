let routeCanvas;
let routesCtx;

class RouteBuilderComponent {
  constructor(wrapper) {
    this.drawElements(wrapper);
  }

  drawElements(wrapper) {
    routeCanvas = document.createElement('canvas');
    routesCtx = routeCanvas.getContext("2d");
    routeCanvas.setAttribute('width', '500');
    routeCanvas.setAttribute('height', '500');

    wrapper.appendChild(routeCanvas);
  }

  get routeCanvas() {
    return routeCanvas;
  }

  reset() {
    routesCtx.clearRect(0, 0, routeCanvas.width, routeCanvas.height);
  }

  drawLine(from, to) {
    routesCtx.beginPath();
    routesCtx.moveTo(from[0], from[1]);
    routesCtx.lineTo(to[0], to[1]);
    routesCtx.strokeStyle = "#FF0000";
    routesCtx.stroke();
  }

  drawRoute(route) {
    this.reset();
    if (route) {
      route.forEach((point, i) => {
        const [x, y] = point;
        const prevPoint = i === 0 ? null : route[i - 1];
  
        if (i !== 0) {
          this.drawLine(prevPoint, point);
        }
  
        this.drawCircle(x, y);
      });
    }
  }

  drawCircle(x, y) {
    routesCtx.beginPath();
    routesCtx.arc(x, y, 3, 0, 2 * Math.PI);
    routesCtx.fillStyle = "#FF0000";
    routesCtx.fill();
  }
}

export default RouteBuilderComponent;