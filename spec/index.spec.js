const request = require('request');
const controller = require('../src/controllers/controller');


// just a test for good set up
describe('calc', () => {
  it('should multiply 2 and 2', () => {
    expect(2*2).toBe(4)
  })
});


// Tests of GET request
describe('get error estimation', () => {
  it('should return 200 ok' , (done) => {
    request.get('http://localhost:3000/test/1', (err, res) => {
      expect(res.statusCode).toEqual(200)
      done()
    })
  });
  
  it('should return an array that\' not empty' , (done) => {
    request.get('http://localhost:3000/test/1', (err, res) => {
      expect(JSON.parse(res.body).length).toBeGreaterThan(0)
      done()
    })
  });
});

// Tests of POST request
describe('get error estimation with post', () => {
  it('should return 200 ok' , (done) => {
    request.post({
      url:     'http://localhost:3000/test',
      json:    {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  -0.15380859375,
                  34.34343606848294
                ],
                [
                  1.51611328125,
                  34.66935854524543
                ],
                [
                  0.142822265625,
                  33.687781758439364
                        ]
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                      "type": "LineString",
                      "coordinates": [
                        [
                          0.02197265625,
                          33.96158628979907
                        ],
                        [
                          1.0986328125,
                          33.669496972795535
                        ],
                        [
                          1.2084960937499998,
                          32.80574473290688
                        ]
                      ]
                    }
                  }
                ]
              }    
            }, (err, res) => {
              expect(res.statusCode).toEqual(200)
              done()
            })
          });
          
          it('should return an array that\'s not empty' , (done) => {
            request.post({
              url:     'http://localhost:3000/test',
              json:    {
                "type": "FeatureCollection",
                "features": [
                  {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                      "type": "LineString",
                      "coordinates": [
                        [
                          -0.15380859375,
                          34.34343606848294
                        ],
                        [
                          1.51611328125,
                          34.66935854524543
                        ],
                        [
                          0.142822265625,
                          33.687781758439364
                        ]
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                      "type": "LineString",
                      "coordinates": [
                        [
                          0.02197265625,
                          33.96158628979907
                        ],
                        [
                          1.0986328125,
                          33.669496972795535
                        ],
                        [
                          1.2084960937499998,
                          32.80574473290688
                        ]
                      ]
                    }
                  }
                ]
              }    
            }, (err, res) => {
              expect(res.body.length).toBeGreaterThan(0)
              done()
            })
          });
        });
        
        
describe('calculate error estimation', () => {
  it('should return the value specefied in toEqual test1', (done) => {
    const errorEsimation = controller.getErrorEstimation("test1");
    expect(errorEsimation).toEqual([30.39160024733143, 59.11428796430666, 138.93398346327302]);
    done();
  });

  it('should return the value specefied in toEqual test2', (done) => {
    const errorEsimation = controller.getErrorEstimation("test2");
    expect(errorEsimation).toEqual([55.88372544192621,167.6509823910685,86.42458276513759,
      61.39169479100003,157.4585011787216,173.87438655040552,
      135.64796207339,100.47746100382997,105.49119788694476,119.86884181783782]);
    done();
  });

  it('should return the value specefied in toEqual test3', (done) => {
    const errorEsimation = controller.getErrorEstimation("test3");
    expect(errorEsimation).toEqual([76.28053498342355,94.47908534949454,
      169.5804089584768,157.36878268876276,109.74834303350475,
      69.87258444499453,170.08887227430597,197.30409969925756]);
    done();
  });

  it('should return the value specefied in toEqual test4', (done) => {
    const errorEsimation = controller.getErrorEstimation("test4")
    expect(errorEsimation).toEqual([151.44203688075794,112.73850485084496,
      127.5043017733941,67.24018454620986,
      88.29200695606205,84.98060168436369]);
    done();
  });

  it('should return the value specefied in toEqual test5', (done) => {
    const errorEsimation = controller.getErrorEstimation("test5");
    expect(errorEsimation).toEqual([11.399867445924807,14.15033237867548,17.984338016174426,
      16.538238675825944,31.98126283431148,43.454607582057385,14.083397435463198]);
    done();
  });

  it('should return the value specefied in toEqual test6', (done) => {
    const errorEsimation = controller.getErrorEstimation("test6");
    expect(errorEsimation).toEqual([43.068433422733484,36.55369537975452,78.44592307040335,
      87.24463668262307,69.99842934019779,80.90120446421129,
      110.8187289304058,104.08526831179665,143.00416630247605]);
    done();
  });

  it('should return the value specefied in toEqual test7', (done) => {
    const errorEsimation = controller.getErrorEstimation("test7");
    expect(errorEsimation).toEqual([307.7318310463327,238.80595904886488,556.3558181403924,
      570.2868174634023,604.8285973562819,512.4978381821966]);
    done();
  });
});