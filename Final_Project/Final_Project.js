

var canvas;
var gl;

//Global array
var pointsArray = [];
var texCoordsArray = [];
var normalsArray = [];
var index = 0;


//Matrix
var modelViewMatrix, projectionMatrix, worldMatrix,CurModelViewMatrix;
var modelViewMatrixLoc, projectionMatrixLoc,reverseLightDirectionLocation,worldLocation,CurModelViewMatrixLoc;
 var lightWorldPositionLocation;
//Projection matrix
var fovy = 60.0;    
var aspect = 1.0;   

var near = 0.1;
var far = 100.0;
var radius = -40.0;//Camera
var theta = 0.0;
var phi = 0.0;// Projection 2
var dr = 5.0 * Math.PI/180.0;


var th1=0.0;

var atx=0.0;
var aty=0.0;
var atz=-10;

var eyex=0.0;
var eyey=0.0;
var eyez=-20;

var forwardview=1;
var backview=1;
var rightview=1;
var leftview=1;
var upview=1;
var downview=1;


var xLight=0;
var yLight=10;
var zLight=-10;
//parallel light
var sun1=1;
var sun2=1;
var sunTheta=0;
var sunControl=1;
var dotControl=1;
var limitControl=1;

var view=1;

//Point light
var lx=0;
var ly=6;
var lz=0;

//Camera 2
var eye = vec3(0.0, 0.0, -2);
var at = vec3(atx,aty, atz);
var up = vec3(0, 1,0);
var upCon=0;
var twochange=0;



//buffer
var vBuffer1,tBuffer1,nBuffer1;
var vTexCoord,vNormal,vPosition;
var Object1Tx = 1.5; 
var Object1Ty = 0;
var Object1Tz = 0;
var Object1RotateAngle = 0; //rotation
var Object1Scale = 1;//size
var object1Len = 0;
var face=1;

//action variable
var pixelForward=0;
var pixelBackward=0;
var pixelRight=0;
var pixelLeft=0;
var pixelBigger=0;
var pixelSmaller=0;

//buffer
var vBuffer2,tBuffer2,nBuffer2;
var vTexCoord2,vNormal2,vPosition2;
var Object2Tx = 0; 
var Object2Ty = 0;
var Object2Tz = 0;
var Object2RotateAngle = 0; //rotation
var Object2Scale = 1;//size
var object2Len = 0;

// things 3
var giraffeForward=0;
var giraffeBackward=0;
var giraffeRight=0;
var giraffeLeft=0;
var giraffeBigger=0;
var giraffeSmaller=0;
var face2=1;

//buffer
var vBuffer3,tBuffer3,nBuffer3;
var vTexCoord3,vNormal3,vPosition3;
var Object3Tx = 1.5; 
var Object3Ty = -2.5;
var Object3Tz = 0;
var Object3RotateAngle = 0; 
var Object3RotateAngleX = 0; 
var Object3Scale = 1;
var object3Len = 0;
var forward3=1;

//buffer
var vBuffer4,tBuffer4,nBuffer4;
var vTexCoord4,vNormal4,vPosition4;
var Object4Tx = 1.5; 
var Object4Ty = -2.5;
var Object4Tz = 0;
var Object4RotateAngle = 0; 
var Object4RotateAngleX = 0; 
var Object4Scale = 1;
var object4Len = 0;
var forward4=1;


//buffer
var vBuffer5,tBuffer5,nBuffer5;
var vTexCoord5,vNormal5,vPosition5;
var object5Len = 0;

//buffer
var vBuffer6,tBuffer6,nBuffer6;
var vTexCoord6,vNormal6,vPosition6;
var Object6Tx = 0; 
var Object6Ty = 6;
var Object6Tz = 0;
var object6Len = 0;

//camera
var cameraControl1=0;
var cameraControl2=0;
var cameraControl3=0;
var cameraControl4=0;
var cameraControl5=0;
var cameraControl6=0;

//light
var light1=0;
var light2=0;
var light3=0;
var light4=0;
var light5=0;
var light6=0;


//text
var texCoord = [
//human
  vec2(0,1),

  vec2(0,1),
  vec2(0.25,1),
  vec2(0.5,1),
  vec2(0.75,1),
  vec2(1,1),

  vec2(0,0.75),
  vec2(0.25,0.75),
  vec2(0.5,0.75),
  vec2(0.75,0.75),
  vec2(1,0.75),

  vec2(0,0.5),
  vec2(0.25,0.5),
  vec2(0.5,0.5),
  vec2(0.75,0.5),
  vec2(1,0.5),

  vec2(0,0.25),
  vec2(0.25,0.25),
  vec2(0.5,0.25),
  vec2(0.75,0.25),
  vec2(1,0.25),

  vec2(0,0),
  vec2(0.25,0),
  vec2(0.5,0),
  vec2(0.75,0),
  vec2(1,0),

//**************************PIG
  vec2(0,1),
  vec2(1/3,1),
  vec2(2/3,1),
  vec2(1,1),

  vec2(0,2/3),
  vec2(1/3,2/3),
  vec2(2/3,2/3),
  vec2(1,2/3),

  vec2(0,1/3),
  vec2(1/3,1/3),
  vec2(2/3,1/3),
  vec2(1,1/3), 

  vec2(0,0),
  vec2(1/3,0),
  vec2(2/3,0),
  vec2(1,0), 

  //ground
  vec2(0,1),
  vec2(1,1),
  vec2(0,0.3),
  vec2(1,0.3),
  vec2(0,0),
  vec2(1,0),

];

var vertices = [
    //head
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),

    vec4(0,0,0,1),

    //body
     vec4(-0.3,-0.5,0.3,1),
     vec4(0.3,-0.5,0.3,1),
     vec4(0.3,-0.5,-0.3,1),
     vec4(-0.3,-0.5,-0.3,1),

     vec4(-0.45,-1.5,0.45,1),
     vec4(0.45,-1.5,0.45,1),
     vec4(0.45,-1.5,-0.45,1),
     vec4(-0.45,-1.5,-0.45,1),


     vec4(-0.65,-2.3,0.65,1),
     vec4(0.65,-2.3,0.65,1),
     vec4(0.65,-2.3,-0.65,1),
     vec4(-0.65,-2.3,-0.65,1),


     vec4(0.1,0.5,0.1,1),
     vec4(0.3,0.5,0.1,1),
     vec4(0.3,0.5,-0.1,1),
     vec4(0.1,0.5,-0.1,1),

     vec4(0.1,-1,0.1,1),
     vec4(0.3,-1,0.1,1),
     vec4(0.3,-1,-0.1,1),
     vec4(0.1,-1,-0.1,1),

     vec4(-0.3,0.5,0.1,1),
     vec4(-0.1,0.5,0.1,1),
     vec4(-0.1,0.5,-0.1,1),
     vec4(-0.3,0.5,-0.1,1),
     
     vec4(-0.3,-1,0.1,1),
     vec4(-0.1,-1,0.1,1),
     vec4(-0.1,-1,-0.1,1), 
     vec4(-0.3,-1,-0.1,1),

   
     vec4(-0.35,-0.8,0.05,1),
     vec4(-0.25,-0.8,0.05,1),
     vec4(-0.25,-0.8,-0.05,1),
     vec4(-0.35,-0.8,-0.05,1),
     
     vec4(-0.8,-1.75,0.05,1),
     vec4(-0.7,-1.8,0.05,1),
     vec4(-0.7,-1.8,-0.05,1),
     vec4(-0.8,-1.75,-0.05,1),   


     vec4(0.25,-0.8,0.05,1),
     vec4(0.35,-0.8,0.05,1),
     vec4(0.35,-0.8,-0.05,1),
     vec4(0.25,-0.8,-0.05,1),
     
     vec4(0.7,-1.8,0.05,1),
     vec4(0.8,-1.75,0.05,1),
     vec4(0.8,-1.75,-0.05,1), 
     vec4(0.7,-1.8,-0.05,1),


     vec4(-0.5,-0.0,0.2,1),
     vec4(-0.5,0.4,0.2,1),
     vec4(-0.65,0.4,0.2,1),
     vec4(-0.65,-0,0.2,1),

     vec4(-0.5,-0,-0.2,1),
     vec4(-0.5,0.4,-0.2,1),
     vec4(-0.65,0.4,-0.2,1),
     vec4(-0.65,-0,-0.2,1),  

     vec4(-1.5,-1.5,0,1),


     vec4(0.5,-0.0,0.2,1),
     vec4(0.5,0.4,0.2,1),
     vec4(0.65,0.4,0.2,1),
     vec4(0.65,-0,0.2,1),  

     vec4(0.5,-0,-0.2,1),
     vec4(0.5,0.4,-0.2,1),
     vec4(0.65,0.4,-0.2,1),
     vec4(0.65,-0,-0.2,1),     

     vec4(1.5,-1.5,0,1),

//pig
    vec4(-0.5, -2.6, 0.5, 1.0),
    vec4(-0.5, -1.6, 0.5, 1.0),
    vec4(0.5, -1.6, 0.5, 1.0),
    vec4(0.5, -2.6, 0.5, 1.0),
    vec4(-0.5, -2.6, -0.5, 1.0),
    vec4(-0.5, -1.6, -0.5, 1.0),
    vec4(0.5, -1.6, -0.5, 1.0),
    vec4(0.5, -2.6, -0.5, 1.0),


    vec4(-0.7,-2.7,2,1),
    vec4(-0.7,-1.7,2,1),
    vec4(0.7,-1.7,2,1),
    vec4(0.7,-2.7,2,1),
    vec4(-0.7,-2.7,0.3,1),
    vec4(-0.7,-1.7,0.3,1),
    vec4(0.7,-1.7,0.3,1),
    vec4(0.7,-2.7,0.3,1),    


    vec4(-0.6, -3.5, 0.8, 1.0),
    vec4(-0.6, -2.6, 0.8, 1.0),
    vec4(-0.2, -2.6, 0.8, 1.0),
    vec4(-0.2, -3.5, 0.8, 1.0),
    vec4(-0.6, -3.5, 0.4, 1.0),
    vec4(-0.6, -2.6, 0.4, 1.0),
    vec4(-0.2, -2.6, 0.4, 1.0),
    vec4(-0.2, -3.5, 0.4, 1.0),


    vec4(0.2, -3.5, 0.7, 1.0),
    vec4(0.2, -2.6, 0.7, 1.0),
    vec4(0.6, -2.6, 0.7, 1.0),
    vec4(0.6, -3.5, 0.7, 1.0),
    vec4(0.2, -3.5, 0.3, 1.0),
    vec4(0.2, -2.6, 0.3, 1.0),
    vec4(0.6, -2.6, 0.3, 1.0),
    vec4(0.6, -3.5, 0.3, 1.0),


    vec4(-0.6, -3.5, 1.9, 1.0),
    vec4(-0.6, -2.6, 1.9, 1.0),
    vec4(-0.2, -2.6, 1.9, 1.0),
    vec4(-0.2, -3.5, 1.9, 1.0),
    vec4(-0.6, -3.5, 1.5, 1.0),
    vec4(-0.6, -2.6, 1.5, 1.0),
    vec4(-0.2, -2.6, 1.5, 1.0),
    vec4(-0.2, -3.5, 1.5, 1.0),


    vec4(0.2, -3.5, 1.9, 1.0),
    vec4(0.2, -2.6, 1.9, 1.0),
    vec4(0.6, -2.6, 1.9, 1.0),
    vec4(0.6, -3.5, 1.9, 1.0),
    vec4(0.2, -3.5, 1.5, 1.0),
    vec4(0.2, -2.6, 1.5, 1.0),
    vec4(0.6, -2.6, 1.5, 1.0),
    vec4(0.6, -3.5, 1.5, 1.0),


    vec4(-0.15, -2.4, 2.15, 1.0),
    vec4(-0.15, -2.1, 2.15, 1.0),
    vec4(0.15, -2.1, 2.15, 1.0),
    vec4(0.15, -2.4, 2.15, 1.0),
    vec4(-0.15, -2.4, 2, 1.0),
    vec4(-0.15, -2.1, 2, 1.0),
    vec4(0.15, -2.1, 2, 1.0),
    vec4(0.15, -2.4, 2, 1.0),


    vec4(-0.18, -2.5, -0.4, 1.0),
    vec4(-0.18, -2.25, -0.4, 1.0),
    vec4(0.18, -2.25, -0.4, 1.0),
    vec4(0.18, -2.5, -0.4, 1.0),
    vec4(-0.18, -2.5, -0.65, 1.0),
    vec4(-0.18, -2.25, -0.65, 1.0),
    vec4(0.18, -2.25, -0.65, 1.0),
    vec4(0.18, -2.5, -0.65, 1.0),

    vec4(-20,0,20,1),
    vec4(-20,0,-20,1),
    vec4(20,0,-20,1),
    vec4(20,0,20,1),


    vec4(-20,20,20,1),
    vec4(-20,0,20,1),
    vec4(20,0,20,1),
    vec4(20,20,20,1),

];

var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);



window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    aspect =  canvas.width/canvas.height;

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1, 1, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    initCY();
    object1Len =pointsArray.length;

    initPig();
    object2Len=pointsArray.length-object1Len;

    intiRCY();
    object3Len=pointsArray.length-object1Len-object2Len;
    
    initLCY();
    object4Len=pointsArray.length-object1Len-object2Len-object3Len;

    initGround();
    object5Len=pointsArray.length-object1Len-object2Len-object3Len-object4Len;

    initSun();
    object6Len=pointsArray.length-object1Len-object2Len-object3Len-object4Len-object5Len;    


    vBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray.slice(0,object1Len)), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation( program, "vPosition");
    gl.enableVertexAttribArray(vPosition);


//texture
    tBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray.slice(0,object1Len)), gl.STATIC_DRAW);
    vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord);



    nBuffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray.slice(0,object1Len)), gl.STATIC_DRAW );
    vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( vNormal );

//texture image
    var image1 = document.getElementById("cy");
    configureTexture1(image1);



    vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray.slice(object1Len, pointsArray.length)), gl.STATIC_DRAW);
    vPosition2 = gl.getAttribLocation( program, "vPosition");
    gl.enableVertexAttribArray(vPosition2);



    tBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray.slice(object1Len, texCoordsArray.length)), gl.STATIC_DRAW);
    vTexCoord2 = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord2);



    nBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray.slice(object1Len, normalsArray.length)), gl.STATIC_DRAW );
    vNormal2 = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( vNormal2 );

    var image2 = document.getElementById("pig");
    configureTexture2(image2);


    vBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray.slice(object1Len+object2Len, pointsArray.length)), gl.STATIC_DRAW);
    vPosition3 = gl.getAttribLocation( program, "vPosition");
    gl.enableVertexAttribArray(vPosition3);



    tBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray.slice(object1Len+object2Len, texCoordsArray.length)), gl.STATIC_DRAW);
    vTexCoord3 = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord3);


    nBuffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray.slice(object1Len+object2Len, normalsArray.length)), gl.STATIC_DRAW );
    vNormal3 = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( vNormal3 );

    vBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray.slice(object1Len+object2Len+object3Len, pointsArray.length)), gl.STATIC_DRAW);
    vPosition4 = gl.getAttribLocation( program, "vPosition");
    gl.enableVertexAttribArray(vPosition4);

    tBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer4);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray.slice(object1Len+object2Len+object3Len, texCoordsArray.length)), gl.STATIC_DRAW);
    vTexCoord4 = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord4);


    nBuffer4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer4 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray.slice(object1Len+object2Len+object3Len, normalsArray.length)), gl.STATIC_DRAW );
    vNormal4 = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( vNormal4 );



    vBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray.slice(object1Len+object2Len+object3Len+object4Len, pointsArray.length)), gl.STATIC_DRAW);
    vPosition5 = gl.getAttribLocation( program, "vPosition");
    gl.enableVertexAttribArray(vPosition5);


    tBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer5);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray.slice(object1Len+object2Len+object3Len+object4Len, texCoordsArray.length)), gl.STATIC_DRAW);
    vTexCoord5 = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord5);
    var image5 = document.getElementById("ground");
    configureTexture5(image5);

    nBuffer5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer5 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray.slice(object1Len+object2Len+object3Len+object4Len, normalsArray.length)), gl.STATIC_DRAW );
    vNormal5 = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( vNormal5 );

    vBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray.slice(object1Len+object2Len+object3Len+object4Len+object5Len, pointsArray.length)), gl.STATIC_DRAW);
    vPosition6 = gl.getAttribLocation( program, "vPosition");
    gl.enableVertexAttribArray(vPosition5);


    tBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer6);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray.slice(object1Len+object2Len+object3Len+object4Len+object5Len, texCoordsArray.length)), gl.STATIC_DRAW);
    vTexCoord6 = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord6);


    nBuffer6 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer6 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray.slice(object1Len+object2Len+object3Len+object4Len+object5Len, normalsArray.length)), gl.STATIC_DRAW );
    vNormal6 = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( vNormal6 );


//global variable
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
    reverseLightDirectionLocation =gl.getUniformLocation(program, "u_reverseLightDirection");
    worldLocation = gl.getUniformLocation(program, "u_world");
    CurModelViewMatrixLoc = gl.getUniformLocation(program, "modelView");
    lightWorldPositionLocation =gl.getUniformLocation(program, "u_lightWorldPosition");
//**************************************
    document.getElementById("camera1").onmousedown = function() {
        cameraControl1=1;

    };
    document.getElementById("camera1").onmouseup = function() {
        cameraControl1=0;
    };

    document.getElementById("camera2").onmousedown = function() {
       cameraControl2=1;

    };
    document.getElementById("camera2").onmouseup = function() {
       cameraControl2=0;
    };

    document.getElementById("camera3").onmousedown = function() {
        cameraControl3=1;
    };
    document.getElementById("camera3").onmouseup = function() {
        cameraControl3=0;

    };
    document.getElementById("camera4").onmousedown = function() {
        cameraControl4=1;
    };
    document.getElementById("camera4").onmouseup = function() {
        cameraControl4=0;
    };

    document.getElementById("camera5").onmousedown = function() {
        cameraControl5=1;
    };
    document.getElementById("camera5").onmouseup = function() {
        cameraControl5=0;

    };
    document.getElementById("camera6").onmousedown = function() {
        cameraControl6=1;
    };
    document.getElementById("camera6").onmouseup = function() {
        cameraControl6=0;
    };

   document.getElementById("light1").onmousedown = function() {
        light1=1;

    };
    document.getElementById("light1").onmouseup = function() {
        light1=0;
    };

    document.getElementById("light2").onmousedown = function() {
       light2=1;

    };
    document.getElementById("light2").onmouseup = function() {
       light2=0;
    };

    document.getElementById("light3").onmousedown = function() {
        light3=1;
    };
    document.getElementById("light3").onmouseup = function() {
        light3=0;

    };
    document.getElementById("light4").onmousedown = function() {
        light4=1;
    };
    document.getElementById("light4").onmouseup = function() {
        light4=0;
    };

    document.getElementById("light5").onmousedown = function() {
        light5=1;
    };
    document.getElementById("light5").onmouseup = function() {
        light5=0;

    };
    document.getElementById("light6").onmousedown = function() {
        light6=1;
    };
    document.getElementById("light6").onmouseup = function() {
        light6=0;
    };

    document.getElementById("Object1Forward").onmousedown = function() {
        pixelForward=1;
    };
    document.getElementById("Object1Forward").onmouseup = function() {
        pixelForward=0;
    };


    document.getElementById("Object1Backward").onmousedown = function() {
        pixelBackward=1;
    };
    document.getElementById("Object1Backward").onmouseup = function() {
        pixelBackward=0;
    };


    document.getElementById("Object1R1").onmousedown = function() {
        pixelRight=1;
    };
    document.getElementById("Object1R1").onmouseup = function() {
        pixelRight=0;
    };


    document.getElementById("Object1R2").onmousedown = function() {
        pixelLeft=1;
    };
    document.getElementById("Object1R2").onmouseup = function() {
        pixelLeft=0;
    };


    document.getElementById("Object1ZoomIn").onmousedown = function() {
        pixelBigger=1;
    };
    document.getElementById("Object1ZoomIn").onmouseup = function() {
        pixelBigger=0;
    };

    document.getElementById("Object1ZoomOut").onmousedown = function() {
        pixelSmaller=1;
    };
    document.getElementById("Object1ZoomOut").onmouseup= function() {
        pixelSmaller=0;
    };

    document.getElementById("Object2Forward").onmousedown = function() {
        giraffeForward=1;
    };
    document.getElementById("Object2Forward").onmouseup = function() {
        giraffeForward=0;
    };


    document.getElementById("Object2Backward").onmousedown = function() {
        giraffeBackward=1;
    };
    document.getElementById("Object2Backward").onmouseup = function() {
        giraffeBackward=0;
    };


    document.getElementById("Object2R1").onmousedown = function() {
        giraffeRight=1;
    };
    document.getElementById("Object2R1").onmouseup = function() {
        giraffeRight=0;
    };


    document.getElementById("Object2R2").onmousedown = function() {
        giraffeLeft=1;
    };
    document.getElementById("Object2R2").onmouseup = function() {
        giraffeLeft=0;
    };


    document.getElementById("Object2ZoomIn").onmousedown = function() {
        giraffeBigger=1;
    };
    document.getElementById("Object2ZoomIn").onmouseup = function() {
        giraffeBigger=0;
    };


    document.getElementById("Object2ZoomOut").onmousedown = function() {
        giraffeSmaller=1;
    };
    document.getElementById("Object2ZoomOut").onmouseup= function() {
        giraffeSmaller=0;
    };

    document.getElementById("face").onclick = function() {
        face*=-1;
    };

    document.getElementById("face2").onclick = function() {
        face2*=-1;
    };

    document.getElementById("sun1").onclick = function() {
        sun1*=-1;
    };

    document.getElementById("sun2").onclick = function() {
        sun2*=-1;
    };

    document.getElementById("sunlight").onclick = function() {
        sunControl*=-1;
    };

    document.getElementById("dotlight").onclick = function() {
        dotControl*=-1;
    };

    document.getElementById("dot").onclick = function() {
        limitControl*=-1;
    };

    document.getElementById("view").onclick = function() {
        view*=-1;
    };
    document.onkeydown=function(event) {
       var e = event || window.event || arguments.callee.caller.arguments[0];
       if(e && e.keyCode==40)
       { 
          //down
          backview=-1;
       }
       if(e && e.keyCode==37)
       { 
          //left
          leftview=-1;
       }
       if(e && e.keyCode==39)
       { 
          //right
          rightview=-1;
       }
       if(e && e.keyCode==38)
       { 
          //up
          forwardview=-1;
       };
       if(e && e.keyCode==87)
       { 
          // w
          upview=-1;
       };
       if(e && e.keyCode==83)
       { 
          // s
          downview=-1;
       };
};
    document.onkeyup=function(event) {
       var e = event || window.event || arguments.callee.caller.arguments[0];
       if(e && e.keyCode==40)
       { 
          //left
          backview=1;
       }
       if(e && e.keyCode==37)
       { 
          
          leftview=1;
       }
       if(e && e.keyCode==39)
       { 
          //right
          rightview=1;
       }
       if(e && e.keyCode==38)
       { 
          // up
          forwardview=1;
       };
       if(e && e.keyCode==87)
       { 
          // w
          upview=1;
       };
       if(e && e.keyCode==83)
       { 
          // s
          downview=1;
       };
};

    var image3 = document.getElementById("cy3");
    configureTexture3(image3);

    var image4 = document.getElementById("pig4");
    configureTexture4(image4);

    render();
}



function render() {
    if(pixelForward==1)
    {
        Object1Tx += 0.05*Math.sin(radians(Object1RotateAngle));
        Object1Tz -= 0.05*Math.cos(radians(Object1RotateAngle));  
        Object3Tx += 0.05*Math.sin(radians(Object1RotateAngle));
        Object3Tz -= 0.05*Math.cos(radians(Object1RotateAngle)); 
        Object4Tx += 0.05*Math.sin(radians(Object1RotateAngle));
        Object4Tz -= 0.05*Math.cos(radians(Object1RotateAngle));  

        if(Object3RotateAngleX==-30||Object3RotateAngleX==30)
        	forward3*=-1;
        if(forward3==1)
        	Object3RotateAngleX-=5;
        if(forward3==-1)
        	Object3RotateAngleX+=5;

        if(Object4RotateAngleX==-30||Object4RotateAngleX==30)
        	forward4*=-1;
        if(forward4==1)
        	Object4RotateAngleX+=5;
        if(forward3==-1)
        	Object4RotateAngleX-=5;

    }
    if(pixelBackward==1)
    {
        Object1Tx -= 0.05*Math.sin(radians(Object1RotateAngle));
        Object1Tz += 0.05*Math.cos(radians(Object1RotateAngle));
        Object3Tx -= 0.05*Math.sin(radians(Object1RotateAngle));
        Object3Tz += 0.05*Math.cos(radians(Object1RotateAngle)); 
        Object4Tx -= 0.05*Math.sin(radians(Object1RotateAngle));
        Object4Tz += 0.05*Math.cos(radians(Object1RotateAngle)); 
        if(Object3RotateAngleX==-30||Object3RotateAngleX==30)
        	forward3*=-1;
        if(forward3==1)
        	Object3RotateAngleX-=5;
        if(forward3==-1)
        	Object3RotateAngleX+=5;

        if(Object4RotateAngleX==-30||Object4RotateAngleX==30)
        	forward4*=-1;
        if(forward4==1)
        	Object4RotateAngleX+=5;
        if(forward3==-1)
        	Object4RotateAngleX-=5;
    }
    if(pixelRight==1)
    {
        Object1RotateAngle -= 5;
       // Object3Tx*=0.2*(1-Math.cos(radians(1)));
    }
    if(pixelLeft==1)
    {
        Object1RotateAngle += 5;
    }
    if(pixelBigger==1)
    {
        Object1Scale += 0.005;
    }
    if(pixelSmaller==1)
    {
        Object1Scale -= 0.005;
    }

    if(giraffeForward==1)
    {
        Object2Tx += 0.05*Math.sin(radians(Object2RotateAngle));
        Object2Tz -= 0.05*Math.cos(radians(Object2RotateAngle));       
    }
    if(giraffeBackward==1)
    {
        Object2Tx -= 0.05*Math.sin(radians(Object2RotateAngle));
        Object2Tz += 0.05*Math.cos(radians(Object2RotateAngle));
    }
    if(giraffeRight==1)
    {
        Object2RotateAngle -= 5;
    }
    if(giraffeLeft==1)
    {
        Object2RotateAngle += 5;
    }
    if(giraffeBigger==1)
    {
        Object2Scale += 0.005;
    }
    if(giraffeSmaller==1)
    {
        Object2Scale -= 0.005;
    }

    if(cameraControl1==1)
    {
        radius += 0.1;
    }
    if(cameraControl2==1)
    {
       radius -= 0.1;
    }
    if(cameraControl3==1)
    {
        theta += dr;
    }
    if(cameraControl4==1)
    {
        theta -= dr;
    }
    if(cameraControl5==1)
    {
        phi+=(dr/4);
        upCon+=(dr/4);
    }
    if(cameraControl6==1)
    {
        phi-=(dr/4);
        upCon-=(dr/4); 
    }

    if(light1==1)
    {
        lz-=0.1;
        Object6Tz-=0.1;
    }
    if(light2==1)
    {
        lz+=0.1;
        Object6Tz+=0.1;       
    }
    if(light3==1)
    {
        lx-=0.1;
        Object6Tx-=0.1;        
    }
    if(light4==1)
    {
        lx+=0.1;
        Object6Tx+=0.1;        
    }
    if(light5==1)
    {
        ly+=0.1;
        Object6Ty+=0.1;        
        
    }
    if(light6==1)
    {      
        ly-=0.1;
        Object6Ty-=0.1;         
    }

    if(light6==1)
    {      
        ly-=0.1;
        Object6Ty-=0.1;         
    }
    if(sun1==-1)
    {
        xLight=10;
        yLight=0;
        zLight=-10;
        sunTheta+=1;
        xLight=10*Math.cos(sunTheta/180*Math.PI);
        yLight=10*Math.sin(sunTheta/180*Math.PI);
        if(sunTheta==180)
        {
           sun1=1;
           sunTheta=0;
        }   
    }
    if(sun2==-1)
    {
       xLight=0;
       yLight=8;
       zLight=-5;
    }


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(view==-1)
    {
        if(forwardview==-1)
        {
            eyex -= 0.05*Math.sin(th1/180*Math.PI);
            eyez += 0.05*Math.cos(th1/180*Math.PI); 
            atx -= 0.05*Math.sin(th1/180*Math.PI);
            atz += 0.05*Math.cos(th1/180*Math.PI); 
        }
        if(backview==-1)
        {
            eyex += 0.05*Math.sin(th1/180*Math.PI);
            eyez -= 0.05*Math.cos(th1/180*Math.PI); 
            atx += 0.05*Math.sin(th1/180*Math.PI);
            atz-= 0.05*Math.cos(th1/180*Math.PI);           
        }
        if(rightview==-1)
        {
            th1+=0.5;
            atx = eyex-10*Math.sin(th1/180*Math.PI);
            atz = eyez+10*Math.cos(th1/180*Math.PI);            
        }
        if(leftview==-1)
        {
            th1-=0.5;
            atx = eyex-10*Math.sin(th1/180*Math.PI);
            atz = eyez+10*Math.cos(th1/180*Math.PI);            
        }   
        if(upview==-1)
        {
            eyey+=0.05;
            aty+=0.05;
        }    
        if(downview==-1)
        {
            eyey-=0.05;
            aty-=0.05;
        }   

       eye = vec3(eyex, eyey, eyez);
       at=vec3(atx,aty,atz);
       modelViewMatrix = lookAt(eye, at, up); 
    }
    
    if(view==1)
    {
       eye = vec3(radius*Math.sin(theta)*Math.cos(phi), radius*Math.sin(phi), radius*Math.cos(theta)*Math.cos(phi));
       at=vec3(0,0,0);
       modelViewMatrix = lookAt(eye, at, up);     
    }

    projectionMatrix = perspective(fovy, aspect, near, far);

//switch light
    gl.uniform1i(gl.getUniformLocation(program, "sunControl"), sunControl); 
    gl.uniform1i(gl.getUniformLocation(program, "dotControl"), dotControl); 
    gl.uniform1i(gl.getUniformLocation(program, "limitControl"), limitControl); 


    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // direction
    gl.uniform3fv(reverseLightDirectionLocation, m4.normalize([xLight, yLight, zLight]));//z,y,x
    //position
    gl.uniform3fv(lightWorldPositionLocation, [lx, ly, lz]);
  
    worldMatrix = m4.yRotation(-Object1RotateAngle*Math.PI/180);
    var worldMatrix2 = m4.translation(Object1Tx,0,Object1Tz);
    worldMatrix=m4.multiply(worldMatrix2,worldMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);
    //shader
    if(face==1)
    {
       gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);  	
    } 
    if(face==-1)
    {
    	gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 3);
    }

    var T = translate(Object1Tx, Object1Ty, Object1Tz);
    var R = rotateY(Object1RotateAngle);
    var S = scalem(Object1Scale,Object1Scale,Object1Scale);
    CurModelViewMatrix = mult(T, mult(R,S));
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer1);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer1);
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    //shadow
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer1 );
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0)  
    gl.drawArrays(gl.TRIANGLES, 0, object1Len);


    worldMatrix = m4.yRotation(-Object2RotateAngle*Math.PI/180);
    worldMatrix2 = m4.translation(Object2Tx,0,Object2Tz);
    worldMatrix=m4.multiply(worldMatrix2,worldMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);
 
    if(face2==1)
       gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 2);
    if(face2==-1)
    	gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 4);

    T = translate(Object2Tx, Object2Ty, Object2Tz);
    R = rotateY(Object2RotateAngle);
    S = scalem(Object2Scale,Object2Scale,Object2Scale);
    CurModelViewMatrix = mult(T, mult(R,S));
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer2);
    gl.vertexAttribPointer(vTexCoord2, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer2 );
    gl.vertexAttribPointer(vNormal2, 3, gl.FLOAT, false, 0, 0) 
    gl.drawArrays(gl.TRIANGLES, 0, object2Len);


    worldMatrix = m4.yRotation(-Object1RotateAngle*Math.PI/180);
    worldMatrix2 = m4.translation(Object1Tx,0,Object1Tz);
    worldMatrix=m4.multiply(worldMatrix2,worldMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);

    T = translate(Object3Tx, Object3Ty, Object3Tz);
    R = rotateY(Object1RotateAngle);
    RX = rotateX(Object3RotateAngleX);
    R=mult(R,RX);
    S = scalem(Object3Scale,Object3Scale,Object3Scale);
    CurModelViewMatrix = mult(T, mult(R,S));
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer3);
    gl.vertexAttribPointer(vTexCoord3, 2, gl.FLOAT, false, 0, 0);
  
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer3 );
    gl.vertexAttribPointer(vNormal3, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, object3Len);

    worldMatrix = m4.yRotation(-Object1RotateAngle*Math.PI/180);
    worldMatrix2 = m4.translation(Object1Tx,0,Object1Tz);
    worldMatrix=m4.multiply(worldMatrix2,worldMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);  

    T = translate(Object4Tx, Object4Ty, Object4Tz);
    R = rotateY(Object1RotateAngle);
    RX = rotateX(Object4RotateAngleX);
    R=mult(R,RX);
    S = scalem(Object4Scale,Object4Scale,Object4Scale);
    CurModelViewMatrix = mult(T, mult(R,S));
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer4);
    gl.vertexAttribPointer(vPosition4, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer4);
    gl.vertexAttribPointer(vTexCoord4, 2, gl.FLOAT, false, 0, 0);
  
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer4 );
    gl.vertexAttribPointer(vNormal4, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, object4Len);


    worldMatrix = m4.yRotation(0);
    worldMatrix2 = m4.translation(0,0,0);
    worldMatrix=m4.multiply(worldMatrix2,worldMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);
 
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 5);

    T = translate(0, -3.51, 0);
    R = rotateY(0);
    S = scalem(1,1,1);
    CurModelViewMatrix = mult(T, mult(R,S));
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.vertexAttribPointer(vPosition5, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer5);
    gl.vertexAttribPointer(vTexCoord5, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer5 );
    gl.vertexAttribPointer(vNormal5, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, object5Len);


    worldMatrix = m4.yRotation(0);
    worldMatrix2 = m4.translation(Object6Tx,0,Object6Tz);
    worldMatrix=m4.multiply(worldMatrix2,worldMatrix);
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 2);

    T = translate(Object6Tx, Object6Ty, Object6Tz);
    R = rotateY(0);
    S = scalem(0.5,0.5,0.5);
    CurModelViewMatrix = mult(T, mult(R,S));
    gl.uniformMatrix4fv(CurModelViewMatrixLoc, false, flatten(CurModelViewMatrix));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.vertexAttribPointer(vPosition6, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer6);

    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer6 );
    gl.vertexAttribPointer(vNormal6, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, object6Len);
    window.requestAnimFrame(render);

}


function triangle(a, b, c) {

    pointsArray.push(a);
    pointsArray.push(b);
    pointsArray.push(c);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[1]);
    texCoordsArray.push(texCoord[2]);

    var t1 = subtract(b, c);
    var t2 = subtract(a, b);
    var normal = cross(t1, t2);
    var normal = vec3(normal);

    normalsArray.push(normal);
    normalsArray.push(normal);
    normalsArray.push(normal);

     // normals are vectors
}


function divideTriangle(a, b, c, count) {
    if ( count > 0 ) {

        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);

        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        divideTriangle( a, ab, ac, count - 1 );
        divideTriangle( ab, b, bc, count - 1 );
        divideTriangle( bc, c, ac, count - 1 );
        divideTriangle( ab, bc, ac, count - 1 );
    }
    else {
        triangle( a, b, c );
    }
}


function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}



function quad(a, b, c, d,ta,tb,tc,td) {

	var t1 = subtract(vertices[b], vertices[a]);
    var t2 = subtract(vertices[c], vertices[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);

    pointsArray.push(vertices[a]);
    texCoordsArray.push(texCoord[ta]);
    normalsArray.push(normal);

    pointsArray.push(vertices[b]);
    texCoordsArray.push(texCoord[tb]);
    normalsArray.push(normal);

    pointsArray.push(vertices[c]);
    texCoordsArray.push(texCoord[tc]);
    normalsArray.push(normal);

    pointsArray.push(vertices[a]);
    texCoordsArray.push(texCoord[ta]);
    normalsArray.push(normal);

    pointsArray.push(vertices[c]);
    texCoordsArray.push(texCoord[tc]);
    normalsArray.push(normal);

    pointsArray.push(vertices[d]);
    texCoordsArray.push(texCoord[td]);
    normalsArray.push(normal);
}



function initCY() {
	//head
    quad(1, 0, 3, 2,12,7,6,11);
    quad(2, 3, 7, 6,2,1,6,7);
    quad(3, 0, 4, 7,10,5,4,9);
    quad(6, 5, 1, 2,10,5,4,9);
    quad(4, 5, 6, 7,8,3,2,7);
    quad(5, 4, 0, 1,8,9,4,3);

    //body
    quad(12,11,15,16,9,8,13,14);
    quad(9,12,16,13,12,11,16,17);
    quad(14,15,11,10,12,11,16,17);
    quad(9,13,14,10,12,11,16,17);
    
    //skirt
    quad(16,15,19,20,17,16,21,22);
    quad(13,16,20,17,17,16,21,22);
    quad(15,14,18,19,17,16,21,22);
    quad(14,13,17,18,17,16,21,22);

    //hand
    quad(40,39,43,44,18,17,22,23);
    quad(37,40,44,41,18,17,22,23);
    quad(38,39,43,42,18,17,22,23);
    quad(37,41,42,38,18,17,22,23);


    quad(48,47,51,52,18,17,22,23);
    quad(45,48,52,49,18,17,22,23);
    quad(50,51,47,46,18,17,22,23);
    quad(45,49,50,46,18,17,22,23);


    quad(53, 54, 55, 56,5,4,9,10);
    quad(56, 60, 57, 53,5,4,9,10);
    quad(55, 54, 58, 59,5,4,9,10);
    quad(60, 59, 58, 57,5,4,9,10);

    quad(55,59,61,59,5,4,9,10);
    quad(56,55,61,56,5,4,9,10);
    quad(59,60,61,59,5,4,9,10);
    quad(60,56,61,60,5,4,9,10);


    quad(64, 63, 62, 65,5,4,9,10);
    quad(69, 65, 62, 66,5,4,9,10);
    quad(68, 67, 63, 64,5,4,9,10);
    quad(66, 67, 68, 69,5,4,9,10);

    quad(68,64,70,64,5,4,9,10);
    quad(64,65,70,65,5,4,9,10);
    quad(69,68,70,69,5,4,9,10);
    quad(65,69,70,65,5,4,9,10);


}

function intiRCY()
{

    quad(24,23,27,28,18,17,22,23);
    quad(21,24,28,25,18,17,22,23);
    quad(26,27,23,22,18,17,22,23);
    quad(21,25,26,22,18,17,22,23);
}

function initGround()
{
	quad(138,137,136,135,45,44,46,47);	
	quad(142,141,140,139,42,44,45,43);
}

function initLCY()
{

    quad(32,31,35,36,18,17,22,23);
    quad(29,32,36,33,18,17,22,23);
    quad(30,31,35,34,18,17,22,23);
    quad(29,33,34,30,18,17,22,23);
}

function initSun()
{
    quad(72, 71, 74, 73,31,32,28,27);
    quad(73, 74, 78, 77,28,32,33,29);
    quad(74, 71, 75, 78,31,32,28,27);
    quad(77, 76, 72, 73,31,32,28,27);
    quad(77, 78, 75, 76,26,30,31,27);
    quad(76, 75, 71, 72,30,34,35,31);
}

function initPig()
{
    quad(72, 71, 74, 73,31,32,28,27);
    quad(73, 74, 78, 77,28,32,33,29);
    quad(74, 71, 75, 78,31,32,28,27);
    quad(77, 76, 72, 73,31,32,28,27);
    quad(77, 78, 75, 76,26,30,31,27);
    quad(76, 75, 71, 72,30,34,35,31);
	quad(80, 79, 82, 81,31,32,28,27);
    quad(81, 82, 86, 85,31,32,28,27);
    quad(82, 79, 83, 86,31,32,28,27);
    quad(85, 84, 80, 81,31,32,28,27);
    quad(85, 86, 83, 84,31,32,28,27);
    quad(84, 83, 79, 80,31,32,28,27);

	quad(88, 87, 90, 89,31,32,28,27);
    quad(89, 90, 94, 93,31,32,28,27);
    quad(90, 87, 91, 94,31,32,28,27);
    quad(93, 92, 88, 89,31,32,28,27);
    quad(93, 94, 91, 92,32,36,37,33);
    quad(92, 91, 87, 88,31,32,28,27);

	quad(96, 95, 98, 97,31,32,28,27);
    quad(97, 98, 102, 101,31,32,28,27);
    quad(98, 95, 99, 102,31,32,28,27);
    quad(101, 100, 96, 97,31,32,28,27);
    quad(101, 102, 99, 100,32,36,37,33);
    quad(100, 99, 95, 96,31,32,28,27);


	quad(104, 103, 106, 105,31,32,28,27);
    quad(105, 106, 110, 109,31,32,28,27);
    quad(106, 103, 107, 110,31,32,28,27);
    quad(109, 108, 104, 105,31,32,28,27);
    quad(109, 110, 107, 108,32,36,37,33);
    quad(108, 107, 103, 104,31,32,28,27);


	quad(112, 111, 114, 113,31,32,28,27);
    quad(113, 114, 118, 117,31,32,28,27);
    quad(114, 111, 115, 118,31,32,28,27);
    quad(117, 116, 112, 113,31,32,28,27);
    quad(117, 118, 115, 116,32,36,37,33);
    quad(116, 115, 111, 112,31,32,28,27);


	quad(120, 119, 122, 121,31,32,28,27);
    quad(121, 122, 126, 125,31,32,28,27);
    quad(122, 119, 123, 126,31,32,28,27);
    quad(125, 124, 120, 121,31,32,28,27);
    quad(125, 126, 123, 124,31,32,28,27);
    quad(124, 123, 119, 120,31,32,28,27);


	quad(128, 127, 130, 129,31,32,28,27);
    quad(129, 130, 134, 133,31,32,28,27);
    quad(130, 127, 131, 134,31,32,28,27);
    quad(133, 132, 128, 129,31,32,28,27);
    quad(133, 134, 131, 132,31,35,36,32);
    quad(132, 131, 127, 128,31,32,28,27);
}





function configureTexture1(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
}


function configureTexture2( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);

    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 2);
}


function configureTexture3( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);

    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    gl.uniform1i(gl.getUniformLocation(program, "texture3"), 3);
}


function configureTexture4( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE4);

    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    gl.uniform1i(gl.getUniformLocation(program, "texture4"), 4);
}


function configureTexture5( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE5);

    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    gl.uniform1i(gl.getUniformLocation(program, "texture5"), 5);
}


