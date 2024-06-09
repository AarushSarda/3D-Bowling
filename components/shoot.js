AFRAME.registerComponent("ball",{
    init: function(){
    this.shootBowlingBall()
},
  shootBowlingBall: function(){
    window.addEventListener("keydown",(e)=>{
        if (e.key==="z"){
        var ball = document.createElement("a-entity")
        ball.setAttribute("geometry",{
            primitive:"sphere",
            radius:0.1,
       })
       ball.setAttribute("material",{
        color:"orange",
       })
       ball.setAttribute("dynamic-body",{})

       var cam = document.querySelector("#camera")
       var camera = document.querySelector("#camera").object3D

       var direction = new THREE.Vector3()

       camera.getWorldDirection(direction)
       pos = cam.getAttribute("position")

       ball.setAttribute("position",pos)
       ball.setAttribute("velocity",direction.multiplyScalar(-10))

       ball.addEventListener("collide",this.removeBowlingBall)

       var scene = document.querySelector("#scene")
       scene.appendChild(ball)}
    })
  },
  removeBowlingBall: function (e) {
    //Original entity (bullet)
    console.log(e.detail.target.el);

    //Other entity, which bullet touched.
    console.log(e.detail.body.el);

    //bullet element
    var element = e.detail.target.el
    var elementHit = e.detail.body.el
     

    //element which is hit
 

    if (elementHit.id.includes("pin")) 
      {
        //set material attribute
        elementHit.setAttribute("material",{
          opacity:0.5
        })
        console.log(elementHit.id)
        //impulse and point vector
        var impulse = new CANNON.Vec3(0,3,1)
        var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
        elementHit.body.applyImpulse(impulse, worldPoint)

        //remove event listener
        element.removeEventListener("collide",this.shoot)     

        //remove the bullets from the scene
        var scene = document.querySelector("#scene")
        scene.removeChild(element)
      
    }
  },
});

