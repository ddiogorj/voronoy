
const windowWidth = 640;
const windowHeight = 480;

let seedPoints = [];
let delaunay;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 100; i++) {
        seedPoints[i] = createVector(random(width), random(height));
    }

    delaunay = calculateDelaunay(seedPoints);
}



function draw() {
    background(255);

    for (let v of seedPoints) {
        stroke(0);
        strokeWeight(4);
        point(v.x, v.y)
    }

    // //  delaunay triangulation
    // noFill()
    // strokeWeight(1)
    // let { points , triangles } = delaunay;
    // for (let i= 0; i< triangles.length; i+= 3) {
    //     let a = 2 * delaunay.triangles[i];
    //     let b = 2 * delaunay.triangles[i+1];
    //     let c = 2 * delaunay.triangles[i+2];
    // triangle(
    //     points[a], points[a + 1],
    //     points[b], points[b + 1],
    //     points[c], points[c + 1]);
    // }

    //  draw voronoi tesselation
    let voronoi = delaunay.voronoi([0, 0, width, height]);
    let polygons = voronoi.cellPolygons();
    noFill();
    strokeWeight(1);

    for (let poly of polygons) {
        beginShape();
        for (let i=0; i < poly.length; i++) {
            vertex(poly[i][0], poly[i][1]);
        }
        endShape();
    }


}

function calculateDelaunay(points) {
    let pointsArray = [];
    for (let v of points) {
        pointsArray.push(v.x, v.y);
    }
    console.log(pointsArray)
    return new d3.Delaunay(pointsArray);
}

