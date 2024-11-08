import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {

  console.log(result, '😶‍🌫️')

  const getBackgroundColor = (probability) => {

    const normalized = probability / 100;

    if (probability >= 75) {

      return `rgba(255, 99, 71, ${normalized * 0.3})`;
    } else if (probability >= 40) {

      return `rgba(255, 255, 0, ${normalized * 0.3})`;
    } else {

      return `rgba(50, 205, 50, ${normalized * 0.3})`;
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 75) {
      return '#FF4136'; // Red
    } else if (probability >= 40) {
      return '#FFB700'; // Yellow
    } else {
      return '#2ECC40'; // Green
    }
  };

  return (
    <div className="analysis-card">
      <div className="card-header">
        <h2>Probability of AI Content: {" "} <span style={{
          color: getProbabilityColor(result.data.summary.averageProbability),
          fontWeight: 'bold',
          transition: 'color 0.3s ease'
        }}>
          {result.data.summary.averageProbability}%
        </span></h2>
      </div>
      <div className="card-content">
        <div className="content-wrapper">

          <div className="analysis-text">
            {result.data.analysis.result.map((item, index) => (
              <span
                key={index}
                className="sentence-group"
                style={{
                  backgroundColor: getBackgroundColor(item.aiProbability)
                }}
              >
                {item.sentence}
                {" "}
                <div className="tooltip">
                  AI Probability: {item.aiProbability}%
                  <div className="tooltip-arrow"></div>
                </div>
              </span>
            ))}
          </div>

          <div className="summary-box">
            <p>Total Words: {result.data.summary.totalWords}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;