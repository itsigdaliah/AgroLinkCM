import React from 'react';

function Advisory() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Advisory</h1>
          <p className="mt-4 text-lg text-gray-600">Get expert advice and tips for your farming needs</p>
        </div>

        <div className="space-y-12">
          {/* Farming Guidance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">Farming Guidance</h2>
            <p className="mt-4 text-gray-600">
              Learn best practices for planting, irrigation, fertilization, and harvesting to maximize your crop yield.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li><a href="https://www.uaex.uada.edu/yard-garden/vegetables/a-z/prepare.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soil preparation and testing</a></li>
              <li><a href="https://byjus.com/biology/agriculture-seeds-selection-sowing/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Seed selection and planting techniques</a></li>
              <li><a href="https://www.regionalh2o.org/water-conservation/outdoor-water-conservation/watering-systems#:~:text=Drip%20irrigation%20is%20the%20most,that%20overhead%20spray%20devices%20use." target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Efficient irrigation methods</a></li>
              <li><a href="https://agritech.tnau.ac.in/agriculture/agri_nutrientmgt_methodsoffertilizerappln.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fertilizer application and management</a></li>
              <li><a href="https://green.org/2024/01/30/harvesting-and-post-harvest-handling/#:~:text=Harvesting%20refers%20to%20the%20process,crop%20quality%20and%20market%20value." target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Harvesting and post-harvest handling</a></li>
            </ul>
          </section>

          {/* Weather Forecasting and Alerts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">Weather Forecasting and Alerts</h2>
            <p className="mt-4 text-gray-600">
              Stay updated with the latest weather forecasts and alerts to protect your crops from adverse weather conditions.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li><a href="https://www.weathercrave.com/weather-forecast-cameroon/city-4401/weather-forecast-yaounde-today" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Daily and weekly weather forecasts</a></li>
              <li><a href="https://severeweather.wmo.int/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Severe weather alerts and warnings</a></li>
              <li><a href="https://www.weather-forecast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Rainfall and temperature predictions</a></li>
              <li><a href="https://en.ilmatieteenlaitos.fi/local-weather/cameroon/yaound%C3%A9" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Frost and heatwave alerts</a></li>
            </ul>
          </section>

          {/* Disease Identification and Management */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">Disease Identification and Management</h2>
            <p className="mt-4 text-gray-600">
              Identify common crop diseases and learn how to manage and prevent them to ensure healthy crop growth.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li><a href="https://eos.com/blog/crop-diseases/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Common crop diseases and symptoms</a></li>
              <li><a href="https://eos.com/blog/integrated-pest-management/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Integrated pest management strategies</a></li>
              <li><a href="https://lgpress.clemson.edu/publication/biological-control-strategies-in-integrated-pest-management-ipm-programs/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Biological and chemical control methods</a></li>
              <li><a href="https://www.koppert.com/plant-diseases/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Preventive measures and best practices</a></li>
            </ul>
          </section>

          {/* Crop Optimization Recommendations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">Crop Optimization Recommendations</h2>
            <p className="mt-4 text-gray-600">
              Get recommendations on how to optimize your crop production for better yield and quality.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li><a href="https://www.digokrishi.com/crop-diversification-and-crop-rotation" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Crop rotation and diversification</a></li>
              <li><a href="https://www.agrivi.com/blog/precision-farming/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Precision farming techniques</a></li>
              <li><a href="https://eos.com/blog/agricultural-technology/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Use of advanced farming technologies</a></li>
              <li><a href="https://ag.umass.edu/book/export/html/15689" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soil health and nutrient management</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Advisory;
