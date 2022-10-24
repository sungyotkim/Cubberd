import "./MainPage.css";

function MainPage() {
  return (
    <div id="main-page">
        <div id="main-page-top">
            <div id="main-page-top-left">
                <div id="cubberd-search-container" className="main-page-component"></div>
            </div>
            <div id="main-page-top-right">
                <div id="navbar-container" className="main-page-component"></div>
                <div id="main-page-top-right-bottom">
                    <div id="pot-container" className="main-page-component"></div>
                    <div id="shopping-list-container" className="main-page-component"></div>
                </div>
            </div>
        </div>
        <div id="main-page-bottom">
            <div id="current-cubberd-container" className="main-page-component"></div>
        </div>
    </div>
  );
}

export default MainPage;
