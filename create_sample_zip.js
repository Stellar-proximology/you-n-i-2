import AdmZip from 'adm-zip';
import { readFileSync } from 'fs';

const zip = new AdmZip();

// Add files to the zip
zip.addFile('meta/manifest.json', readFileSync('sample_modules/motivation_gate/meta/manifest.json'));
zip.addFile('config/resonance_map.json', readFileSync('sample_modules/motivation_gate/config/resonance_map.json'));
zip.addFile('ui/visual_component.jsx', readFileSync('sample_modules/motivation_gate/ui/visual_component.jsx'));
zip.addFile('logic/logic_handler.js', readFileSync('sample_modules/motivation_gate/logic/logic_handler.js'));

// Write the zip file
zip.writeZip('sample_modules/motivation_gate_42.zip');

console.log('✅ Created sample_modules/motivation_gate_42.zip');
