import BrowserStatusBar from '../BrowserStatusBar';

export default function BrowserStatusBarExample() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <BrowserStatusBar 
        mode="developer" 
        overallCoherence={0.73} 
        activeModules={['BirthChart', 'Oracle']} 
      />
    </div>
  );
}
