import * as MESHLINE from "three.meshline";
import * as THREE from "three";

class OrbitCurve extends THREE.Curve {
  constructor(focus, a, e, I, L, long_peri, long_node) {
    super();

    this.type = "OrbitCurve";

    this.focus = focus;

    this.a = a; // semi-major axis
    this.e = e; // eccentricity
    this.I = I; // inclination
    this.L = L; // mean longitude
    this.long_peri = long_peri; // longitude of perihelion
    this.long_node = long_node; // longitude of the ascending node

    this.arg_peri = this.long_peri - this.long_node;
  }

  getPoint(t, optionalTarget) {
    const point = optionalTarget || new THREE.Vector3();

    const E = t * 360;
    const conversion = Math.PI / 180;

    const x = this.a * (Math.cos(conversion * E) - this.e);
    const y =
      this.a * Math.sqrt(1 - Math.pow(this.e, 2)) * Math.sin(conversion * E);

    const co = Math.cos(conversion * this.arg_peri);
    const cO = Math.cos(conversion * this.long_node);
    const cI = Math.cos(conversion * this.I);
    const so = Math.sin(conversion * this.arg_peri);
    const sO = Math.sin(conversion * this.long_node);
    const sI = Math.sin(conversion * this.I);

    const x_ecl = (co * cO - so * sO * cI) * x + (-so * cO - co * sO * cI) * y;
    const y_ecl = (co * sO + so * cO * cI) * x + (-so * sO + co * cO * cI) * y;
    const z_ecl = so * sI * x + co * sI * y;

    return point.set(x_ecl, y_ecl, z_ecl);
  }
}

class OrbitingObject {
  constructor(name, focus, a, e, I, L, long_peri, long_node) {
    this.name = name || "";
    this.focus = focus || new THREE.Vector3(0, 0, 0);

    this.a = a; // semi-major axis
    this.e = e; // eccentricity
    this.I = I; // inclination
    this.L = L; // mean longitude
    this.long_peri = long_peri; // longitude of perihelion
    this.long_node = long_node; // longitude of the ascending node
  }
}

class Planet extends OrbitingObject {
  constructor(name, elements, color) {
    super(name);

    this.color = color;
    this.time_centuries = this.getCenturiesTT();

    for (let key in elements) {
      if (elements.hasOwnProperty(key)) {
        // Part 1: compute planet's six elements
        this[key] = elements[key][0] + this.time_centuries * elements[key][1];
      }
    }

    // Part 2: compute argument of perihelion
    this.arg_peri = this.long_peri - this.long_node;

    // Part 3: modulus the mean anomaly so -180 <= M <= 180
    this.M = ((this.L - this.long_peri + 180) % 360) - 180;
  }

  solveKepler(tol) {
    // Currently only solves in degrees
    tol = tol || 1e-6;

    const e_star = (180 / Math.PI) * this.e;
    let E_n = this.M + e_star * Math.sin((Math.PI / 180) * this.M);
    let delta = 360;
    let count = 0;

    while (Math.abs(delta) > tol) {
      delta =
        (this.M - (E_n - e_star * Math.sin((Math.PI / 180) * E_n))) /
        (1 - this.e * Math.cos((Math.PI / 180) * E_n));
      E_n = E_n + delta;
      count = count + 1;
    }

    return E_n;
  }

  getCenturiesTT() {
    // Get the number of centuries that have elapsed since J2000.0, TT
    const nowTT = this.getNowTT();
    return (nowTT / 86400.0 - 10957.5) / 36525;
  }

  getNowTT() {
    // Get the current time as a unix seconds, but in Terrestrial Time
    return Date.now() / 1000 + 69.184;
  }

  initialiseOrbit() {
    this.curve = new OrbitCurve(
      this.focus,
      this.a,
      this.e,
      this.I,
      this.L,
      this.long_peri,
      this.long_node
    );

    this.E = this.solveKepler();
    this.currentPosition = this.curve.getPoint(this.E / 360);
  }

  showInScene(scene, camera) {
    const points = this.curve.getPoints(100);

    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry = geometry.getAttribute("position").array; // Needed due to strange error...

    const line = new MESHLINE.MeshLine();
    line.setGeometry(geometry);

    const material = new MESHLINE.MeshLineMaterial({
      useMap: false,
      color: this.color,
      opacity: 1,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      sizeAttenuation: false,
      lineWidth: 5,
    });

    const mesh = new THREE.Mesh(line.geometry, material);
    scene.add(mesh);
  }
}

export { Planet, OrbitCurve };
