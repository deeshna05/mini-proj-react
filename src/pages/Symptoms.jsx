import React, { useState } from 'react';
import axios from 'axios';
import './Symptoms.css';

const symptomsList = [
  'Itching', 'Skin rash', 'Nodal skin eruptions', 'Dischromic patches', 'Continuous sneezing',
  'Shivering', 'Chills', 'Watering from eyes', 'Stomach pain', 'Acidity', 'Ulcers on tongue',
  'Vomiting', 'Cough', 'Chest pain', 'Yellowish skin', 'Nausea', 'Loss of appetite', 'Abdominal pain',
  'Yellowing of eyes', 'Burning micturition', 'Spotting urination', 'Passage of gases', 'Internal itching',
  'Indigestion', 'Muscle wasting', 'Patches in throat', 'High fever', 'Extra marital contacts', 'Fatigue',
  'Weight loss', 'Restlessness', 'Lethargy', 'Irregular sugar level', 'Blurred and distorted vision',
  'Obesity', 'Excessive hunger', 'Increased appetite', 'Polyuria', 'Sunken eyes', 'Dehydration', 'Diarrhoea',
  'Breathlessness', 'Family history', 'Mucoid sputum', 'Headache', 'Dizziness', 'Loss of balance',
  'Lack of concentration', 'Stiff neck', 'Depression', 'Irritability', 'Visual disturbances', 'Back pain',
  'Weakness in limbs', 'Neck pain', 'Weakness of one body side', 'Altered sensorium', 'Dark urine',
  'Sweating', 'Muscle pain', 'Mild fever', 'Swelled lymph nodes', 'Malaise', 'Red spots over body',
  'Joint pain', 'Pain behind the eyes', 'Constipation', 'Toxic look (typhos)', 'Belly pain', 'Yellow urine',
  'Receiving blood transfusion', 'Receiving unsterile injections', 'Coma', 'Stomach bleeding',
  'Acute liver failure', 'Swelling of stomach', 'Distention of abdomen', 'History of alcohol consumption',
  'Fluid overload', 'Phlegm', 'Blood in sputum', 'Throat irritation', 'Redness of eyes', 'Sinus pressure',
  'Runny nose', 'Congestion', 'Loss of smell', 'Fast heart rate', 'Rusty sputum', 'Pain during bowel movements',
  'Pain in anal region', 'Bloody stool', 'Irritation in anus', 'Cramps', 'Bruising', 'Swollen legs',
  'Swollen blood vessels', 'Prominent veins on calf', 'Weight gain', 'Cold hands and feet', 'Mood swings',
  'Puffy face and eyes', 'Enlarged thyroid', 'Brittle nails', 'Swollen extremities', 'Abnormal menstruation',
  'Muscle weakness', 'Anxiety', 'Slurred speech', 'Palpitations', 'Drying and tingling lips', 'Knee pain',
  'Hip joint pain', 'Swelling joints', 'Painful walking', 'Movement stiffness', 'Spinning movements',
  'Unsteadiness', 'Pus-filled pimples', 'Blackheads', 'Scarring', 'Bladder discomfort', 'Foul smell of urine',
  'Continuous feel of urine', 'Skin peeling', 'Silver-like dusting', 'Small dents in nails', 'Inflammatory nails',
  'Blister', 'Red sore around nose', 'Yellow crust oozing'
];







const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [detectedDisease, setDetectedDisease] = useState('');
  const [recommendedMedicine, setRecommendedMedicine] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const handleCheckboxChange = (event) => {
    const symptom = event.target.value;
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleClearAll = () => {
    setSelectedSymptoms([]);
    setDetectedDisease('');
    setRecommendedMedicine('');
    setError(null);
  };

  const handleDetect = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/detect-disease/', {
        symptoms: selectedSymptoms
      });

      if (response.status === 200 && response.data.disease) {
        setDetectedDisease(response.data.disease);
        setRecommendedMedicine('');
      } else {
        setDetectedDisease('No disease detected');
        setRecommendedMedicine('');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(`Server Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response was received
        setError('No response received from the server. Please try again.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendMedicine = async () => {
    if (!detectedDisease || detectedDisease === 'No disease detected') {
      setError('Cannot recommend medicine without a detected disease.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recommend-medicine/', {
        disease: detectedDisease
      });

      if (response.status === 200 && response.data.medicine) {
        setRecommendedMedicine(response.data.medicine);
      } else {
        setRecommendedMedicine('No medicine found for this disease');
      }
    } catch (error) {
      setError('Unable to recommend medicine. Please try again later.');
    }
  };

  const filteredSymptoms = symptomsList.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="symptoms-container">
      <h1>Select Symptoms</h1>
      
      <input
        type="text"
        placeholder="Search symptoms..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="symptoms-grid">
        {filteredSymptoms.map((symptom, index) => (
          <label key={index} className="symptom-item">
            <input
              type="checkbox"
              value={symptom}
              checked={selectedSymptoms.includes(symptom)}
              onChange={handleCheckboxChange}
            />
            {symptom}
          </label>
        ))}
      </div>

      <div className="button-group">
        <button className="clear-button" onClick={handleClearAll}>
          Clear All
        </button>
        <button className="detect-button" onClick={handleDetect} disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Detect'}
        </button>
        <button className="recommend-medicine-button" onClick={handleRecommendMedicine} disabled={!detectedDisease}>
          Recommend Medicine
        </button>
      </div>

      <div className="selected-symptoms">
        <h2>Selected Symptoms:</h2>
        {selectedSymptoms.length > 0 ? (
          <ul>
            {selectedSymptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        ) : (
          <p>No symptoms selected.</p>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {detectedDisease && !error && (
        <div className="detected-disease">
          <h2>Detected Disease:</h2>
          <p>{detectedDisease}</p>
        </div>
      )}

      {recommendedMedicine && !error && (
        <div className="recommended-medicine">
          <h2>Recommended Medicine:</h2>
          <p>{recommendedMedicine}</p>
        </div>
      )}
    </div>
  );
};

export default Symptoms;

































































