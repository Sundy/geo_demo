import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import InsightDiagnosis from './pages/InsightDiagnosis';
import SearchIntent from './pages/SearchIntent';
import PlatformStrategy from './pages/PlatformStrategy';
import ContentStrategy from './pages/ContentStrategy';
import DataMonitoring from './pages/DataMonitoring';
import ConversionTracking from './pages/ConversionTracking';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/insight" replace />} />
          <Route path="insight" element={<InsightDiagnosis />} />
          <Route path="intent" element={<SearchIntent />} />
          <Route path="platform" element={<PlatformStrategy />} />
          <Route path="content" element={<ContentStrategy />} />
          <Route path="monitoring" element={<DataMonitoring />} />
          <Route path="conversion" element={<ConversionTracking />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
