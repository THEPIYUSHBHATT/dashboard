/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import widgetData from '../assets/widgets.json'
import WidgetContext from './WidgetContext'

export const WidgetContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [dashboardWidgets, setDashboardWidgets] = useState({})

  useEffect(() => {
    setCategories(widgetData.categories)

    // Load dashboardWidgets from localStorage if it exists, otherwise initialize it
    const savedWidgets = localStorage.getItem('dashboardWidgets')
    if (savedWidgets) {
      setDashboardWidgets(JSON.parse(savedWidgets))
    } else {
      // Initialize dashboardWidgets with empty arrays for each category ID
      const initialWidgets = widgetData.categories.reduce((acc, category) => {
        acc[category.id] = Array(3).fill(undefined) // Assuming 3 slots per category
        return acc
      }, {})
      setDashboardWidgets(initialWidgets)
    }
  }, [])

  useEffect(() => {
    // Save dashboardWidgets to localStorage whenever it changes
    localStorage.setItem('dashboardWidgets', JSON.stringify(dashboardWidgets))
  }, [dashboardWidgets])

  const addWidget = (categoryId, widgetIndex, widget) => {
    setDashboardWidgets((prevState) => ({
      ...prevState,
      [categoryId]: prevState[categoryId].map((w, index) =>
        index === widgetIndex ? widget : w
      ),
    }))
  }

  const removeWidget = (categoryId, widgetIndex) => {
    setDashboardWidgets((prevState) => ({
      ...prevState,
      [categoryId]: prevState[categoryId].map((w, index) =>
        index === widgetIndex ? undefined : w
      ),
    }))
  }

  return (
    <WidgetContext.Provider
      value={{ categories, dashboardWidgets, addWidget, removeWidget }}
    >
      {children}
    </WidgetContext.Provider>
  )
}
