class Food{
   constructor(){
     this.image = loadImage("virtual pet images/Milk.png");
   }
   display(){
       var x = 80, y = 100;
       imageMode(CENTER);
       //image(this.image, 720, 220, 50, 50)
       if(food!==0){
           for(var i=0;i<food;i++){
               if(i%10==0){
                   x = 80;
                   y = y + 50;
               }
               image(this.image, x, y, 50, 50);
               x = x + 30;
           }
       }
   }
   bedroom(){
       background(bedroomimg);
   }
   garden(){
       background(gardenimg);
   }
   washroom(){
       background(washroomimg);
   }
}