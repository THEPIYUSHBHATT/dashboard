/* eslint-disable react/prop-types */
import { useContext } from 'react'
import  WidgetContext  from '../context/WidgetContext'
import Widget from './Widget'

const WidgetList = ({ category }) => {
  const { removeWidget } = useContext(WidgetContext)

  return (
    <div className="category-section">
      <h2 className="text-2xl font-bold">{category.name}</h2>
      {category.widgets.map((widget) => (
        <Widget
          key={widget.id}
          widget={widget}
          onRemove={() => removeWidget(category.id, widget.id)}
        />
      ))}
    </div>
  )
}

export default WidgetList
