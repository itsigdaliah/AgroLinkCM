import React from 'react';

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="mt-1 relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="text-gray-400" />
        </div>
      )}
      <select
        className="input-field"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;