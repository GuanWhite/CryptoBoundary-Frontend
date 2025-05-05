import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../pages/homePage/HomePage";
import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, [darkMode]);

  return (
    <Switch
      defaultChecked
      checked={darkMode}
      onChange={setDarkMode}
      checkedChildren={<MoonOutlined className="text-[18px] pt-[2px]" />}
      unCheckedChildren={<SunOutlined className="text-[18px]" />}
    />
  );
}
