# Cubberd

Project demo
![project-demo](https://github.com/sungyotkim/Cubberd/blob/main/github-assets/cubberdDemo.gif)

Want to see more?
## [Live Link](https://cubberd.herokuapp.com/)

## Technologies/APis used
- MongoDB
- Express.Js
- React.Js
- Node.Js
- Edamam API

## Features
- Search for ingredients to add to the cubberd (aka cupboard) and shopping list. 
- Remove items from the cubberd or add to the pot 
- Update or remove items from the shopping list
- Search for recipes based on ingredients used by the ingredient score or the shopping score
- Have a unique cubberd per user
- Save recipes to planned or favorited lists

## Development
Cubberd was a group project made by a team of four developers (including myself) in a span of five days. For this project, I took on the role of the frontend developer. One of the biggest challenges I faced was creating an interactive userface that would keep the user engaged. To tackle this, I created a custom cupboard and stove created entirely from HTML/CSS to provide myself with the greatest flexiblity in animating such components. 

** Animating the ingredients to be "thrown" into the pot **
The most difficult aspect of this feature was determining from where the ingredient first started upon the user's click. At first, I planned to utilize which row the ingredient lies in (since it's structured in an array) as the starting point. However, I realized that if there sufficient ingredients in the cubberd, the user can vertically scroll within the component which would alter the starting position. Though this would only work in specific viewports, I used calculations of the cursor's pointer to determine the start of each ingredient animation for all 11 possibilities. Eventually, this would require some modifications to work in mobile devies/smaller viewports. Upon a mouse click event, the Y position was calculated and the div was given the appropriate animation class to trigger the animation. A timeout function then served to remove the animation class to reset the image. Additionally, a check was performed prior to the animation to prevent the user from adding multiples of the same ingredient into the pot.

```javascript
const addToPot = (e, ingredient) => {
    e.preventDefault();

    let includedItems = potContents.filter((ele) => ele._id === ingredient._id);

    if (includedItems.length === 0) {
      setPotContents((old) => [...old, ingredient]);
      setAddingIngredient(true);
  
      switch (true) {
        case e.clientY < 170:
          setAnimateItemName("cubberd-ingredient-image-item animate-one")
          break;
        case e.clientY < 230:
          setAnimateItemName("cubberd-ingredient-image-item animate-two")
          break;
        case e.clientY < 290:
          setAnimateItemName("cubberd-ingredient-image-item animate-three")
          break;
        case e.clientY < 350:
          setAnimateItemName("cubberd-ingredient-image-item animate-four")
          break;
        case e.clientY < 410:
          setAnimateItemName("cubberd-ingredient-image-item animate-five")
          break;
        case e.clientY < 470:
          setAnimateItemName("cubberd-ingredient-image-item animate-six")
          break;
        case e.clientY < 530:
          setAnimateItemName("cubberd-ingredient-image-item animate-seven")
          break;
        case e.clientY < 590:
          setAnimateItemName("cubberd-ingredient-image-item animate-eight")
          break;
        case e.clientY < 650:
          setAnimateItemName("cubberd-ingredient-image-item animate-nine")
          break;
        case e.clientY < 720:
          setAnimateItemName("cubberd-ingredient-image-item animate-ten")
          break;
        case e.clientY < 780:
          setAnimateItemName("cubberd-ingredient-image-item animate-eleven")
          break;
        default:
          break;
      }
  
      setTimeout(() => {
        setAnimateItemName("cubberd-ingredient-image-item")
        setAddingIngredient(false)
      }, 1000);
    }

  };
  
  
  // sample css:
  
  
  .animate-one {
  position: fixed; 
  animation: moveOne 1s forwards linear; 
}

@keyframes moveOne {
  0% { 
    left: calc(10% + 2em);
    top: 117px;
  }
  25% {
    left: 15%;
    top: 5%;
  }
  50% {
    left: 25%;
    top: 15%;
  }
  75% {
    left: 35%;
    top: 25%;
  }
  100% {
    left: 50%;
    top: 46%;
  }
}

```

## Future Features
- Mobile compatibility 
- Default/multiple cubberds for users to choose from
- Multiple customizable lists
