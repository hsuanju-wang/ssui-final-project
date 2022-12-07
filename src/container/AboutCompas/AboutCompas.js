import './AboutCompas.css'
import howCompasWork from'../../assets/images/howCompasWork.png'
import threshold from "../../assets/images/Threshold.png"
import typofPrediction from "../../assets/images/TypeofPrediction.png"

const AboutCompas = () => {
    

    return (
        <div className="About">
            <div className='AboutCompas'>
                <h3>About COMPAS</h3>
                <div>COMPAS is a decision support tool used by U.S. courts to assess the likelihood of a defendant re-offending.

The dataset originally contains information of 11,757 defendants including their prior criminal history, jail and prison time, and demographics. For the purpose of the case study, this interactive visaulization only focused on two protected attributes, race and gender, and constrained them to be binary, e.g., African American and White , female and male. </div>
                
            </div>

            <br></br>

            <div className="block">
                <h3>How COMPAS work?</h3>
                <div className="">
                COMPAS system scores the defendant’s risk of re-offending on the scale of 1 to 10.  The risk score can help human judges in the  determine which defendants might re-offend or not.
                <img src={howCompasWork}/> 
                </div>
            </div>

            <div className="block">
                <h3>How the Threshold Works</h3>
                <div className="">
                Settiing the threshold can change the way the model predicts, With different trsholds, the same score can have different prediction results.
                <img src={threshold}/> 
                </div>
            </div>

            <div className="block">
                <h3>Type of Predictions</h3>
                <div className="">
                Depends on what COMPAS predicts and whether the prediction is correct, there are 4 types of possible result: True Positives, False Positives, True Negatives, and False Negatives.
                <img src={typofPrediction}/> 
                </div>
            </div>




        </div>
    );
}
export default ControlPanel;