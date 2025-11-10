import FieldStateIndicator from '../FieldStateIndicator';

export default function FieldStateIndicatorExample() {
  return (
    <div className="flex gap-8 p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <FieldStateIndicator 
        field="mind" 
        fieldState={{ coherence: 0.75, energy: 0.8, state: 'active' }} 
        size="lg"
      />
      <FieldStateIndicator 
        field="heart" 
        fieldState={{ coherence: 0.92, energy: 0.85, state: 'flowing' }} 
      />
      <FieldStateIndicator 
        field="body" 
        fieldState={{ coherence: 0.58, energy: 0.65, state: 'stable' }} 
        size="sm"
      />
    </div>
  );
}
