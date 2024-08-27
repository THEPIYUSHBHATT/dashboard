/* eslint-disable no-undef */
import { useContext, useState } from 'react'
import WidgetContext from '../context/WidgetContext'
import Sidebar from './Sidebar'
import Header from './Header'

const Dashboard = () => {
  const { categories, dashboardWidgets, removeWidget } =
    useContext(WidgetContext)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedWidgetIndex, setSelectedWidgetIndex] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [previousWidgetState, setPreviousWidgetState] = useState({})

  const filteredCategories = categories.filter(
    (cat) => cat.id !== 'image' && cat.id !== 'ticket'
  )

  const findAvailableSlot = (categoryId) => {
    const widgets = dashboardWidgets[categoryId] || []
    return widgets.findIndex((widget) => widget === undefined)
  }

  const handleAddWidgetClick = (categoryId, index) => {
    setSelectedCategory(categoryId)
    setSelectedWidgetIndex(index)
    setIsSidebarOpen(true)
    setIsEditMode(false)
  }

  const handleEditWidgetClick = (categoryId, index) => {
    setSelectedCategory(categoryId)
    setSelectedWidgetIndex(index)
    setIsSidebarOpen(true)
    setIsEditMode(true)
  }

  const toggleSidebar = () => {
    const categoryWithSpace = filteredCategories.find((cat) => {
      const availableIndex = findAvailableSlot(cat.id)
      return availableIndex !== -1
    })
    if (categoryWithSpace) {
      setSelectedCategory(categoryWithSpace.id)
      setSelectedWidgetIndex(findAvailableSlot(categoryWithSpace.id))
      setIsSidebarOpen(true)
      setIsEditMode(false)
    }
  }

  const handleHeaderAddWidget = (categoryId) => {
    const availableIndex = findAvailableSlot(categoryId)
    if (availableIndex === -1) {
      return
    }
    setSelectedCategory(categoryId)
    setSelectedWidgetIndex(availableIndex)
    setIsSidebarOpen(true)
    setIsEditMode(false)
  }

  const handleCloseClick = (categoryId, index) => {
    if (dashboardWidgets[categoryId] && dashboardWidgets[categoryId][index]) {
      setPreviousWidgetState((prevState) => ({
        ...prevState,
        [`${categoryId}-${index}`]: dashboardWidgets[categoryId][index],
      }))
      removeWidget(categoryId, index)
    }
  }

  const handleWidgetUpdate = (categoryId, index, widget) => {
    setPreviousWidgetState((prevState) => ({
      ...prevState,
      [`${categoryId}-${index}`]: dashboardWidgets[categoryId][index],
    }))
    addWidget(categoryId, index, widget)
  }

  return (
    <div className="dashboard p-4">
      <Header
        onAddWidgetClick={toggleSidebar}
        onAddHeaderWidget={handleHeaderAddWidget}
      />
      {filteredCategories.map((category) => (
        <div key={category.id} className="category-section mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="widget-grid grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative p-4 bg-white border rounded shadow-md flex items-center justify-center"
                style={{ height: '200px', width: '400px' }}
              >
                {dashboardWidgets[category.id] &&
                dashboardWidgets[category.id][index] ? (
                  <div>
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCloseClick(category.id, index)}
                    >
                      ×
                    </button>
                    <h3 className="text-xl font-semibold">
                      {dashboardWidgets[category.id][index].name}
                    </h3>
                    <p className="text-gray-600">
                      {dashboardWidgets[category.id][index].description}
                    </p>
                    <button
                      className="absolute bottom-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEditWidgetClick(category.id, index)}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded opacity-50 hover:opacity-70"
                    onClick={() => handleAddWidgetClick(category.id, index)}
                  >
                    + Add Widget
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {isSidebarOpen && selectedCategory !== null && (
        <Sidebar
          onClose={() => setIsSidebarOpen(false)}
          categoryId={selectedCategory}
          widgetIndex={selectedWidgetIndex}
          isEditMode={isEditMode}
          onWidgetUpdate={handleWidgetUpdate}
          previousWidgetState={previousWidgetState}
        />
      )}
    </div>
  )
}

export default Dashboard
