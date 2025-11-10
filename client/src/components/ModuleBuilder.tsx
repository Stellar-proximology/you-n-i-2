import { useState } from "react";
import { Code, Wand2, Play, Check, ArrowRight, Package, Sparkles, Zap } from "lucide-react";

const templates = [
  {
    id: "field-dashboard",
    name: "Field Dashboard",
    description: "Track and visualize a specific field's coherence and state over time",
    category: "visualization",
    icon: Sparkles,
  },
  {
    id: "oracle-tool",
    name: "Oracle Tool",
    description: "Create a custom oracle interface with consciousness-aware responses",
    category: "interaction",
    icon: Wand2,
  },
  {
    id: "biofeedback",
    name: "Biofeedback Module",
    description: "Connect real-time biofeedback data to field states",
    category: "data",
    icon: Zap,
  },
  {
    id: "custom",
    name: "Custom Module",
    description: "Start from scratch with full module framework",
    category: "custom",
    icon: Code,
  },
];

const steps = ["Template", "Configure", "Code", "Test", "Deploy"];

interface ModuleBuilderProps {
  onClose?: () => void;
}

export default function ModuleBuilder({ onClose }: ModuleBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    console.log('Template selected:', templateId);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log('Next step:', steps[currentStep + 1]);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      console.log('Previous step:', steps[currentStep - 1]);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Progress Steps */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center gap-2 ${
                index === currentStep ? 'text-cyan-400' : 
                index < currentStep ? 'text-green-400' : 
                'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index === currentStep ? 'border-cyan-400 bg-cyan-400/20' :
                  index < currentStep ? 'border-green-400 bg-green-400/20' :
                  'border-border'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <span className="font-medium">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 mx-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {currentStep === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose a Template</h2>
            <p className="text-muted-foreground mb-6">Select a starting point for your module</p>
            
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`bg-card border rounded-lg p-6 text-left hover-elevate active-elevate-2 transition-all ${
                      selectedTemplate === template.id ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-card-border'
                    }`}
                    data-testid={`template-${template.id}`}
                  >
                    <Icon className="w-8 h-8 text-cyan-400 mb-3" />
                    <h3 className="font-semibold text-card-foreground mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    <div className="mt-3 inline-block px-2 py-1 bg-muted rounded text-xs text-muted-foreground capitalize">
                      {template.category}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Configure Module</h2>
            <p className="text-muted-foreground mb-6">Set up basic module properties</p>
            
            <div className="max-w-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Module Name
                </label>
                <input
                  type="text"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  placeholder="My Awesome Module"
                  className="w-full px-4 py-2 bg-card border border-card-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  data-testid="input-module-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  placeholder="Describe what your module does..."
                  rows={4}
                  className="w-full px-4 py-2 bg-card border border-card-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  data-testid="input-module-description"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Edit Code</h2>
            <p className="text-muted-foreground mb-6">Customize your module implementation</p>
            
            <div className="bg-gray-950 border border-card-border rounded-lg p-4 font-mono text-sm">
              <div className="text-purple-400">import</div> {" { ResonanceEngine } "}
              <div className="text-purple-400">from</div> <span className="text-green-400">'@youniverse/core'</span>;
              <br /><br />
              <div className="text-purple-400">export default function</div> <span className="text-cyan-400">MyModule</span>() {"{"}
              <br />
              {"  "}<div className="text-purple-400">return</div> {"("}
              <br />
              {"    "}<span className="text-cyan-400">{"<div>"}</span>
              <br />
              {"      "}<span className="text-foreground">Module content here...</span>
              <br />
              {"    "}<span className="text-cyan-400">{"</div>"}</span>
              <br />
              {"  "}{");"}
              <br />
              {"}"}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Test Module</h2>
            <p className="text-muted-foreground mb-6">Run tests and preview your module</p>
            
            <div className="space-y-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg transition-all" data-testid="button-run-tests">
                <Play className="w-4 h-4" />
                Run Tests
              </button>
              
              <div className="bg-card border border-card-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">All tests passed!</span>
                </div>
                <p className="text-sm text-muted-foreground">Your module is ready to deploy</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Deploy Module</h2>
            <p className="text-muted-foreground mb-6">Register your module with the system</p>
            
            <div className="space-y-4">
              <div className="bg-card border border-card-border rounded-lg p-6">
                <Package className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {moduleName || "My Module"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {moduleDescription || "Module description"}
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all" data-testid="button-deploy">
                  Deploy to System
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="border-t border-border p-4 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          data-testid="button-prev"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1 || (currentStep === 0 && !selectedTemplate)}
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          data-testid="button-next"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
