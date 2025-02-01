import React, { useState } from 'react';
import { FaSeedling, FaCloudSun, FaBug, FaChartLine } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const advisorySections = [
  {
    title: 'Farming Guidance',
    icon: <FaSeedling className="text-green-500 text-3xl" />, 
    content: [
      { text: 'Soil preparation and testing', link: 'https://www.uaex.uada.edu/yard-garden/vegetables/a-z/prepare.aspx' },
      { text: 'Seed selection and planting techniques', link: 'https://byjus.com/biology/agriculture-seeds-selection-sowing/' },
      { text: 'Efficient irrigation methods', link: 'https://www.regionalh2o.org/water-conservation/outdoor-water-conservation/watering-systems#:~:text=Drip%20irrigation%20is%20the%20most,that%20overhead%20spray%20devices%20use.' },
      { text: 'Fertilizer application and management', link: 'https://agritech.tnau.ac.in/agriculture/agri_nutrientmgt_methodsoffertilizerappln.html' },
      { text: 'Harvesting and post-harvest handling', link: 'https://green.org/2024/01/30/harvesting-and-post-harvest-handling/' }
    ]
  },
  {
    title: 'Weather Forecasting and Alerts',
    icon: <FaCloudSun className="text-blue-500 text-3xl" />, 
    content: [
      { text: 'Daily and weekly weather forecasts', link: 'https://www.weathercrave.com/weather-forecast-cameroon/city-4401/weather-forecast-yaounde-today' },
      { text: 'Severe weather alerts and warnings', link: 'https://severeweather.wmo.int/' },
      { text: 'Rainfall and temperature predictions', link: 'https://www.weather-forecast.com/' },
      { text: 'Frost and heatwave alerts', link: 'https://en.ilmatieteenlaitos.fi/local-weather/cameroon/yaound%C3%A9' }
    ]
  },
  {
    title: 'Disease Identification and Management',
    icon: <FaBug className="text-red-500 text-3xl" />, 
    content: [
      { text: 'Common crop diseases and symptoms', link: 'https://eos.com/blog/crop-diseases/' },
      { text: 'Integrated pest management strategies', link: 'https://eos.com/blog/integrated-pest-management/' },
      { text: 'Biological and chemical control methods', link: 'https://lgpress.clemson.edu/publication/biological-control-strategies-in-integrated-pest-management-ipm-programs/' },
      { text: 'Preventive measures and best practices', link: 'https://www.koppert.com/plant-diseases/' }
    ]
  },
  {
    title: 'Crop Optimization Recommendations',
    icon: <FaChartLine className="text-purple-500 text-3xl" />, 
    content: [
      { text: 'Crop rotation and diversification', link: 'https://www.digokrishi.com/crop-diversification-and-crop-rotation' },
      { text: 'Precision farming techniques', link: 'https://www.agrivi.com/blog/precision-farming/' },
      { text: 'Use of advanced farming technologies', link: 'https://eos.com/blog/agricultural-technology/' },
      { text: 'Soil health and nutrient management', link: 'https://ag.umass.edu/book/export/html/15689' }
    ]
  }
];

import { useTranslation } from 'react-i18next';
import { advisoryTranslations } from '../data/advisoryTranslations';

function Advisory() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">🌿 Agricultural Advisory</h1>
          <p className="mt-2 text-lg text-gray-600">Get expert advice and tips for maximizing your farming success!</p>
        </div>

        {advisorySections.map((section, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5 mb-6 transition hover:shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <div className="flex items-center space-x-3">
                {section.icon}
                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
              </div>
              {expanded === index ? <MdExpandLess className="text-2xl text-gray-600" /> : <MdExpandMore className="text-2xl text-gray-600" />}
            </div>
            
            {expanded === index && (
              <ul className="mt-4 space-y-2">
                {section.content.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline block p-2 bg-gray-100 rounded-md transition hover:bg-gray-200"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advisory;
