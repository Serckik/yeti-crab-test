import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { ThemeProvider } from '@gravity-ui/uikit';
import { Provider } from 'react-redux';
import { store } from './components/store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme="dark">
      <App />
    </ThemeProvider>
  </Provider>,
)
