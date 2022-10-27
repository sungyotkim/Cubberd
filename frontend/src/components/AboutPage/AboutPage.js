import { useState } from "react"
import "./AboutPage.css"

function AboutPage() {

    const [index, setIndex] = useState();
    const [aboutUsTab, setAboutUsTab] = useState()

    // const optionA = <div id="optionA" ></div>
    // const optionB = <div id="optionB" >Still no cubberd. You order in once again. Your wallet takes the hit. Your food goes bad.</div>
    // const optionC = <div id="optionC" >You add toast and mandarins to your pot and get back some delicious recipes. You might worry, “how do I choose??” Well worry not! The recipes come ranked. Want to see which recipes use the highest percentage of your ingredients? Look at the Ingredient Score. Want to see which recipes require the least shopping for new ingredients? Toggle the Shopping Score. You’ll no longer see your fridge items as “disconnected and random.” You see them for what they really are: Your dinner.</div>
    let text = <div></div>;
    switch (index) {
        case 0:
            text = <div>“Toast and mandarins don’t really go together,” you think sadly upon each bite. "Is this really the best I can do?"</div>
            break;
        case 1:
            text = <div>You decide to order in once again. Your wallet takes a hit. The food you had left over goes bad.</div>
            break;
        case 2:
            text = <div>You add toast and mandarins to the pot on your Cubberd account and get back some delicious recipe options. You might worry, “how do I choose?” Well we at Cubberd say "worry not!" Would you like to see which recipes use the highest percentage of your ingredients? Check out the Ingredient Score. Interested in which recipes require the least shopping for new ingredients? Toggle the Shopping Score. The three recipes for each score will come ranked from highest to lowest. Never again will you see your fridge items as “disconnected and random.” You begin to see them for what they really are: Dinner.</div>
            break;
        default:
            text = <div></div>
            break;
    }

    let aboutUsText = <div></div>;
    switch(aboutUsTab) {
        case 0:
            aboutUsText = "Fred Info"
            break;
        case 1:
            aboutUsText = "Adina info"
            break;
        case 2:
            aboutUsText = "Clide info"
            break;
        case 3:
            aboutUsText = "Tommy info"
            break;
        default:
            aboutUsText = <div></div>
            break;
    }

    return (
        <div id="about-page" className="about-display">
            <h2>Choose Your Own Advenure:</h2>
            <h3>Your week is coming to an end and you’ve got some seemingly disconnected and random ingredients left in your kitchen cupboards. The thought of coming up with a dish that both excites you and uses your ingredients exhausts you. You...</h3>
            <div id="about-page-options">
                <div onClick={() => setIndex(0)} className={index === 0 ? "option active" : "option"}>      
                    <p>A</p> 
                    <p>Are not a Cubberd user</p>
                </div>
                <div onClick={() => setIndex(1)} className={index === 1 ? "option active" : "option"}>
                    <p>B</p> 
                    <p>Are still not a Cubberd user</p>
                </div>
                <div onClick={() => setIndex(2)} className={index === 2 ? "option active" : "option"}>
                    <p>C</p>
                    <p>Are finally a Cubberd user</p>
                </div>
            </div>
            <div id="about-page-text">
                {text}
            </div>
            <h2>About the developers</h2>
            <div id="about-us">
                <div id="about-us-left">
                    <table>
                        <tbody>
                            <tr onMouseEnter={() => setAboutUsTab(0)}>
                                <td>F</td>
                                <td>red Chien</td>
                            </tr>
                            <tr onMouseEnter={() => setAboutUsTab(1)} >
                                <td>A</td>
                                <td>dina Cooper</td>
                            </tr>
                            <tr onMouseEnter={() => setAboutUsTab(2)}>
                                <td>C</td>
                                <td>lide Stefani</td>
                            </tr>
                            <tr onMouseEnter={() => setAboutUsTab(3)}>
                                <td>T</td>
                                <td>ommy Kim</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="about-us-right">
                    <div>{aboutUsText}</div>
                </div>
            </div>
            
            
        </div>
    )
}

export default AboutPage;