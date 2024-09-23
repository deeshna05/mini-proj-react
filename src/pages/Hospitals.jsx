import React, { useState } from 'react';
import './Hospitals.css'; // Ensure this path is correct

// Import images
import srikaraImage from '../components/Assets/srikara.jpg';
import TulasiImage from '../components/Assets/Tulasi.jpeg';
import sooryaImage from '../components/Assets/soorya.jpg';
import jpImage from '../components/Assets/jp.avif'; 
import sparkImage from '../components/Assets/spark.jpg'; 
import ankuraImage from '../components/Assets/ankura.jpeg'; 
import yashodaImage from '../components/Assets/yashoda.jpg'; 
import kimsImage from '../components/Assets/kims.jpg'; 
import apolloImage from '../components/Assets/apollo.jpg'; 
import abhayaImage from '../components/Assets/abhaya.png'; 
import alroyceImage from '../components/Assets/alroyce.webp'; 
import signImage from '../components/Assets/sign.png'; 
import nakshatraImage from '../components/Assets/nakshatra.png';
import kamineniImage from '../components/Assets/kamineni.jpg';
import ozoneImage from '../components/Assets/ozone.jpg';
import prasadImage from '../components/Assets/prasad.jpg';
import remedyImage from '../components/Assets/remedy.jpg';
import omniImage from '../components/Assets/omni.jpg';
import motherhoodImage from '../components/Assets/motherhood.jpeg';
import rishithaImage from '../components/Assets/rishitha.webp';
import ramadeviImage from '../components/Assets/ramadevi.jpg';
import lifesaveImage from '../components/Assets/lifesave.jpg';
import nithinImage from '../components/Assets/nithin.avif';
import ssImage from '../components/Assets/ss.jpg';
import vijayaImage from '../components/Assets/vijaya.jpg';
import trinityImage from '../components/Assets/trinity.jpg';
import jananiImage from '../components/Assets/janani.jpg';
import vivekanandaImage from '../components/Assets/vivekananda.jpg';
import medicoverImage from '../components/Assets/medicover.webp';
import oxycareImage from '../components/Assets/oxycare.jpeg';

// Sample area data
const areaData = [
  { id: 1, name: 'ECIL' },
  { id: 2, name: 'UPPAL' },
  { id: 3, name: 'SECUNDERABAD' },
  { id: 4, name: 'RAMPALLY' },
  { id: 5, name: 'LB NAGAR' },
  { id: 6, name: 'KUKATPALLY' },
  { id: 7, name: 'MOULALI' },
  { id: 8, name: 'KEESARA' },
  { id: 9, name: 'NAGARAM' },
  { id: 10, name: 'BEGUMPET' }
];

// Updated hospitalData including the new hospitals for each area
const hospitalData = {
  1: [
    { id: 1, name: 'Srikara Hospitals', image: srikaraImage, address: '1-7-100, ECIL Cross Roads, South Kamala Nagar, Kamalanagar, Moula Ali, Secunderabad, Telangana 500062' },
    { id: 2, name: 'Tulasi Hospitals Multi Super Speciality', image: TulasiImage, address: 'ECIL Cross Roads, near by Hero showroom, Kushaiguda Industrial Area, Kushaiguda, Hyderabad, Secunderabad, Telangana 500062' },
    { id: 3, name: 'Soorya Hospitals', image: sooryaImage, address: 'B,B, SOORYA HOSPITALS, 4, 1, ECIL Main Rd, opposite Round building, North Kamala Nagar, Kushaiguda, Hyderabad, Secunderabad, Telangana 500062' }
  ],
  2: [
    { id: 4, name: 'JP Hospital', image: jpImage, address: 'Sri Sai Nagar, Canara Nagar, Peerzadiguda, Hyderabad, Telangana 500039' },
    { id: 5, name: 'Spark Hospital', image: sparkImage, address: 'Peerzadiguda Plot No. 2&3, Pillar No 51, Hyderabad - Warangal - Bhopalpatnam Hwy, opp. Hanuman Temple, beside Axis Bank, Peerzadiguda, Hyderabad, Telangana 500039' },
    { id: 6, name: 'Ankura Hospital For Women', image: ankuraImage, address: 'Metro Pillar Number 788, opposite NH65, Bagh Ameer, Sumitra Nagar Colony, Kukatpally, Hyderabad, Telangana 500072' }
  ],
  3: [
    { id: 7, name: 'Yashoda Hospital', image: yashodaImage, address: 'Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad, Telangana 500003' },
    { id: 8, name: 'KIMS Hospital', image: kimsImage, address: '1-8-31/1, Minister Rd, Krishna Nagar, Krishna Nagar Colony, Ramgopalpet, Secunderabad, Hyderabad, Telangana 500003' },
    { id: 9, name: 'Apollo Hospital', image: apolloImage, address: 'Pollicetty Towers, Regimental Bazaar, Shivaji Nagar, Secunderabad, Telangana 500025' }
  ],
  4: [
    { id: 10, name: 'Siri Abhaya Hospital', image: abhayaImage, address: 'IG Colony Rd, Sripuram Colony, NFC Employees Colony, Rampally, Ghatkesar, Secunderabad, Telangana 501301' },
    { id: 11, name: 'Sign Multi Speciality Hospital', image: signImage, address: 'H.No: 11-4/2, R.L.Nagar Main Road Rampally, Keesara Mandal, Nagaram, opposite to Reliance Delivery Smart point, Hyderabad, Telangana 501301' },
    { id: 12, name: 'Alroyce Hospital', image: alroyceImage, address: 'Plot No. 6-1, 04, Keesara Gatkesaar Road, Rampally, Secunderabad, Telangana 501301' }
  ],
  5: [
    { id: 13, name: 'Nakshatra Hospitals', image: nakshatraImage, address: 'LB Nagar - Uppal Rd, opp. Swagath Grand Hotel, East Yadav Nagar, Ramakrishnapuram, Nagole, Hyderabad, Telangana 500035' },
    { id: 14, name: 'Kamineni Hospitals', image: kamineniImage, address: 'Inner Ring Rd, Suryodaya Colony, Sarvodaya Colony, Central Bank Colony, L. B. Nagar, Hyderabad, Telangana 500068' },
    { id: 15, name: 'Ozone Hospitals', image: ozoneImage, address: '25, Rd Number 1, Narsimha Puri Colony, Huda Colony, Kothapet, Hyderabad, Telangana 500035' }
  ],
  6: [
    { id: 16, name: 'Prasad Hospitals', image: prasadImage, address: '44-617/12, IDA, behind Telephone Exchange, Nacharam, Secunderabad, Telangana 500076' },
    { id: 17, name: 'Remedy Hospital', image: remedyImage, address: 'Road No. 4, opp. Chandana Brothers Show Room, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072' },
    { id: 18, name: 'OMNI Hospital', image: omniImage, address: 'Plot No.W-11,B-9, Sy. No.9/1/A, Kothapet Rd, near SVC Cinema Theatre, opp. PVT Market Building, Dilsukhnagar, Hyderabad, Telangana 500036' }
  ],
  7: [
    { id: 19, name: 'MotherHood Hospitals', image: motherhoodImage, address: ' Moula Ali Rd, APHB Colony, Laxmi Nagar, Moula Ali, Secunderabad, Telangana 500040' },
    { id: 20, name: 'Rishitha Hospital', image: rishithaImage, address: '4-19-6/1, Chilkur Balaji Temple Rd, beside Reliance Mart & HP Petrol Bunk, Abhyudaya Nagar, Suncity, Bandlaguda Jagir, Telangana 500086' },
    { id: 21, name: 'Ramadevi Hospital', image: ramadeviImage, address: 'MIG-H-97, Ambica Towers, Moula Ali Rd, MJ Colony, Moula Ali, Secunderabad, Telangana 500040' }
  ],
  8: [
    { id: 22, name: 'LIFESAVE Multi-Speciality Hospital', image: lifesaveImage, address: 'busstop, Keesara, Hyderabad, Telangana 501301' },
    { id: 23, name: 'Nithin Hospitals', image: nithinImage, address: 'ECIL - Keesara Rd, Keesara, Secunderabad, Telangana 501301' },
    { id: 24, name: 'S.S. Hospitals', image: ssImage, address: 'H.no. 1-6-60/c, Near DEO Office, Yerra Satyam Chowrasta Palsabgutta, Mahbubnagar, Telangana 509001' }
  ],
  9: [
    { id: 25, name: 'Vijaya Hospitals', image: vijayaImage, address: 'ECIL, 9-12, Nagaram Main Rd, near Bus Stop, SV Nagar, Hyderabad, Telangana 500083' },
    { id: 26, name: 'TRINITY Multi-Speciality Hospital', image: trinityImage, address: 'VEERABADRA ARCADE, Dammaiguda Rd, Nagaram, Hyderabad, Telangana 500083' },
    { id: 27, name: 'Janani Hospitals', image: jananiImage, address: 'Netaji Nagar Cross Road, Aravind Nagar, Nagaram, Secunderabad, Telangana 500083' }
  ],
  10: [
    { id: 28, name: 'Vivekananda Multispeciality Hospital', image: vivekanandaImage, address: '6-3-871/A, Greenlands Rd, behind Snehalatha Complex, Punjagutta Officers Colony, Begumpet, Hyderabad, Telangana 500016 ' },
    { id: 29, name: 'Medicover Hospitals', image: medicoverImage, address: 'behind Cyber Towers, In the Lane of IBIS Hotels, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana 500081' },
    { id: 30, name: 'Oxycare Multi-Speciality Hospital', image: oxycareImage, address: '3rd Floor, Metro Station, Durga Towers, beside Rasoolpura, Patigadda, Begumpet, Hyderabad, Telangana 500016' }
  ]
};

const Hospitals = () => {
  const [selectedArea, setSelectedArea] = useState(areaData[0].id); // Default to the first area

  const handleAreaChange = (event) => {
    setSelectedArea(Number(event.target.value));
  };

  return (
    <div className="hospitals-container">
      <h1>Nearby Hospitals</h1>
      
      <label htmlFor="area-select">Select an Area:</label>
      <select id="area-select" value={selectedArea} onChange={handleAreaChange}>
        {areaData.map(area => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>
      
      <div className="hospitals-list">
      {hospitalData[selectedArea] ? hospitalData[selectedArea].map(hospital => (
          <div key={hospital.id} className="hospital-item">
            <img src={hospital.image} alt={hospital.name} className="hospital-image" />
            <div className="hospital-info">
              <h2>{hospital.name}</h2>
              <p>{hospital.address}</p>
            </div>
          </div>
        )) : <p>No hospitals available for this area.</p>}
      </div>
    </div>
  );
};

export default Hospitals;