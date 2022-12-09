import './AboutCompas.css'
import howCompasWork from'../../../assets/images/howCompasWork.png'
import threshold from "../../../assets/images/Threshold.png"
import typofPrediction from "../../../assets/images/TypeofPrediction.png"

const AboutCompas = () => {
    

    return (
        <div className="About">
            <div className='AboutCompas'>
                <h2>About COMPAS</h2>
                <p>COMPAS is a decision support tool used by U.S. courts to assess the likelihood of a defendant re-offending. 
                </p> 
                <p>
                The dataset originally contains information of 11,757 defendants including their prior criminal history, jail and prison time, and demographics. For the purpose of the case study, this interactive visaulization only focused on two protected attributes, race and gender, and constrained them to be binary, e.g., African American and White , female and male. 
                </p>
            </div>


            <div className='half'>
            <div className='how'>

                <div className="block">
                    <h2>How COMPAS work?</h2>
                    <div className="">
                        <p>
                        COMPAS system scores the defendant’s risk of re-offending on the scale of 1 to 10.  The risk score can help human judges in the  determine which defendants might re-offend or not.
                        </p>
                    <img src={howCompasWork}/> 
                    </div>
                </div>

                <div className="block">
                    <h2>How the Threshold Works</h2>
                    <div className="">
                        <p>Settiing the threshold can change the way the model predicts, With different thresholds, the same score can have different prediction results.</p>
                    <img src={threshold}/> 
                    </div>
                </div>

                </div>



                <div className="prediction">
                    <h2>Type of Predictions</h2>
                    <div className="">
                    <p>
                        Depends on what COMPAS predicts and whether the prediction is correct, there are 4 types of possible result: True Positives, False Positives, True Negatives, and False Negatives.
                    </p>
                    <p></p>
                    <p></p>
                    <img src={typofPrediction}/> 
                    </div>
                </div>

            </div>
                
            







        </div>
    );
}
export default AboutCompas;