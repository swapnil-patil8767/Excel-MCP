import { useState, useCallback } from 'react';
import { Header } from '@/components/excel/Header';
import { StepIndicator } from '@/components/excel/StepIndicator';
import { LandingPage } from '@/components/excel/LandingPage';
import { FileUpload } from '@/components/excel/FileUpload';
import { ActionSelector } from '@/components/excel/ActionSelector';
import { DashboardConfig } from '@/components/excel/DashboardConfig';
import { CleanDataConfig } from '@/components/excel/CleanDataConfig';
import { ReportConfig } from '@/components/excel/ReportConfig';
import { ProcessingScreen } from '@/components/excel/ProcessingScreen';
import { SuccessScreen } from '@/components/excel/SuccessScreen';
import { ProcessingHistory } from '@/components/excel/ProcessingHistory';
import { Button } from '@/components/ui/button';
import { useExcelUpload } from '@/hooks/useExcelUpload';
import { useProcessingHistory } from '@/hooks/useProcessingHistory';
import { ActionType, ChartRecommendation } from '@/types/excel';
import { ArrowRight } from 'lucide-react';

type ViewState = 'landing' | 'wizard' | 'processing' | 'success';

const STEP_LABELS = ['Upload', 'Action', 'Configure'];

export default function Index() {
  const [view, setView] = useState<ViewState>('landing');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [downloadPath, setDownloadPath] = useState('');
  const [recommendations, setRecommendations] = useState<ChartRecommendation[]>([]);

  const { file, handleFileSelect, clearFile, uploadMutation, recommendationsMutation, isLoadingPreview } = useExcelUpload();
  const { history, addToHistory, removeFromHistory, clearHistory } = useProcessingHistory();

  const handleGetStarted = () => {
    setView('wizard');
    setCurrentStep(1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 3) {
        setSelectedAction(null);
      }
      setCurrentStep(prev => prev - 1);
    } else {
      setView('landing');
      clearFile();
      setSelectedAction(null);
    }
  };

  const handleContinueToStep2 = () => {
    if (file) {
      setCurrentStep(2);
    }
  };

  const handleSelectAction = (action: ActionType) => {
    setSelectedAction(action);
    setCurrentStep(3);
  };

  const handleGetRecommendations = useCallback(async () => {
    if (!file) return;
    
    try {
      const data = await recommendationsMutation.mutateAsync(file.file);
      setRecommendations(data.recommendations);
    } catch {
      // Mock recommendations if API fails
      setRecommendations([
        { type: 'Line Chart', columns: 'Sales vs Time', icon: '📈', description: 'Trend over time' },
        { type: 'Bar Chart', columns: 'Top Categories', icon: '📊', description: 'Category comparison' },
        { type: 'Pie Chart', columns: 'Distribution', icon: '🥧', description: 'Percentage breakdown' },
        { type: 'Scatter Plot', columns: 'Correlation', icon: '⚫', description: 'Variable relationship' },
      ]);
    }
  }, [file, recommendationsMutation]);

  const handleProcess = async (prompt: string) => {
    if (!file || !selectedAction) return;

    setView('processing');

    try {
      const result = await uploadMutation.mutateAsync({
        file: file.file,
        prompt,
      });

      addToHistory({
        fileName: file.name,
        action: selectedAction,
        prompt,
        downloadPath: result.download_path,
        status: 'completed',
      });

      setDownloadPath(result.download_path);
      setView('success');
    } catch {
      addToHistory({
        fileName: file.name,
        action: selectedAction,
        prompt,
        downloadPath: '',
        status: 'failed',
      });
      setView('wizard');
    }
  };

  const handleReset = () => {
    setView('landing');
    setCurrentStep(1);
    setSelectedAction(null);
    setDownloadPath('');
    setRecommendations([]);
    clearFile();
  };

  // Render landing page
  if (view === 'landing') {
    return (
      <>
        <Header onHistoryClick={() => setShowHistory(true)} />
        <LandingPage onGetStarted={handleGetStarted} />
        {showHistory && (
          <ProcessingHistory
            history={history}
            onRemove={removeFromHistory}
            onClear={clearHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
      </>
    );
  }

  // Render processing screen
  if (view === 'processing') {
    return (
      <>
        <Header onHistoryClick={() => setShowHistory(true)} />
        <div className="container mx-auto px-4 py-8">
          <ProcessingScreen />
        </div>
      </>
    );
  }

  // Render success screen
  if (view === 'success') {
    return (
      <>
        <Header onHistoryClick={() => setShowHistory(true)} />
        <div className="container mx-auto px-4 py-8">
          <SuccessScreen downloadPath={downloadPath} onReset={handleReset} />
        </div>
        {showHistory && (
          <ProcessingHistory
            history={history}
            onRemove={removeFromHistory}
            onClear={clearHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
      </>
    );
  }

  // Render wizard
  return (
    <>
      <Header
        onHistoryClick={() => setShowHistory(true)}
        showBackButton
        onBack={handleBack}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={3}
          labels={STEP_LABELS}
        />

        <div className="bg-card rounded-2xl p-8 shadow-card border border-border mt-8">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Upload Your Excel File
                </h2>
                <p className="text-muted-foreground">
                  Select or drag and drop your Excel file to get started
                </p>
              </div>

              <FileUpload
                file={file}
                onFileSelect={handleFileSelect}
                onClear={clearFile}
                isLoadingPreview={isLoadingPreview}
              />

              <Button
                onClick={handleContinueToStep2}
                disabled={!file}
                className="w-full mt-8 gap-2"
                size="lg"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Select Action */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  What would you like to do?
                </h2>
                <p className="text-muted-foreground">
                  Select an action to perform on your Excel file
                </p>
              </div>

              <ActionSelector
                selectedAction={selectedAction}
                onSelect={handleSelectAction}
              />
            </div>
          )}

          {/* Step 3: Configure */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {selectedAction === 'dashboard' && 'Configure Your Dashboard'}
                  {selectedAction === 'clean' && 'Configure Data Cleaning'}
                  {selectedAction === 'report' && 'Configure Your Report'}
                </h2>
                <p className="text-muted-foreground">
                  {selectedAction === 'dashboard' && 'Enter requirements or select AI-recommended charts'}
                  {selectedAction === 'clean' && 'Select the cleaning operations to perform'}
                  {selectedAction === 'report' && 'Describe what you want in your report'}
                </p>
              </div>

              {selectedAction === 'dashboard' && (
                <DashboardConfig
                  recommendations={recommendations}
                  onGetRecommendations={handleGetRecommendations}
                  isLoadingRecommendations={recommendationsMutation.isPending}
                  onGenerate={handleProcess}
                />
              )}

              {selectedAction === 'clean' && (
                <CleanDataConfig onClean={(options) => handleProcess(options[0])} />
              )}

              {selectedAction === 'report' && (
                <ReportConfig onGenerate={handleProcess} />
              )}
            </div>
          )}
        </div>
      </div>

      {showHistory && (
        <ProcessingHistory
          history={history}
          onRemove={removeFromHistory}
          onClear={clearHistory}
          onClose={() => setShowHistory(false)}
        />
      )}
    </>
  );
}
