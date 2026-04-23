import React from 'react';
import { CheckCircle2, Package, Gauge, Shield, Wrench, Award } from 'lucide-react';

const getIconForSpec = (label) => {
  const iconMap = {
    'garantia': Shield,
    'certificação': Award,
    'pressão': Gauge,
    'aplicação': Package,
    'instalação': Wrench,
  };

  const lowerLabel = label.toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (lowerLabel.includes(key)) {
      return Icon;
    }
  }
  return CheckCircle2;
};

const ProductSpecifications = ({ specifications }) => {
  if (!specifications || specifications.length === 0) return null;
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Package className="h-6 w-6 text-[#FFD700]" />
        Especificações Técnicas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications.map((spec, index) => {
          const Icon = getIconForSpec(spec.label);
          return (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-[#FFD700]/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="h-5 w-5 text-[#FFD700]" />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-gray-400 text-sm font-medium block mb-1">
                  {spec.label}
                </span>
                <span className="text-white font-semibold block">
                  {spec.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSpecifications;