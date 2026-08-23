import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolPage from './pages/ToolPage';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Popular from './pages/Popular';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Legal
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Terms from './pages/legal/Terms';
import CookiePolicy from './pages/legal/CookiePolicy';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            <Route path="tools">
              <Route index element={<Tools />} />
              <Route path=":slug" element={<ToolPage />} />
            </Route>

            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path=":slug" element={<CategoryDetail />} />
            </Route>

            <Route path="popular" element={<Popular />} />
            <Route path="favorites" element={<Favorites />} />
            
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
