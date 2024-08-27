/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react'
import WidgetContext from '../context/WidgetContext'

const Sidebar = ({
  onClose,
  categoryId,
  widgetIndex,
  isEditMode,
  onWidgetUpdate,
  previousWidgetState,
}) => {
  const { categories, addWidget } = useContext(WidgetContext)
  const [widgetDetails, setWidgetDetails] = useState({
    name: '',
    description: '',
  })
  const [selectedWidgetId, setSelectedWidgetId] = useState(null)
  const [previousSelectedWidgetId, setPreviousSelectedWidgetId] = useState(null)
  const [filteredCategories, setFilteredCategories] = useState([])
  const [checkedWidgets, setCheckedWidgets] = useState({})
  const [selectedCategory, setSelectedCategory] = useState(categoryId)

  useEffect(() => {
    setFilteredCategories(categories.filter((cat) => cat.id !== 'registry'))
  }, [categories])

  useEffect(() => {
    // Set the selected category to the first available category if not already set
    if (!selectedCategory && filteredCategories.length > 0) {
      setSelectedCategory(filteredCategories[0].id)
    }
  }, [filteredCategories, selectedCategory])

  useEffect(() => {
    const category = categories.find((cat) => cat.id === selectedCategory)

    if (isEditMode && widgetIndex !== null && category) {
      const widget = category.widgets[widgetIndex]
      if (widget) {
        setSelectedWidgetId(widget.id)
        setWidgetDetails({
          name: widget.name,
          description: widget.description,
        })
        setPreviousSelectedWidgetId(widget.id)
        setCheckedWidgets((prev) => ({
          ...prev,
          [widget.id]: true,
        }))
      }
    } else {
      setWidgetDetails({ name: '', description: '' })
      setSelectedWidgetId(null)
      setPreviousSelectedWidgetId(null)
      setCheckedWidgets({})
    }
  }, [isEditMode, widgetIndex, selectedCategory, categories])

  const handleInputChange = (field, value) => {
    setWidgetDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCheckboxChange = (widgetId) => {
    if (checkedWidgets[widgetId]) {
      setCheckedWidgets((prev) => {
        const updated = { ...prev }
        delete updated[widgetId]
        return updated
      })
      setSelectedWidgetId(null)
      setWidgetDetails({ name: '', description: '' })
      setPreviousSelectedWidgetId(null)
    } else {
      setCheckedWidgets((prev) => ({
        ...prev,
        [widgetId]: true,
      }))
      const widget = categories
        .find((cat) => cat.id === selectedCategory)
        ?.widgets.find((w) => w.id === widgetId)
      setWidgetDetails({
        name: '',
        description: '',
      })
      setPreviousSelectedWidgetId(widgetId)
    }
  }

  const handleConfirm = () => {
    const category = categories.find((cat) => cat.id === selectedCategory)
    if (category && selectedWidgetId !== null) {
      addWidget(selectedCategory, widgetIndex, {
        id: selectedWidgetId,
        ...widgetDetails,
      })
    } else if (widgetDetails.name && widgetDetails.description) {
      addWidget(selectedCategory, widgetIndex, {
        id: Date.now().toString(),
        ...widgetDetails,
      })
    }
    onClose()
  }

  const handleUpdate = () => {
    const category = categories.find((cat) => cat.id === selectedCategory)
    if (category && selectedWidgetId !== null) {
      onWidgetUpdate(selectedCategory, widgetIndex, {
        id: selectedWidgetId,
        ...widgetDetails,
      })
    }
    onClose()
  }

  const handleCancel = () => {
    if (previousSelectedWidgetId !== null) {
      addWidget(
        selectedCategory,
        widgetIndex,
        previousWidgetState[`${selectedCategory}-${widgetIndex}`]
      )
    }
    onClose()
  }

  return (
    <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50">
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {isEditMode ? 'Edit Widget' : 'Add Widget'}
        </h2>
        <button onClick={onClose} className="text-white text-2xl">
          &times;
        </button>
      </div>
      <div className="p-4">
        <div className="flex space-x-4 border-b pb-2 mb-4">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 font-semibold rounded ${
                selectedCategory === cat.id
                  ? 'text-blue-900 border-b-2 border-blue-900'
                  : 'text-gray-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div>
          {categories
            .find((cat) => cat.id === selectedCategory)
            ?.widgets.map((widget) => (
              <div key={widget.id} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={widget.id}
                    checked={!!checkedWidgets[widget.id]}
                    onChange={() => handleCheckboxChange(widget.id)}
                    className="form-checkbox"
                  />
                  <label htmlFor={widget.id} className="ml-2">
                    Widget
                  </label>
                </div>
                {checkedWidgets[widget.id] && (
                  <div className="ml-6 mt-2">
                    <input
                      type="text"
                      placeholder="Widget Name"
                      className="border rounded p-2 w-full mb-2"
                      value={widgetDetails.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                    />
                    <textarea
                      placeholder="Description"
                      className="border rounded p-2 w-full"
                      value={widgetDetails.description}
                      onChange={(e) =>
                        handleInputChange('description', e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-end mt-4 absolute bottom-0 left-0 w-full p-4 bg-white border-t gap-2">
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={isEditMode ? handleUpdate : handleConfirm}
        >
          {isEditMode ? 'Update' : 'Confirm'}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
