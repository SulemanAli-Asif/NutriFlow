import React, { Component } from 'react';
import axios from 'axios';
import Loading from "../Utilites/Loading";
import swal from 'sweetalert';
import ReactPlayer from 'react-player';
import Navbar from '../Shared/Navbar';
import "./Userinterface.css";
import Footer from '../Shared/Footer';

class UserInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoURL: '',
      transcriptionId: null,
      transcriptionStatus: 'pending',
      nutritionalData: null,
      totalCalories: null,
      error: null,
      loading: false,
      ingredients: [],  // Initialize ingredients
    };
  }
  
  calculateTotalCalories = (nutritionalData) => {
    if (nutritionalData && typeof nutritionalData === 'object') {
      let totalCalories = 0;
      let totalprotein = 0;
      let totalcarbohydrates = 0;
      let totalfat = 0;
      let totalPotassium = 0;
      let totalSugars = 0;
      let dietrayFibre = 0;
  
      const ingredients = Object.keys(nutritionalData);
  
      Object.values(nutritionalData).forEach((data) => {
        totalCalories += data.calories || 0;
        totalprotein += data.protein || 0;
        totalcarbohydrates += data.carbohydrates || 0;
        totalfat += data.fat || 0;
        totalPotassium += data.potassium || 0;
        totalSugars += data.sugars || 0;
        dietrayFibre += data.dietaryFiber || 0;
      });
  
      this.setState({
        totalCalories,
        totalcarbohydrates,
        totalprotein,
        totalfat,
        totalSugars,
        totalPotassium,
        dietrayFibre,
        ingredients,
      });
    } else {
      this.setState({
        totalCalories: null,
        totalcarbohydrates: null,
        totalprotein: null,
        totalfat: null,
        totalSugars: null,
        totalPotassium: null,
        dietrayFibre: null,
        ingredients: [],
      });
    }
  };  
  

  extractVideoIdFromEmbed = (embeddedLink) => {
    const videoIdMatch = embeddedLink.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch && videoIdMatch[1];
  };

  convertEmbeddedLinkToDirectURL = (embeddedLink) => {
    const videoId = this.extractVideoIdFromEmbed(embeddedLink);
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
  };

  handleStartTranscription = async () => {
    const { videoURL } = this.state;
    const directURL = this.convertEmbeddedLinkToDirectURL(videoURL);
    console.log('Direct Video URL:', directURL);

    this.setState({ loading: true, error: null, transcriptionId: null });
    if (!directURL) {
      swal({
        title: "Error",
        text: "Please enter a valid YouTube video URL",
        icon: "error",
        button: "OK",
      });
      this.setState({ error: 'Invalid or unsupported embedded link', loading: false });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/start-transcription', { videoURL });
      const transcriptionId = response.data.transcriptionId;
      this.setState({ transcriptionId });

      const checkTranscriptionStatus = async () => {
        try {
          const statusResponse = await axios.get(`http://localhost:5000/get-nutritional-data/${transcriptionId}`, { timeout: 600000 });
          const { status, nutritionalData } = statusResponse.data;

          if (status === 'failed') throw new Error('Transcription process failed');

          if (!nutritionalData && status !== 'completed') {
            setTimeout(checkTranscriptionStatus, 5000);
          } else {
            this.setState({ loading: false });

            if (nutritionalData) {
              this.calculateTotalCalories(nutritionalData);
            }

            this.setState({ transcriptionStatus: status, nutritionalData });

            swal({
              title: "Nutritional Data Successful",
              text: "Thank you!",
              icon: "success",
              button: "OK",
            });
          }
        } catch (error) {
          this.setState({ error: 'Error checking transcription status' });
        }
      };

      checkTranscriptionStatus();
    } catch (error) {
      swal({
        title: "Error",
        text: "Error starting transcription",
        icon: "error",
        button: "OK",
      });
      this.setState({ error: 'Error starting transcription', loading: false });
    }
  };


  render() {
    const {
      videoURL,
      totalCalories,
      totalcarbohydrates,
      totalprotein,
      totalfat,
      totalSugars,
      totalPotassium,
      dietrayFibre,
      transcriptionStatus,
      nutritionalData,
      error,
      loading,
      ingredients,
    } = this.state;
  
    return (
      <>
        <Navbar />
        <div className="mx-auto pt-5 mt-5 transcription-resultt">
          <header id='ui-header' className="text-center mb-6">
            <h1 className="text-4xl font-bold">Nutriflow AI</h1>
            <p>NutriFlow AI: From YouTube videos to your plate, we deliver <br />
              personalized nutrition data.</p>
  
            <div className="url-input">
              <input
                type="text"
                placeholder="Enter video URL / Embed link"
                value={videoURL}
                onChange={(e) => this.setState({ videoURL: e.target.value })}
                className="input-url"
              />
              <button
                onClick={this.handleStartTranscription}
                disabled={loading}
                className={`p-4 text-lg ${loading ? 'bg-gray-400' : 'bg-orange-500 rounded-xl text-white'} border rounded cursor-${loading ? 'not-allowed' : 'pointer'}`}
              >
                {loading ? 'Transcribing...' : 'Find Nutrition'}
              </button>
            </div>
          </header>
  
          <div className="line-border"></div>
  
          <div className="nutrition-demo">
            <div className="nutrition-demo-container">
              <h1 className="text-4xl font-medium text-center">How to get Nutrition detail from youtube</h1>
              <div className="demo-imgs-box">
                <div className="demo-img "></div>
                <div className="demo-img"></div>
                <div className="demo-img"></div>
              </div>
            </div>
          </div>
  
          <div className="video-details-container">
          <div className="video-details">
          <div className="result-video">
              <div className="player-wrapper videocl videocll">
                <ReactPlayer url={videoURL} controls width="400px" height="250px" />
              </div>
              {ingredients.length > 0 && (
              <div className="ingredients-paragraph">
                <h2 className="text-2xl font-bold">Ingredients:</h2>
                <p>{ingredients.join(', ')}</p>
              </div>
            )}
            </div>
  
            {loading && <Loading />}
  
            {error && <div className="error-message">{error}</div>}
  
           
  
            {(transcriptionStatus === 'completed' || transcriptionStatus === 'failed') && !loading ? (
              <div className="transcription-result">
                <h1 className="text-4xl font-bold">Nutritional Data</h1>
                {nutritionalData ? (
                  <div className="nutri-table-container mb-3 mt-3">
                    <table className="nutri-table">
                      <thead>
                        <tr>
                          <th>Nutrition</th>
                          <th>Amount</th>
                          <th>Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Calories</td>
                          <td>{totalCalories}</td>
                          <td>Cal</td>
                        </tr>
                        <tr>
                          <td>Protein</td>
                          <td>{totalprotein}</td>
                          <td>g</td>
                        </tr>
                        <tr>
                          <td>Carbohydrates</td>
                          <td>{totalcarbohydrates}</td>
                          <td>g</td>
                        </tr>
                        <tr>
                          <td>Fat</td>
                          <td>{totalfat}</td>
                          <td>g</td>
                        </tr>
                        <tr>
                          <td>Sugars</td>
                          <td>{totalSugars}</td>
                          <td>g</td>
                        </tr>
                        <tr>
                          <td>Potassium</td>
                          <td>{totalPotassium}</td>
                          <td>g</td>
                        </tr>
                        <tr>
                          <td>Dietary Fiber</td>
                          <td>{dietrayFibre}</td>
                          <td>g</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>
                    <p>Loading nutritional data...</p>
                    {loading && <Loading />}
                  </div>
                )}
              </div>
            ) : null}
          </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  

}

export default UserInterface;
