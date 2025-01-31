import React from 'react';

import { useTranslation } from 'react-i18next';
import { advisoryTranslations } from '../data/advisoryTranslations';

function Advisory() {
  const { t, i18n } = useTranslation();
  const advisoryContent = advisoryTranslations[i18n.language];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{t('advisory.title')}</h1>
          <p className="mt-4 text-lg text-gray-600">{t('advisory.subtitle')}</p>
        </div>

        <div className="mt-10">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {advisoryContent.farmingGuidance.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {advisoryContent.farmingGuidance.description}
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {advisoryContent.farmingGuidance.sections.map((section) => (
                  <div key={section.id} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advisory;
