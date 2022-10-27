import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import { ModalProvider } from './context/Modal';
import { PotProvider } from "./context/PotContext";
import { TourProvider } from "@reactour/tour";

let store = configureStore({});

const steps = [
  {
    selector: '#main-page',
    content: 'Welcome to Cubberd! Click the arrows to learn more. Feel free to exit this tutorial anytime.'
  },
  {
    selector: '.cubberd-content-container',
    content: 'This is your Cubberd. It should represent the ingredients that you have on hand in real life. To that end, you can add or remove ingredients until it is accurate and up-to-date.'
  },
  {
    selector: '.cubberd-ingredient-row:first-of-type',
    content: 'Cubberd ingredients can be added to your shopping list, removed from your Cubberd, or added to the Pot.'
  },
  {
    selector: '.pot-ingredient-container',
    content: 'Your selected ingredients are displayed here. These ingredients will be used when you execute the recipe search!'
  },
  {
    selector: '.pot-component-wrapper',
    content: 'Turn the knob and watch the Pot work its magic. Our revolutionary algorithm will work hard to return recipes containing your selected ingredients, ranked by Ingredient Score and Shopping Score.'
  },
  {
    selector: '.pot-component-wrapper',
    content: 'By default, recipes are ranked by Ingredient Score: this allows you to maximize use of your already owned ingredients, even if you have to grocery shop to fill in the gaps.'
  },
  {
    selector: '.toggle-btn',
    content: 'If you want to minimize the grocery shopping instead, you can toggle to rank recipes by Shopping Score. The higher this score, the fewer ingredients you have to go out and buy.'
  },
  {
    selector: '#shopping-list-container',
    content: 'This handy shopping list will help you keep track of what ingredients to pick up during your next grocery trip.'
  },
  {
    selector: '.user-profile-link',
    content: 'But wait, there\'s more! You can click this link to navigate to the User Page, where you can find all your saved recipes.'
  },
  {
    selector: '#main-page',
    content: 'This has been the main page of Cubberd. Happy cooking!'
  }
]

function Root() {
  return (
    <TourProvider steps={steps}>
      <ModalProvider>
        <Provider store={store}>
          <PotProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PotProvider>
        </Provider>
      </ModalProvider>
    </TourProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
