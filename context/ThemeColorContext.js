import { createContext, useContext, useEffect, useState } from 'react';

const ThemeColorContext = createContext();

export function ThemeColorProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [logoStyle, setLogoStyle] = useState(1); // 默认 Logo 样式

  // 初始化时从 localStorage 读取设置
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedLogoStyle = parseInt(localStorage.getItem('logoStyle')) || 1;

    setDarkMode(savedDarkMode);
    setLogoStyle(savedLogoStyle);
    updateBodyClass(savedDarkMode);
  }, []);

  // 更新 body 类名
  const updateBodyClass = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  // 切换黑暗模式
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    updateBodyClass(newMode);
  };

  // 更改 Logo 样式
  const changeLogoStyle = (style) => {
    setLogoStyle(style);
    localStorage.setItem('logoStyle', style);
  };

  return (
    <ThemeColorContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        logoStyle,
        changeLogoStyle,
      }}
    >
      {children}
    </ThemeColorContext.Provider>
  );
}

// 提供兼容 useDarkMode 的 Hook
export function useDarkMode() {
  const { darkMode, toggleDarkMode } = useContext(ThemeColorContext);
  return { isDarkMode: darkMode, toggleDarkMode };
}

// 提供兼容 useLogoStyle 的 Hook
export function useLogoStyle() {
  const { logoStyle, changeLogoStyle } = useContext(ThemeColorContext);
  return { logoStyle, changeLogoStyle };
}

// 默认导出
export default ThemeColorContext;